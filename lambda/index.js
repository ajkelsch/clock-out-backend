const axios = require('axios');
require('dotenv').config();


const lambdaFunction = async (event, context) => {
  try {
    await SendPushNotification();
    return {
      statusCode: 200,
      body: JSON.stringify('Push notification sent successfully!'),
    };
  } catch (error) {
    console.error('Error sending push notification:', error);
    return {
      statusCode: 500,
      body: JSON.stringify('Failed to send push notification'),
    };
  }
};

const SendPushNotification = async () => {
  const pushId = process.env.DEVICE_PUSH_ID;

  const data = {
    to: `ExponentPushToken[${pushId}]`,
    title: "Clock Out Reminder",
    body: "Time to clock out :)",
  };

  const response = await axios.post('https://exp.host/--/api/v2/push/send', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response.data);
};

module.exports = { lambdaFunction };