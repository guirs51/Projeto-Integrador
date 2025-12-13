import { Request, Response } from 'express'
import { CompanyService } from '../services/CompanyService'

const service = new CompanyService()

export class CompanyController {
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
      const result = await service.remove(Number(req.params.id))
      res.json(result)
    } catch (e: any) {
      res.status(404).json({ message: e.message })
    }
  }

  // async accept(req: Request, res: Response) {

  //   const companyId = Number(req.params.companyId)
  //   const deliveryId = Number(req.params.deliveryId)

  //   try {
  //     const result = await companyService.acceptDelivery(companyId, deliveryId)
  //     res.json(result)
  //   } catch (e: any) {
  //     res.status(400).json({ message: e.message })
  //   }
  // }

  // async reject(req: Request, res: Response) {

  //   const companyId = Number(req.params.companyId)
  //   const deliveryId = Number(req.params.deliveryId)

  //   try {
  //     const result = await companyService.rejectDelivery(companyId,deliveryId)
  //     res.json(result)
  //   } catch (e:any) {
  //     res.status(400).json({message:e.message})
  //   }
  // }

  async acceped(req: Request, res: Response) {
    try {
      const result = await service.accept(Number(req.params.id))
      res.status(200).json(result)
    } catch (e: any) {
      res.status(401).json({ message: e.mensagem })
    }
  }

  async reject(req: Request, res: Response) {
    try {
      const result = await service.rejected(Number(req.params.id))
      res.status(200).json(result)
    } catch (e: any) {
      res.status(401).json({ message: e.mensagem })
    }
  }
}