import 'reflect-metadata'
import { DataSource} from 'typeorm'
import { config } from 'dotenv'
import { User } from './entities/User'
import { Delivery } from './entities/delivery'
import { Company } from './entities/Company'
import { Prize } from './entities/Prize'
import { Admin } from './entities/Admin'
import { Material } from './entities/Material'

config()

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Delivery, Company, Prize, Admin, Material],
    synchronize: true, // cria tabelas automaticamentes (apenas para desevolvimento);
    logging: false
})