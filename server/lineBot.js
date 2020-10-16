
require('dotenv').config()
const line = require('@line/bot-sdk');

const client = new line.Client({channelAccessToken: process.env.LINE_channel_access_token});
            const collect= {name: "daro",age:"45"}
            const message = {
                "type": "text",
                "text": collect.age
            }
            console.log(message)
            client.pushMessage(process.env.line_user, message)
                .then(() => {
                    console.log("Bad plate inside")
                })
                .catch((err) => {
                    console.log(err)
                    // error handling
                });
