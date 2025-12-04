import jwt, { SignOptions } from 'jsonwebtoken';

interface Payload {
    id: number;
    email: string;
    // outros campos se precisar
}

export const generateToken = (payload: Payload): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET não definido');
    }

    const options: SignOptions = {
        expiresIn: Number(process.env.JWT_EXPIRES_IN) || "1d"
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
};


export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err: any) {
        return "Erro: " + err;
    }
};