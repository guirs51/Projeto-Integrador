import { Request, Response } from 'express'
import { CompanyService } from '../services/CompanyService'

const companyService = new CompanyService()

export class CompanyController {
  async create(req: Request, res: Response) {
    try {
      const user = await companyService.create(req.body)
      res.status(201).json(user)
    } catch (e: any) {
      res.status(400).json({ message: e.message })
    }
  }

  async list(req: Request, res: Response) {
    const users = await companyService.findAll()
    res.json(users)
  }

  async getById(req: Request, res: Response) {
    try {
      const user = await companyService.findById(Number(req.params.id))
      res.json(user)
    } catch (e: any) {
      res.status(404).json({ message: e.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user = await companyService.update(Number(req.params.id), req.body)
      res.json(user)
    } catch (e: any) {
      res.status(400).json({ message: e.message })
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const result = await companyService.remove(Number(req.params.id))
      res.json(result)
    } catch (e: any) {
      res.status(404).json({ message: e.message })
    }
  }

  async accept(req: Request, res: Response) {

    const companyId = Number(req.params.companyId)
    const deliveryId = Number(req.params.deliveryId)

    try {
      const result = await companyService.acceptDelivery(companyId, deliveryId)
      res.json(result)
    } catch (e: any) {
      res.status(400).json({ message: e.message })
    }
  }

  async reject(req: Request, res: Response) {

    const companyId = Number(req.params.companyId)
    const deliveryId = Number(req.params.deliveryId)

    try {
      const result = await companyService.rejectDelivery(companyId,deliveryId)
      res.json(result)
    } catch (e:any) {
      res.status(400).json({message:e.message})
    }
  }
}