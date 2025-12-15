import { Router } from "express";
import { DeliveryController } from "../controllers/DeliveryController";

const router = Router()
const controller = new DeliveryController()

router.get('/',controller.list.bind(controller));
router.post('/',controller.create.bind(controller));
// router.put('/id',controller.update.bind(controller));
router.delete('/:id',controller.remove.bind(controller))
router.get("/accept/:id", controller.acceped.bind(controller))
router.get("/reject/:id", controller.reject.bind(controller))

export default router