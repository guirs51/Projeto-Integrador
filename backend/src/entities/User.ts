import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import bycrypt from 'bcrypt';
import { Delivery } from "./delivery";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    name: string

    @Column({ unique: true, length: 200 })
    email: string

    @Column({ unique: true, length: 20, nullable: true })
    cpf: string

    @Column({ nullable: true, default: 0 })
    Points: number

    @Column({ nullable: true })
    password: string; // deixa de ser obrigatório

    @Column({ nullable: true, unique: true })
    googleId: string;

    @Column({ default: 'local' })
    provider: 'local' | 'google';

    @Column({ nullable: true })
    fotoPerfil: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Delivery, (delivery) => delivery.user, {
        onDelete: "CASCADE"
    })
    delivery: Delivery[];

    //salvar a senha antes de salvar ou atualizar dados
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if ( this.password &&  !this.password.startsWith('$2')) {
            const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
            this.password = await bycrypt.hash(this.password, rounds);
        }
    }

    async validatePassword(plain: string): Promise<boolean> {
        return bycrypt.compare(plain, this.password)
    }
}