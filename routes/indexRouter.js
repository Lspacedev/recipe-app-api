import { Router } from "express";
import indexController from "../controllers/indexController.js";
const indexRouter = Router();
indexRouter.post("/register", indexController.userRegister);
indexRouter.post("/login", indexController.userLogin);
export default indexRouter;
