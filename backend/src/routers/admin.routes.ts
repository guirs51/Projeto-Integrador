import { Router } from "express";
import { AdminController } from "../controllers/AdminController";

const router = Router()
const controller = new AdminController()

router.post("/create", controller.create.bind(controller))

export default router