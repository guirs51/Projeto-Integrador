import { Request, Response } from 'express'
import { AdminService } from '../services/AdminService'

const service = new AdminService()

export class AdminController {
  async create(req: Request, res: Response) {
    try {
      const user = await service.create(req.body)
      res.status(201).json(user)
    } catch (e: any) {
      res.status(400).json({ message: e.message })
    }
  }
}