import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
const connectionString = `${process.env.DATABASE_URL}`
import { PrismaClient } from '../generated/prisma/client.js'

const adapter = new PrismaPg({ connectionString })
const client = new PrismaClient({ adapter })

export { client }
