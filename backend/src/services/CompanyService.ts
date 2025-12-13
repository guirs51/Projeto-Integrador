import { AppDataSource } from "../data-source";
import { Company } from "../entities/Company";
import { Delivery } from "../entities/delivery";

export class CompanyService {
  private CompanyRepo = AppDataSource.getRepository(Company);
  private deliveryRepo = AppDataSource.getRepository(Delivery);



  async create(data: Company) {
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

  async findById(id: number) {
    try {
      const company = await this.CompanyRepo.findOne({ where: { id } });

      if (!company) throw new Error("Empresa não encotrado");

      const clone: any = { ...company };

      return clone;
    } catch (e) {
      console.log(e)
    }
  }

  async update(id: number, data: Partial<Company>) {
    try {
      const company = await this.CompanyRepo.findOne({ where: { id } });
      if (!company) throw new Error("Empresa não encontrado");

      if (data.password) {
        company.password = data.password
      }

      const { ...rest } = data;

      Object.assign(company, rest);

      return await this.CompanyRepo.save(company);
    } catch (e) {
      console.log(e)
    }
  }

  async remove(id: number) {
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

  // async acceptDelivery(companyId: number, deliveryId: number) {

  //   const delivery = await this.deliveryRepo.findOne({
  //     where: { id: deliveryId },
  //     relations: ["company"]
  //   })


  //   if (delivery.company.id !== companyId) {
  //     throw new Error("Esta empresa não tem permissão para aceitar a entrega");
  //   }

  //   return await this.deliveryRepo.save(delivery)
  // }

  // async rejectDelivery(companyId: number, deliveryId: number) {
  //   const delivery = await this.deliveryRepo.findOne({
  //     where: { id: deliveryId },
  //     relations: ["company"]
  //   })

  //   if (delivery.company.id !== companyId) {
  //     throw new Error("Esta empresa não tem permissão para aceitar a entrega");
  //   }

  //   delivery.status = DeliveryStatus.REJECTED;

  //   return await this.deliveryRepo.save(delivery)
  // }

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
