const axios = require('axios');
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOTP = async (phone) => {
  const otp = generateOTP();
  const message = `Your OTP is:${otp}.Do not share this with anyone for security reasons.`;

  try {
    const response = await axios.post(
      'https://www.fast2sms.com/dev/bulkV2',
      {},
      {
        params: {
          message,
          language: 'unicode',
          route: 'q',
          numbers: phone
        },
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log("✅ OTP sent:", response.data);
    return otp;
  } catch (error) {
    console.error("❌ OTP send error:", error.response?.data || error.message);
    return null;
  }
};
