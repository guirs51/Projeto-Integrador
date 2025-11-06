import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { DeliveryController } from '../controllers/DeliveryController'

const router = Router()
const controller = new UserController()
const controllerDelivery = new DeliveryController()

router.get('/', controller.list.bind(controller))
router.get('/:id', controller.getById.bind(controller))
router.post('/', controller.create.bind(controller))
router.put('/:id', controller.update.bind(controller))
router.delete('/:id', controller.remove.bind(controller))

// rotas para o user criar os deliverys

router.post("/delivery/", controllerDelivery.create.bind(controllerDelivery));
router.get('/delivery/', controllerDelivery.list.bind(controllerDelivery))
router.get('/delivery/:id', controllerDelivery.getById.bind(controller));
router.put('delivery/:id', controllerDelivery.update.bind(controllerDelivery))
router.delete('/delivery/:id', controllerDelivery.remove.bind(controller))

export default router