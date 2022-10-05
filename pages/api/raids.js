const mysql = require('./mysql').poolRaidsctba
const axios = require('axios');

async function getName(id) {
    if (id) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokename = await response.data.name;
        return pokename
    }
}


export default function handler(req, res) {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'select * from raid left join gymdetails on raid.gym_id = gymdetails.gym_id left join gym on raid.gym_id = gym.gym_id WHERE END >= NOW() + INTERVAL 185 MINUTE && START <= NOW() + INTERVAL 185 MINUTE && pokemon_id IS NOT NULL ORDER BY END;',
            async (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                res.setHeader('Cache-Control', 's-maxage=10', 'stale-while-revalidate')
                const response = {
                    quantity: result.length,
                    raids: await Promise.all(result.map(async (raid) => {
                        const name = await getName(raid.pokemon_id)
                        return {
                            id: raid.gym_id,
                            pokemonName: name,
                            pokemonId: raid.pokemon_id,
                            pokemonImg: raid.pokemon_id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${raid.pokemon_id}.png` : 'https://images5.fanpop.com/image/polls/965000/965378_1330663819592_full.png',
                            ginásio: raid.name,
                            level: raid.level,
                            inicio: raid.start,
                            fim: raid.end,
                            equipe: raid.team_id,
                            lat: raid.latitude,
                            lon: raid.longitude,
                        }
                    }))
                }

                return res.status(200).send({ response })
            }
        )
    })
}
