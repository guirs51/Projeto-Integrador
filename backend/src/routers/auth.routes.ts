import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { validateDTO } from '../middlewares/validateDTO'
import { CreateUserDTO } from '../DTOS/CreateUserDTO'

const router = Router()
const controller = new AuthController()

router.post('/register', validateDTO(CreateUserDTO), controller.register.bind(controller))
router.post('/login', controller.login.bind(controller))
router.post("/google", controller.googleLogin.bind(controller));

export default router