import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import bycrypt from 'bcrypt';
import { Delivery } from "./delivery";

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    name: String

    @Column({ unique: true, length: 200 })
    email: string

    @Column({ unique: true, length: 20 })
    cnpj: string

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

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