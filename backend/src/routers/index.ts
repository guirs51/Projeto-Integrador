import { Router } from 'express'
import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import companyRoutes from './company.routes'
import prizeRoutes from './prize.routes'
import deliveryRoutes from './delivery.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/company',companyRoutes)
router.use('/delivery',deliveryRoutes)
router.use('/prize', prizeRoutes)

export default router