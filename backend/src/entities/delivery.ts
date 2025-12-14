import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Company } from "./Company";

@Entity('delivery')
export class Delivery {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    deliveryLocal: string

    @Column({ length: 100 })
    materialType: string

    @Column({ default: "PENDING" })
    status: string

    @Column()
    quantidade: number

    @ManyToOne(() => User, (user) => user.delivery, {
        nullable: true,
        onDelete: "SET NULL"
    })
    @JoinColumn({ name: 'user_id' }) // ← Adicionar JoinColumn para criar a FK
    user: User | null
}