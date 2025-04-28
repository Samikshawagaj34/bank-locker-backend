const twilio = require('twilio');
require('dotenv').config();

const client = new twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

exports.sendOTP = async (phone) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        await client.messages.create({
            body: `Your OTP for Bank Locker Security is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone.startsWith('+') ? phone : `+91${phone}`   // India Number असल्यास +91 लावा
        });
        console.log(`OTP ${otp} sent successfully to ${phone}`);
        return otp;
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
};
