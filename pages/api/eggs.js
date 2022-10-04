const mysql = require('./mysql').poolRaidsctba


export default function handler(req, res) {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'select * from raid left join gymdetails on raid.gym_id = gymdetails.gym_id left join gym on raid.gym_id = gym.gym_id WHERE START > NOW() + INTERVAL 185 MINUTE ORDER BY END;',
            (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    quantity: result.length,
                    eggs: result.map(egg => {
                        return {
                            id: egg.gym_id,
                            eggImg: `/assets/img/egg-level-${egg.level}.png`,
                            ginásio: egg.name,
                            level: egg.level,
                            inicio: egg.start,
                            fim: egg.end,
                            equipe: egg.team_id,
                            lat: egg.latitude,
                            lon: egg.longitude,
                        }
                    })
                }
                return res.status(200).send({ response })
            }
        )
    })
}