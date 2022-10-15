import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient(/*{log: ['query']}*/)


export default async function handler(req, res) {
    if (req.method === 'GET') {
        const matches = await prisma.raid.findMany({
            where: {
                hourStart: {
                    gte: new Date()
                }
            },
            include: {
                players: {

                }
            },
            orderBy: {
                hourStart: 'asc'
            }
        })
        prisma.$disconnect
        return res.status(200).send(res.json(matches))

    } else {
        const body = req.body
        const isActive = await prisma.raid.findUnique({
            where: {
                id: body.id,
            },
        })

        if (!isActive) {
            const match = await prisma.raid.create({
                data: {
                    id: body.id,
                    hourStart: body.hourStart,
                    hourEnd: body.hourEnd,
                    raidLevel: body.raidLevel,
                    pokemonImg: body.pokemonImg,
                    pokemonId: body.pokemonId,
                    pokemonName: body.pokemonName,
                    gym: body.gym,
                    gymTeam: body.gymTeam,
                    lat: body.lat,
                    lon: body.lon,
                }
            })

            const player = await prisma.players.create({
                data: {
                    raidId: body.id,
                    username: body.username,
                    playerLevel: body.playerLevel,
                    team: body.team,
                    playType: body.playType,
                }
            })
            prisma.$disconnect
            return res.status(201).json(match)// Handle any other HTTP method
        } else {
            const player = await prisma.players.create({
                data: {
                    raidId: body.id,
                    username: body.username,
                    playerLevel: body.playerLevel,
                    team: body.team,
                    playType: body.playType,
                }
            })
            prisma.$disconnect
            return res.status(201).json(player)// Handle any other HTTP method
        }

    }
}
