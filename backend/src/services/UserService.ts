import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { BadRequestException } from "@nestjs/common";

export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  async create(data: User) {
    const emailExist = await this.userRepo.findOne({
      where: { email: data.email },
    });
    const cpfExist = await this.userRepo.findOne({
      where: { cpf: data.cpf },
    });

    if (emailExist) throw new BadRequestException("E-mail já cadastrado");
    if (cpfExist) throw new BadRequestException("CPF já cadastrado");

    const user = await this.userRepo.create(data);
    return await this.userRepo.save(user);
  }

  async findAll() {
    try {
      const users = this.userRepo.find({ relations: ["delivery"] });
      return (await users).map((u) => {
        const clone: any = { ...u };
        delete clone.password;

        return clone;
      });
    } catch (e) {
      console.log("Erro: " + e);
    }
  }

  async findById(id: number) {
    try {
      const user = await this.userRepo.findOne({ where: { id }, relations: ["delivery"] });

      if (!user) throw new Error("Usuario não encotrado");

      const clone: any = { ...user };

      delete clone.password;

      return clone;
    } catch (e) {
      console.log("Erro: " + e);
    }
  }

  async update(id: number, data: Partial<User>) {
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

  async remove(id: number) {
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

  async updateFoto(userId: number, foto: string) {
    try {
      const user = await this.userRepo.findOneBy({ id: userId })
      if (!user) throw new Error("Usuário não encontrado");
      user.fotoPerfil = foto
      await this.userRepo.save(user)
    } catch (e) {
      console.log(e)
    }
  }
}
