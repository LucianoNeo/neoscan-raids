import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({
    log: ['query']
})


export default async function handler(req, res) {
    const matches = await prisma.raid.findMany({
        include: {
            players: {

            }
        }
    })
    return res.json(matches)
}
