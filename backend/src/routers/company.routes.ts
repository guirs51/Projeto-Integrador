import { Router } from 'express'
import { CompanyController } from '../controllers/CompanyController'

const router = Router()
const controller = new CompanyController()

router.get('/', controller.list.bind(controller))
router.get('/:id', controller.getById.bind(controller))
router.post('/', controller.create.bind(controller))
router.put('/:id', controller.update.bind(controller))
router.delete('/:id', controller.remove.bind(controller))

export default router