const axios = require('./node_modules/axios/index.d.cts');
require('dotenv').config();


const lambdaFunction = async (event, context) => {
  await SendPushNotification();
};

const SendPushNotification = async () => {
  const pushId = process.env.DEVICE_PUSH_ID;

  const data = {
    to: `ExponentPushToken[${pushId}]`,
    title: "hello",
    body: "world"
  };

  axios.post('https://exp.host/--/api/v2/push/send', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

module.exports = { lambdaFunction };