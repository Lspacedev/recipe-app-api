import { Router } from "express";
import recipesController from "../controllers/recipesController.js";

const recipesRouter = Router();

recipesRouter.get("/", recipesController.getRecipes);
recipesRouter.post("/", recipesController.createRecipe);
recipesRouter.get("/:recipeId", recipesController.getRecipeById);
recipesRouter.put("/:recipeId", recipesController.updateRecipe);
recipesRouter.delete("/:recipeId", recipesController.deleteRecipe);
export default recipesRouter;
