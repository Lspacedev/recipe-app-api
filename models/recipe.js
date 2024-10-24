import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  category: { type: String },
  prepTime: { type: Number },
  cookingTime: { type: Number },
  servings: { type: Number },
  //picture: { type: String },
  createdAt: { type: Date, default: Date.now() },
});
const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
