const axios = require('axios');
require('dotenv').config();

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