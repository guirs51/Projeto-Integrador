import { Request, Response, NextFunction } from 'express'
import { Admin } from '../entities/Admin'

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {password, role} = req.body

    if(role != "admin"){
        return "Error"
    }
}