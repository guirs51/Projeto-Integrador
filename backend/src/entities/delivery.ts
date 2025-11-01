import { Entity,PrimaryGeneratedColumn,Column,ManyToOne} from "typeorm";
import { User } from "./User";

@Entity('delivery')
export class Delivery{
    @PrimaryGeneratedColumn()
    id:number

    @Column({length: 100})
    deliveryLocal:string

    @Column({length:100})
    materialType:string

    @Column()
    deliveryDate:Date

    @ManyToOne(() => User, (user) => user.delivery)
    user:User

}