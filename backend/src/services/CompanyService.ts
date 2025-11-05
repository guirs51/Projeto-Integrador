import e from "express";
import { AppDataSource } from "../data-source";
import { Company } from "../entities/Company";

export class CompanyService {
  private CompanyRepo = AppDataSource.getRepository(Company);

  async create(data: { name: string; email: string; cnpj: string }) {
    try {
      const emailOrCnpj = await this.CompanyRepo.findOne({
        where: { email: data.email, cnpj: data.cnpj },
      });

      if (emailOrCnpj) throw new Error("E-mail ou CNPJ já cadastrado");

      const company = await this.CompanyRepo.create(data);
      return await this.CompanyRepo.save(company);
    } catch (e) {
      console.log("Erro ao criar Company: " + e);
    }
  }

  async findAll() {
    try {
      const companys = this.CompanyRepo.find();

      return (await companys).map((u) => {
        const clone: any = { ...u };
        return clone;
      });
    } catch (e) {
      console.log("Erro ao listar todas as empresas: " + e)
    }
  }

  async findById(id: Number) {
    try {
      const company = await this.CompanyRepo.findOne({ where: { id } });

      if (!company) throw new Error("Empresa não encotrado");

      const clone: any = { ...company };

      return clone;
    } catch (e) {
      console.log(e)
    }
  }

  async update(id: Number, data: Partial<Company>) {
    try {
      const company = await this.CompanyRepo.findOne({ where: { id } });
      if (!company) throw new Error("Empresa não encontrado");

      // if(data.password){
      //     user.password = data.password
      // }

      const { ...rest } = data;

      Object.assign(company, rest);

      return await this.CompanyRepo.save(company);
    } catch (e) {
      console.log(e)
    }
  }

  async remove(id: Number) {
    try {
      const company = await this.CompanyRepo.findOne({ where: { id } });

      if (!company) throw new Error("Empresa não encontrado");

      await this.CompanyRepo.remove(company);

      return { mensagem: "Empresa deletado" };
    } catch (e) {
      console.log(e)
    }
  }

  async findEmail(email: string) {
    try {
      const company = await this.CompanyRepo.findOne({ where: { email } });

      if (!company) throw new Error("Usuario não encontrado");

      return company;
    } catch (e) {
      console.log(e)
    }
  }
}
