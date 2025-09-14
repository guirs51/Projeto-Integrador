import { Router } from 'express'
import { UserController } from '../controllers/UserController'

const router = Router()
const controller = new UserController()

router.get('/', controller.list.bind(controller))
router.get('/:id', controller.getById.bind(controller))
router.post('/', controller.create.bind(controller))
router.put('/:id', controller.update.bind(controller))
router.delete('/:id', controller.remove.bind(controller))

export default router