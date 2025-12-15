
import { AppDataSource } from "../data-source";
import { Company } from "../entities/Company";
import { Delivery } from "../entities/delivery";
import { User } from "../entities/User";

export class DeliveryService {
    private deliveryRepo = AppDataSource.getRepository(Delivery);
    private userRepo = AppDataSource.getRepository(User);

    async create(dataDelivery: Delivery) {
        try {
            const { user, ...data } = dataDelivery
            const userDelivery = await this.userRepo.findOneBy({ id: user.id })
            if (!userDelivery.id) return { mesagem: "Erro ao pegar o id_user ou da company:  " + user.id }
            const delivery = this.deliveryRepo.create({
                ...data,
                user: userDelivery
            });
            return await this.deliveryRepo.save(delivery);
        } catch (e) {
            console.log("Erro: " + e);
        }
    }

    async findAll() {
        try {
            const deliverys = this.deliveryRepo.find({ relations: ["user"] });
            return (await deliverys).map((u) => {
                const clone: any = { ...u };
                return clone;
            });
        } catch (e) {
            console.log("Erro: " + e);
        }
    }

    async remove(id: number) {
        try {
            const delivery = await this.deliveryRepo.findOne({ where: { id } });
            if (!delivery) throw new Error("Delivery não encontrado");
            if (delivery.status != "PENDING") return { mensagem: "Esse Delivery já não pode mais ser excluido" }
            await this.deliveryRepo.remove(delivery);
            return { mensagem: "Delivery deletado" };
        } catch (e) {
            console.log("Erro " + e)
        }
    }

    async accept(id: number) {
        try {
            const delivery = await this.deliveryRepo.findOne({ where: { id } })
            if (!delivery) throw new Error("Delivery não encontrado")
            delivery.status = "accepted"
            return this.deliveryRepo.save(delivery)
        } catch (e) {
            throw new Error("Erro ao aceitar delivery")
        }
    }

    async rejected(id: number) {
        try {
            const delivery = await this.deliveryRepo.findOne({ where: { id } })
            if (!delivery) throw new Error("Delivery não encontrado")
            delivery.status = "rejected"
            return this.deliveryRepo.save(delivery)
        } catch (e) {
            throw new Error("Erro ao rejeitar delivery")
        }
    }

}
