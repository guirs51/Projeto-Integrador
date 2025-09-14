import 'reflect-metadata'
import { DataSource} from 'typeorm'
import { config } from 'dotenv'
import { User } from './entities/User'

config()

export const appDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
    synchronize: true, // cria tabelas automaticamentes (apenas para desevolvimento);
    logging: false
})