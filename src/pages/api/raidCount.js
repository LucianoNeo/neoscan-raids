const mysql = require('./mysql').poolRaidsctba
const axios = require('axios');



export default function handler(req, res) {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT COUNT(*) FROM raid WHERE LEVEL = ${req.params.level} && start < NOW()- INTERVAL 1 DAY`,
            async (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    count: result,
                }

                return res.status(200).send({ response })
            }
        )
    })
}
