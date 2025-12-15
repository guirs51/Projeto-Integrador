import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity('material')
export class Material {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 120, unique: true })
    name: string

    @Column()
    points: number

}