import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export function validateDTO(dtoClass:any){
    return async (req:Request,res:Response, next:NextFunction) =>{
        const dtoObject = plainToInstance(dtoClass, req.body);

        const errors = await validate(dtoObject);

        if(errors.length > 0){
            return res.status(400).json(errors.map(err =>err.constraints))

        }

        next();
    }
}