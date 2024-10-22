import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
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
const Item = mongoose.model("Item", itemSchema);
export default Item;
