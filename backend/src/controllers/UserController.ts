import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

const service = new UserService()

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const user = await service.create(req.body)
      res.status(201).json(user)
    } catch (e: any) {
      res.status(400).json({ message: e.message })
    }
  }

  async list(req: Request, res: Response) {
    const users = await service.findAll()
    res.json(users)
  }

  async getById(req: Request, res: Response) {
    try {
      const user = await service.findById(Number(req.params.id))
      res.json(user)
    } catch (e: any) {
      res.status(404).json({ message: e.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user = await service.update(Number(req.params.id), req.body)
      res.json(user)
    } catch (e: any) {
      res.status(400).json({ message: e.message })
    }
  }

  async remove(req: Request, res: Response) {
    try {
      // const result = await service.remove(Number(req.params.id))
      // res.json(result)
      await service.remove(Number(req.params.id))
      return res.json({message:"Usuario deletado com sucesso"})
    } catch (e: any) {
      res.status(404).json({ message: e.message })
    }
  }
}