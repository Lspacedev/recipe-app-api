import Recipe from "../models/recipe.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
async function createRecipe(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json("No file uploaded.");
    }

    const { originalname, path, size } = req.file;
    const options = {
      resource_type: "image",
      public_id: originalname,
      folder: "recipes",
    };
    //upload to cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      // Write the buffer to the stream
      uploadStream.end(req.file.buffer);
    });

    const secure_url = result.secure_url;
    const recipeObj = {
      userId: req.user._id,
      ...req.body,
      imageUrl: secure_url,
    };
    const recipe = await Recipe.create(recipeObj);
    res.status(201).json(recipe);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occured while creating Recipe.", error });
  }
}
async function getRecipes(req, res) {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;
    const recipes = await Recipe.find({ userId: req.user._id })
      .skip(skip)
      .limit(limit);
    const totalRecipes = await Recipe.countDocuments();
    res.status(200).json({ recipes, totalRecipes, page, limit });
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching recipes." });
  }
}
async function getRecipeById(req, res) {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    res.status(200).json(recipe);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(400).json({ error: "Invalid recipe id" });
    } else {
      res
        .status(500)
        .json({ error: "An error occured while fetching recipe." });
    }
  }
}
async function updateRecipe(req, res) {
  try {
    const { recipeId } = req.params;
    const {
      name,
      ingredients,
      instructions,
      category,
      prepTime,
      cookingTime,
      servings,
    } = req.body;
    let isUpdate = false;
    let updatedRecipe;
    if (name !== "") {
      updatedRecipe = await Recipe.updateOne(
        { _id: recipeId },
        { $set: { name: name } }
      );
      isUpdate = true;
    }
    if (ingredients !== "") {
      updatedRecipe = await Recipe.updateOne(
        { _id: recipeId },
        { $set: { ingredients: ingredients } }
      );
      isUpdate = true;
    }
    if (instructions !== "") {
      updatedRecipe = await Recipe.updateOne(
        { _id: recipeId },
        { $set: { instructions: instructions } }
      );
      isUpdate = true;
    }
    if (category !== "") {
      updatedRecipe = await Recipe.updateOne(
        { _id: recipeId },
        { $set: { category: category } }
      );
      isUpdate = true;
    }
    if (prepTime !== "") {
      updatedRecipe = await Recipe.updateOne(
        { _id: recipeId },
        { $set: { prepTime: Number(prepTime) } }
      );
      isUpdate = true;
    }
    if (cookingTime !== "") {
      updatedRecipe = await Recipe.updateOne(
        { _id: recipeId },
        { $set: { cookingTime: Number(cookingTime) } }
      );
      isUpdate = true;
    }
    if (servings !== "") {
      updatedRecipe = await Recipe.updateOne(
        { _id: recipeId },
        { $set: { servings: Number(servings) } }
      );
      isUpdate = true;
    }
    if (isUpdate) {
      res.status(201).json(updatedRecipe);
    } else {
      res.status(400).json({ error: "Nothing to update." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occured while updating Recipe." });
  }
}
async function deleteRecipe(req, res) {
  try {
    const { recipeId } = req.params;

    const recipe = await Recipe.findById(recipeId);
    const filename = recipe.imageUrl.substring(
      recipe.imageUrl.lastIndexOf("/") + 1
    );
    const id = filename.slice(0, filename.lastIndexOf("."));

    cloudinary.uploader.destroy(`recipes/${id}`, function (error, result) {
      console.log(result, error);
    });

    const deleteRecipe = await Recipe.deleteOne({ _id: recipeId });
    res.status(200).json(deleteRecipe);
  } catch (error) {
    res.status(500).json({ error: "An error occured while deleting Recipe." });
  }
}
export default {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
