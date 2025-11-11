
import { AppDataSource } from "../data-source";
import { Delivery } from "../entities/delivery";
import { User } from "../entities/User";

export class DeliveryService {
    private Repo = AppDataSource.getRepository(Delivery);
    private userRepo = AppDataSource.getRepository(User);

    async create(dataDelivery: Delivery) {
        try {
            const { user, ...data } = dataDelivery
            const userDelivery = await this.userRepo.findOneBy({ id: user.id });
            const delivery = this.Repo.create({
                ...data,
                user: userDelivery
            });
            return await this.Repo.save(delivery);
        } catch (e) {
            console.log("Erro: " + e);
        }
    }

    async findAll() {
        try {
            const deliverys = this.Repo.find();
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
            const delivery = await this.Repo.findOne({ where: { id } });
            if (!delivery) throw new Error("delivery não encotrado");
            const clone: any = { ...delivery };
            return clone;
        } catch (e) {
            console.log("Erro: " + e);
        }
    }

    async update(id: number, data: Partial<Delivery>) {
        try {
            const delivery = await this.Repo.findOne({ where: { id } });
            if (!delivery) throw new Error("Delivery não encontrado");
            return await this.Repo.save(delivery);
        } catch (e) {
            console.log("Erro: " + e);
        }
    }

    async remove(id: number) {
        try {
            const delivery = await this.Repo.findOne({ where: { id } });
            if (!delivery) throw new Error("Delivery não encontrado");
            await this.Repo.remove(delivery);
            return { mensagem: "Delivery deletado" };
        } catch (e) {
            console.log("Erro: " + e);
        }
    }
}
