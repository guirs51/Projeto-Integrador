import { Router } from 'express'
import { MaterialController } from '../controllers/MaterialController'

const router = Router()
const controller = new MaterialController()

router.get('/', controller.list.bind(controller))
router.get('/:id', controller.getById.bind(controller))
router.post('/create', controller.create.bind(controller))
router.put('/:id', controller.update.bind(controller))
router.delete('/:id', controller.remove.bind(controller))

export default router