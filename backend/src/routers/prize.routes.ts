import { Router } from 'express'
import { PrizeController } from '../controllers/PrizeController'

const router = Router()
const controller = new PrizeController()

router.get('/', controller.list.bind(controller))
router.get('/:id', controller.getById.bind(controller))
router.post('/', controller.create.bind(controller))
router.put('/:id', controller.update.bind(controller))
router.delete('/:id', controller.remove.bind(controller))

export default router