import { Entity,PrimaryGeneratedColumn,Column,ManyToOne} from "typeorm";
 
 @Entity('prize')
 export class Prize{
     @PrimaryGeneratedColumn()
     id:number
 
    @Column({length: 120})
    namePrize: string

     @Column()
     prizePoints: number

     @Column()
     descricao: string

 }