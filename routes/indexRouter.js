import { Router } from "express";
import indexController from "../controllers/indexController.js";
import authenticate from "../middleware/authenticate.js";

const indexRouter = Router();
indexRouter.post("/register", indexController.userRegister);
indexRouter.post("/login", indexController.userLogin);
indexRouter.get("/profile", authenticate, indexController.getUser);
indexRouter.put("/profile", authenticate, indexController.updateUser);
export default indexRouter;
