import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  async create(data: {name: string; email: string; cpf: string; password: string;}) {
    try {
      const emailExist = await this.userRepo.findOne({
        where: { email: data.email },
      });
      const cpfExist = await this.userRepo.findOne({
        where: { cpf: data.cpf },
      });

      if (emailExist) throw new Error("E-mail já cadastrado");
      if (cpfExist) throw new Error("CPF já cadastrado");

      const user = await this.userRepo.create(data);
      return await this.userRepo.save(user);
    } catch (e) {
      console.log("Erro: " + e);
    }
  }

  async findAll() {
    try {
      const users = this.userRepo.find();
      return (await users).map((u) => {
        const clone: any = { ...u };
        delete clone.password;

        return clone;
      });
    } catch (e) {
      console.log("Erro: " + e);
    }
  }

  async findById(id: Number) {
    try {
      const user = await this.userRepo.findOne({ where: { id } });

      if (!user) throw new Error("Usuario não encotrado");

      const clone: any = { ...User };

      delete clone.password;

      return clone;
    } catch (e) {
      console.log("Erro: " + e);
    }
  }

  async update(id: Number, data: Partial<User>) {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) throw new Error("usuario não encontrado");

      if (data.password) {
        user.password = data.password;
      }

      const { password, ...rest } = data;

      Object.assign(user, rest);

      return await this.userRepo.save(user);
    } catch (e) {
      console.log("Erro: " + e);
    }
  }

  async remove(id: Number) {
    try {
      const user = await this.userRepo.findOne({ where: { id } });

      if (!user) throw new Error("Usuario não encontrado");

      await this.userRepo.remove(user);

      return { mensagem: "Usuario deletado" };
    } catch (e) {
      console.log("Erro: " + e);
    }
  }

  async findEmail(email: string) {
    try {
      const user = await this.userRepo.findOne({ where: { email } });

      if (!user) throw new Error("Usuario não encontrado");

      return user;
    } catch (e) {
      console.log("Erro:" + e);
    }
  }
}
