import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import bycrypt from 'bcrypt';

@Entity('admin')
export class Admin {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    password: string

    @Column()
    role: "admin"

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    //salvar a senha antes de salvar ou atualizar dados
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (!this.password.startsWith('$2')) {
            const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
            this.password = await bycrypt.hash(this.password, rounds);
        }
    }

    async validatePassword(plain: string): Promise<boolean> {
        return bycrypt.compare(plain, this.password)
    }
}