import Item from "../models/item.js";
async function createItem(req, res) {
  try {
    console.log(req.body);
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "An error occured while creating item." });
  }
}
async function getItems(req, res) {
  try {
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const items = await Item.find().skip(skip).limit(limit);
    const totalItems = await Item.countDocuments();
    res.status(200).json({ items, totalItems, page, limit });
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching items." });
  }
}

async function getItemById(req, res) {
  try {
    const { itemId } = req.params;
    const item = await Item.findById(itemId);
    res.status(200).json(item);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(400).json({ error: "Invalid item id" });
    } else {
      res.status(500).json({ error: "An error occured while fetching item." });
    }
  }
}

async function updateItem(req, res) {
  try {
    const { itemId } = req.params;
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
    let updatedItem;

    if (name !== "") {
      updatedItem = await Item.updateOne(
        { _id: itemId },

        { $set: { name: name } }
      );
      isUpdate = true;
    }
    if (ingredients !== "") {
      updatedItem = await Item.updateOne(
        { _id: itemId },

        { $set: { ingredients: ingredients } }
      );
      isUpdate = true;
    }
    if (instructions !== "") {
      updatedItem = await Item.updateOne(
        { _id: itemId },

        { $set: { instructions: instructions } }
      );
      isUpdate = true;
    }
    if (category !== "") {
      updatedItem = await Item.updateOne(
        { _id: itemId },

        { $set: { category: category } }
      );
      isUpdate = true;
    }
    if (typeof prepTime !== "undefined" || null) {
      updatedItem = await Item.updateOne(
        { _id: itemId },

        { $set: { prepTime: prepTime } }
      );
      isUpdate = true;
    }
    if (typeof cookingTime !== "undefined" || null) {
      updatedItem = await Item.updateOne(
        { _id: itemId },

        { $set: { cookingTime: cookingTime } }
      );
      isUpdate = true;
    }
    if (typeof servings !== "undefined" || null) {
      updatedItem = await Item.updateOne(
        { _id: itemId },

        { $set: { servings: servings } }
      );
      isUpdate = true;
    }
    if (isUpdate) {
      console.log(updateItem);
      res.status(201).json(updatedItem);
    } else {
      res.status(400).json({ error: "Nothing to update." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occured while updating item." });
  }
}
async function deleteItem(req, res) {
  try {
    const { itemId } = req.params;
    const deleteItem = await Item.deleteOne({ _id: itemId });
    res.status(200).json(deleteItem);
  } catch (error) {
    res.status(500).json({ error: "An error occured while deleting item." });
  }
}
export default { createItem, getItems, getItemById, updateItem, deleteItem };
