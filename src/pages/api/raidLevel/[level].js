const mysql = require('../mysql').poolRaidsctba
const axios = require('axios');

export default function handler(req, res) {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const { level } = req.query
        conn.query(
            `SELECT COUNT(*) AS LEVEL FROM raid WHERE LEVEL = ${level} && start < NOW()- INTERVAL 1 DAY`,
            async (error, result) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                const count = result[0].LEVEL
                return res.status(200).send(count)
            }
        )
    })
}
