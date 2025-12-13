import { Router } from 'express'
import { CompanyController } from '../controllers/CompanyController'

const router = Router()
const controller = new CompanyController()

router.get('/', controller.list.bind(controller))
router.get('/:id', controller.getById.bind(controller))
router.post('/', controller.create.bind(controller))
router.put('/:id', controller.update.bind(controller))
router.delete('/:id', controller.remove.bind(controller))
router.get("/accept/:id", controller.acceped.bind(controller))
router.get("/reject/:id", controller.reject.bind(controller))

// router.put(
//   '/:companyId/delivery/:deliveryId/accept',
//   controller.accept.bind(controller)
// )

// router.put(
//   '/:companyId/delivery/:deliveryId/reject',
//   controller.reject.bind(controller)
// )


export default router