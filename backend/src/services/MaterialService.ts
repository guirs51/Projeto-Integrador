import { AppDataSource } from "../data-source";
import { Material } from "../entities/Material";

export class MaterialService {
    private MaterialRepo = AppDataSource.getRepository(Material);

    async create(data: Material) {
        try {
            const exist = await this.MaterialRepo.findOne({ where: { name: data.name } })
            if (exist) return { mensagem: "material já foi cadastrado"};

            const material = await this.MaterialRepo.create(data);
            return await this.MaterialRepo.save(material);
        } catch (e) {
            console.log("Erro ao criar prize: " + e);
        }
    }

    async findAll() {
        try {
            const material = this.MaterialRepo.find();

            return (await material).map((u) => {
                const clone: any = { ...u };
                return clone;
            });
        } catch (e) {
            console.log("Erro ao listar todas as empresas: " + e)
        }
    }

    async findById(id: number) {
        try {
            const material = await this.MaterialRepo.findOne({ where: { id } });

            if (!material) throw new Error("Empresa não encotrado");

            const clone: any = { ...material };

            return clone;
        } catch (e) {
            console.log(e)
        }
    }

    async update(id: number, data: Partial<Material>) {
        try {
            const material = await this.MaterialRepo.findOne({ where: { id } });
            if (!material) throw new Error("Prize não encontrado");

            const { ...rest } = data;

            Object.assign(material, rest);

            return await this.MaterialRepo.save(material);
        } catch (e) {
            console.log(e)
        }
    }

    async remove(id: number) {
        try {
            const material = await this.MaterialRepo.findOne({ where: { id } });

            if (!material) throw new Error("Prize não encontrado");

            await this.MaterialRepo.remove(material);

            return { mensagem: "Prize deletado" };
        } catch (e) {
            console.log(e)
        }
    }
}
