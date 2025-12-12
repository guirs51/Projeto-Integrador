import { Request, Response } from 'express'
import { DeliveryService } from '../services/DeliveryService'

const deliveryService = new DeliveryService()

export class DeliveryController {
  async create(req: Request, res: Response) {
    try {
      const user = await deliveryService.create(req.body)
      res.status(201).json(user)
    } catch (e: any) {
      res.status(400).json({ message: e.message })
    }
  }

  async list(req: Request, res: Response) {
    const users = await deliveryService.findAll()
    res.json(users)
  }

  async getById(req: Request, res: Response) {
    try {
      const user = await deliveryService.findById(Number(req.params.id))
      res.json(user)
    } catch (e: any) {
      res.status(404).json({ message: e.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user = await deliveryService.update(Number(req.params.id), req.body)
      res.json(user)
    } catch (e: any) {
      res.status(400).json({ message: e.message })
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const result = await deliveryService.remove(Number(req.params.id))
      res.json(result)
    } catch (e: any) {
      res.status(404).json({ message: e.message })
    }
  }


}