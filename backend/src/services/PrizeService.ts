import { AppDataSource } from "../data-source";
import { Prize } from "../entities/Prize";

export class PrizeService {
  private prizeRepo = AppDataSource.getRepository(Prize);

  async create(data: { namePrize: string; prizePoints: number  }) {
    try {
      const prize = await this.prizeRepo.create(data);
      return await this.prizeRepo.save(prize);
    } catch (e) {
      console.log("Erro ao criar prize: " + e);
    }
  }

  async findAll() {
    try {
      const prize = this.prizeRepo.find();

      return (await prize).map((u) => {
        const clone: any = { ...u };
        return clone;
      });
    } catch (e) {
      console.log("Erro ao listar todas as empresas: " + e)
    }
  }

  async findById(id: number) {
    try {
      const company = await this.prizeRepo.findOne({ where: { id } });

      if (!company) throw new Error("Empresa não encotrado");

      const clone: any = { ...company };

      return clone;
    } catch (e) {
      console.log(e)
    }
  }

  async update(id: number, data: Partial<Prize>) {
    try {
      const prize = await this.prizeRepo.findOne({ where: { id } });
      if (!prize) throw new Error("Prize não encontrado");

      const { ...rest } = data;

      Object.assign(prize, rest);

      return await this.prizeRepo.save(prize);
    } catch (e) {
      console.log(e)
    }
  }

  async remove(id: number) {
    try {
      const prize = await this.prizeRepo.findOne({ where: { id } });

      if (!prize) throw new Error("Prize não encontrado");

      await this.prizeRepo.remove(prize);

      return { mensagem: "Prize deletado" };
    } catch (e) {
      console.log(e)
    }
  }
}
