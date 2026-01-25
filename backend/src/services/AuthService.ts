import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { generateToken } from "../utils/jwt";

interface GoogleData {
    googleId: string
    email: string,
    name: string,
    foto: string,
}

interface Payload {
    id: number,
    email: string
}

export class AuthService {
    async loginWithGoogle(googleData: GoogleData) {
        try {
            const repo = AppDataSource.getRepository(User);

            let user = await repo.findOne({
                where: { email: googleData.email }
            });

            if (user && !user.googleId) {
                user.googleId = googleData.googleId;
                user.fotoPerfil = googleData.foto;
                await repo.save(user);
            }

            if (!user) {
                user = repo.create({
                    name: googleData.name,
                    email: googleData.email,
                    googleId: googleData.googleId,
                    fotoPerfil: googleData.foto,
                    password: null,
                });

                await repo.save(user);
            }

            const payload: Payload = {id: user.id, email: user.email}
            const token = generateToken(payload);

            return {
                token: token,
                userId: user.id
            };
        } catch (e) {
            console.log(e)
        }
    }
}