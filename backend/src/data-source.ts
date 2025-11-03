import 'reflect-metadata'
import { DataSource} from 'typeorm'
import { config } from 'dotenv'
import { User } from './entities/User'
import { Delivery } from './entities/delivery'

config()

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3000,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Delivery],
    synchronize: true, // cria tabelas automaticamentes (apenas para desevolvimento);
    logging: false
})