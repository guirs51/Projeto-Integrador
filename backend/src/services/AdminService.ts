import { AppDataSource } from "../data-source";
import { Admin } from "../entities/Admin";

export class AdminService {
    private userRepo = AppDataSource.getRepository(Admin);

    async create(data: Admin) {
        try {
            const admin = await this.userRepo.create(data);
            return await this.userRepo.save(admin);
        } catch (e) {
            console.log("Erro: " + e);
        }
    }

    async findEmail(email: string) {
        try {
            const admin = await this.userRepo.findOne({ where: { email } });

            if (!admin) throw new Error("Usuario não encontrado");

            return admin;
        } catch (e) {
            console.log("Erro:" + e);
        }
    }
}
