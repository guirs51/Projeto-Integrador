 import { cp } from "fs";
import { Entity,PrimaryGeneratedColumn,Column,ManyToOne} from "typeorm";
 
 @Entity('prize')
 export class Prize{
     @PrimaryGeneratedColumn()
     id_prize:number
 
    @Column({length: 120})
    name_prize: String

     @Column({length: 100})
     prize_points:string
 
 }