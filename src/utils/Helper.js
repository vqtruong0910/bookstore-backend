const jwt = require('jsonwebtoken');
const Helper = {
    getAccesstoken: (payload,expires) => {
        if (expires) {
            return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: expires});
        } else {
            return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
        }
    },
    
    verifyAccesstoken: (token) => {
      return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    },
    getVerifyEmailToken: (payload,expires) => {
        if (expires) {
            return jwt.sign(payload, process.env.VERIFY_EMAIL_TOKEN, {expiresIn: expires});
        } else {
            return jwt.sign(payload, process.env.VERIFY_EMAIL_TOKEN);
        }
    },
    
    verifyEmailToken: (token) => {
      return jwt.verify(token, process.env.VERIFY_EMAIL_TOKEN);
    },
    getRefreshToken: (payload,expires) => {
        if (expires) {
            return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: expires});
        } else {
            return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
        }
    },
    
    verifyRefreshToken: (token) => {
      return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    },

    getPasswordToken: (payload,expires) => {
        if (expires) {
            return jwt.sign(payload, process.env.RESET_PASSWORD_TOKEN, {expiresIn: expires});
        } else {
            return jwt.sign(payload, process.env.RESET_PASSWORD_TOKEN);
        }
    },
    
    verifyPasswordToken: (token) => {
      return jwt.verify(token, process.env.RESET_PASSWORD_TOKEN);
    },
}
module.exports = Helper;