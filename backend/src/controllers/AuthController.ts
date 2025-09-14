import { Response, Request } from "express";
import { UserService } from "../services/UserService";

const service = new UserService();

export class AuthController {

    async register(req: Request, res: Response){
        try{
            const user = await service.create(req.body)
            res.status(201).json(user)
        }catch (error: any){
            res.status(400).json({mensagem: error.mensagem})   
        }
    }

    async login(req: Request, res: Response){
        try{
            const {email, password} = req.body;

            const user = service.findEmail(email);
            if(!user) return res.status(404).json({mensagem: "Usuario não encontrado!"})

            const valid = (await user).validatePassword(password)
            if(!valid) return res.status(401).json({mensagem: "Senha invaldia"});
            
            const safe: any = {...user}
            delete safe.password

            res.status(201).json({user: safe})
        }catch (error: any){
            res.status(400).json({mensagem: error.mensagem})
        }
    }
}