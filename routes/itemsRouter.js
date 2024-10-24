import { Router } from "express";
import itemsController from "../controllers/itemsController.js";
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";
const itemsRouter = Router();

itemsRouter.get("/", authenticate, itemsController.getItems);
itemsRouter.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  itemsController.createItem
);
itemsRouter.get("/:itemId", authenticate, itemsController.getItemById);
itemsRouter.put(
  "/:itemId",
  authenticate,
  authorize("ADMIN"),
  itemsController.updateItem
);
itemsRouter.delete(
  "/:itemId",
  authenticate,
  authorize("ADMIN"),
  itemsController.deleteItem
);
export default itemsRouter;
