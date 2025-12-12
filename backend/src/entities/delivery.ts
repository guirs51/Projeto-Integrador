import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn} from "typeorm";
import { User } from "./User";
import { Company } from "./Company";

export enum DeliveryStatus{
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected"
}


@Entity('delivery')
export class Delivery{
    @PrimaryGeneratedColumn()
    id:number

    @Column({length: 100})
    deliveryLocal:string

    @Column({length:100})
    materialType:string

    @ManyToOne(() => Company, company => company.delivery)
    company:Company;

    @Column({type:"enum", enum :DeliveryStatus,default:DeliveryStatus.PENDING})
    status:DeliveryStatus;

    @Column()
    deliveryDate: string

    @ManyToOne(() => User, (user) => user.delivery)
    @JoinColumn({ name: 'user_id' }) // ← Adicionar JoinColumn para criar a FK
    user: User
}