import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import bycrypt from 'bcrypt';
import { Delivery } from "./delivery";

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn()
    id: Number

    @Column({ length: 100 })
    name: String

    @Column({ unique: true, length: 200 }) 
    email: string

    @Column({ unique: true, length: 20 })
    cnpj: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}