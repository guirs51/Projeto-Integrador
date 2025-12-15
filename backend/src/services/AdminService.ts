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
}
