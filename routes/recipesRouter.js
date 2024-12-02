import { Router } from "express";
import recipesController from "../controllers/recipesController.js";
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";
import upload from "../config/multer.js";
const recipesRouter = Router();
recipesRouter.get("/", authenticate, recipesController.getRecipes);
recipesRouter.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  upload.single("image"),
  recipesController.createRecipe
);
recipesRouter.get("/:recipeId", authenticate, recipesController.getRecipeById);
recipesRouter.put(
  "/:recipeId",
  authenticate,
  authorize("ADMIN"),
  recipesController.updateRecipe
);
recipesRouter.delete(
  "/:recipeId",
  authenticate,
  authorize("ADMIN"),
  recipesController.deleteRecipe
);
export default recipesRouter;
