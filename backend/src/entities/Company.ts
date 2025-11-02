import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import bycrypt from 'bcrypt';
import { Delivery } from "./Delivery";

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn()
    id: Number

    @Column({ length: 100 })
    name: String

    // @Column({ unique: true, length: 200 }) -> acho que pode ser util ter o email da empressa. 
    // email: string

    @Column({ unique: true, length: 20 })
    cnpj: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}