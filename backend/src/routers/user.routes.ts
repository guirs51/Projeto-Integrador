import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { DeliveryController } from '../controllers/DeliveryController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { uploadUserPhoto } from '../config/upload.config'

const router = Router()
const controller = new UserController()
const controllerDelivery = new DeliveryController()

router.get('/', authMiddleware, controller.list.bind(controller))
router.get('/:id', authMiddleware, controller.getById.bind(controller))
router.patch('/update/:id', controller.update.bind(controller))
router.delete('/:id', authMiddleware, controller.remove.bind(controller))
router.post("/:id/foto", uploadUserPhoto.single("foto"), controller.uploadFoto.bind(controller))

// rotas para o user criar os deliverys

router.post("/create/delivery/", authMiddleware, controllerDelivery.create.bind(controllerDelivery));

export default router