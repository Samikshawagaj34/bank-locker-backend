// Twilio या Firebase वापरून करू शकतो – आत्ता fake OTP वापरतो

exports.sendOTP = (phone) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Sending OTP ${otp} to phone: ${phone}`);
    return otp;
};
