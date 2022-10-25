
const axios = require('axios').default;



export default async function handler(req, res) {
    if (req.method === 'GET') {
        return res.status(200).send({ "message": "Notification API working!" })
    }
    if (req.method === 'POST') {
        const options = {
            method: 'POST',
            url: 'https://onesignal.com/api/v1/notifications',
            headers: {
                accept: 'application/json',
                Authorization: `Basic ${process.env.API_ONESIGNAL}`,
                'content-type': 'application/json'
            },
            data: {
                app_id: process.env.APP_ID,
                included_segments: ['Subscribed Users'],
                contents: { en: `Nova raid Level ${req.body.level} agendada no ginásio: ${req.body.gym} às ${req.body.start}h` },
                name: 'NOVA RAID AGENDADA!'
            }
        };

        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                return res.status(200).send({ "message": "Notification sent!" })
            })
            .catch(function (error) {
                console.error(error);
                return res.status(401).send(error)
            });


    }
}
