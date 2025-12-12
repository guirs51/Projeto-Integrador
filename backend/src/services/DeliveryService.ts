
import { AppDataSource } from "../data-source";
import { Company } from "../entities/Company";
import { Delivery, DeliveryStatus } from "../entities/Delivery";
import { User } from "../entities/User";

export class DeliveryService {
    private deliveryRepo = AppDataSource.getRepository(Delivery);
    private userRepo = AppDataSource.getRepository(User);
    private companyRepo = AppDataSource.getRepository(Company);

    async create(data:{userId:number; companyId:number;deliveryLocal:string,materialType:string;deliveryDate:string}) {
        try {
            const user = await this.userRepo.findOneBy({id:data.userId})
            const company = await this.companyRepo.findOneBy({id:data.companyId})

            if(!user) throw new Error("Usuario não encontrado")
            if(!company) throw new Error("Compania não encontrada")

            const delivery = this.deliveryRepo.create({
                user,
                company,
                deliveryLocal:data.deliveryLocal,
                deliveryDate:data.deliveryDate,
                materialType:data.materialType,
                status:DeliveryStatus.PENDING
            });


            return await this.deliveryRepo.save(delivery);

        } catch (e) {
            console.log(e);
        }
    }

    async findAll() {
        try {
            const deliverys = this.deliveryRepo.find();
            return (await deliverys).map((u) => {
                const clone: any = { ...u };
                return clone;
            });
        } catch (e) {
            console.log("Erro: " + e);
        }
    }

    async findById(id: number) {
        try {
            const delivery = await this.deliveryRepo.findOne({ where: { id } });
            if (!delivery) throw new Error("delivery não encotrado");
            const clone: any = { ...delivery };
            return clone;
        } catch (e) {
            console.log("Erro: " + e);
        }
    }

    async update(id: number, data: Partial<Delivery>) {
        try {
            const delivery = await this.deliveryRepo.findOne({ where: { id } });
            if (!delivery) throw new Error("Delivery não encontrado");
            return await this.deliveryRepo.save(delivery);
        } catch (e) {
            console.log("Erro: " + e);
        }
    }

    async remove(id: number) {
        try {
            const delivery = await this.deliveryRepo.findOne({ where: { id } });
            if (!delivery) throw new Error("Delivery não encontrado");
            await this.deliveryRepo.remove(delivery);
            return { mensagem: "Delivery deletado" };
        } catch (e) {
            console.log("Erro: " + e);
        }
    }


}
