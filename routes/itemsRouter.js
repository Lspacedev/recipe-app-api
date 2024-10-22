import { Router } from "express";
import itemsController from "../controllers/itemsController.js";
import authenticate from "../middleware/authenticate.js";
const itemsRouter = Router();

itemsRouter.get("/", authenticate, itemsController.getItems);
itemsRouter.post("/", itemsController.createItem);
itemsRouter.get("/:itemId", itemsController.getItemById);
itemsRouter.put("/:itemId", itemsController.updateItem);
itemsRouter.delete("/:itemId", itemsController.deleteItem);
export default itemsRouter;
