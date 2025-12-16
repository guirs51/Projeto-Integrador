import { IsEmail, isNotEmpty, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateUserDTO {
    @IsNotEmpty({ message: "O nome é obrigatorio" })
    @Matches(/^[A-Za-zÀ-ÿ\s]+$/, { message: "O nome deve conter apenas letras e espaços" })
    @MaxLength(30, { message: "O maximo de caracteres permitido é 30" })
    name: string

    @IsNotEmpty({ message: "O email é obrigatorio" })
    @IsEmail({}, { message: "E-mail invalido" })
    @MaxLength(100, { message: "O maximo de caracteres é 100" })
    email: string

    @IsNotEmpty({ message: "A senha é obrigatorio" })
    @MinLength(6, { message: "Senha deve ter no mínimo 6 caracteres" })
    @Matches(/(?=.*[a-z])/, { message: "Senha deve conter pelo menos uma letra minúscula" })
    @Matches(/(?=.*[A-Z])/, { message: "Senha deve conter pelo menos uma letra maiúscula" })
    @Matches(/(?=.*\d)/, { message: "Senha deve conter pelo menos um número" })
    @Matches(/(?=.*[@$!%*?&])/, { message: "Senha deve conter pelo menos um caractere especial (@$!%*?&)" })
    password: string;


    @IsNotEmpty({ message: "O cpf é obrigatorio" })
    @IsString()
    cpf:string

}