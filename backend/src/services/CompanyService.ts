import { AppDataSource } from "../data-source";
import { Company } from "../entities/Company";

export class CompanyService {
  private CompanyRepo = AppDataSource.getRepository(Company);

  async create(data: { name: string; email: string; cnpj: string }) {
    try {
      const emailOrCnpj = await this.CompanyRepo.findOne({
        where: { email: data.email, cnpj: data.cnpj  },
      });

      if (emailOrCnpj) throw new Error("E-mail já cadastrado");

      const company = await this.CompanyRepo.create(data);
      return await this.CompanyRepo.save(company);
    } catch (e) {
      console.log("Erro ao criar Company: " + e);
    }
  }

  async findAll() {
    const companys = this.CompanyRepo.find();

    return (await companys).map((u) => {
      const clone: any = { ...u };
      return clone;
    });
  }

  async findById(id: Number) {
    const company = await this.CompanyRepo.findOne({ where: { id } });

    if (!company) throw new Error("Usuario não encotrado");

    const clone: any = { ...Company };

    return clone;
  }

  async update(id: Number, data: Partial<Company>) {
    const company = await this.CompanyRepo.findOne({ where: { id } });
    if (!company) throw new Error("usuario não encontrado");

    // if(data.password){
    //     user.password = data.password
    // }

    const { ...rest } = data;

    Object.assign(company, rest);

    return await this.CompanyRepo.save(company);
  }

  async remove(id: Number) {
    const company = await this.CompanyRepo.findOne({ where: { id } });

    if (!company) throw new Error("Usuario não encontrado");

    await this.CompanyRepo.remove(company);

    return { mensagem: "Usuario deletado" };
  }

  async findEmail(email: string) {
    const company = await this.CompanyRepo.findOne({ where: { email } });

    if (!company) throw new Error("Usuario não encontrado");

    return company;
  }
}
