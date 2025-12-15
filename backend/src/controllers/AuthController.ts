import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import { generateToken } from '../utils/jwt' // Importa a função que gera o JWT
import { AdminService } from '../services/AdminService'

const service = new UserService()
const adminService = new AdminService

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const user = await service.create(req.body)
            res.status(201).json(user)
        } catch (e: any) {
            res.status(400).json({ message: e.message })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const admin = await adminService.findEmail(email)
            if (admin) {
                const valid = await admin.validatePassword(password)
                if (!valid) return { message: 'Usuário ' + admin.email + ' não encontrado' }
                const safe: any = { ...admin }
                delete safe.password
                const token = generateToken({ id: admin.id, email: admin.email })

                res.json({ user: safe, token })
            }

            const user = await service.findEmail(email)
            if (!user) return res.status(404).json({ message: 'Usuário ' + email + ' não encontrado' })
            console.log(admin)

            const valid = await user.validatePassword(password)
            if (!valid) return res.status(401).json({ message: 'Senha inválida' })

            const safe: any = { ...user }
            delete safe.password


            const token = generateToken({ id: user.id, email: user.email })

            res.json({ user: safe, token })
        } catch (e: any) {
            res.status(400).json({ message: e.message })
        }
    }

}
