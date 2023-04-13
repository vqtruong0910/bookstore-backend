const { string } = require('joi');
const Joi = require('joi');
const { MatKhau } = require('./custom.validation');
const register = {
    body: Joi.object().keys({
        HoTen: Joi.string().required(),
        Email: Joi.string().required().email(),
        MatKhau: Joi.string().required().custom(MatKhau),
        GioiTinh: Joi.number().required(),
        NgaySinh: Joi.string().required().isoDate(),
    }),
};
const login = {
    body: Joi.object().keys({
        Email: Joi.string().required().email(),
        MatKhau: Joi.string().required().custom(MatKhau),
    }),
};

const sendVerificationEmail = {
    body: Joi.object().keys({
        Email: Joi.string().required().email(),
    })
}

const verifyEmailToken = {
    body: Joi.object().keys({
        token: Joi.string().required(),
    })
}

const refreshToken = {
    body: Joi.object().keys({
    })
}

const sendEmailResetPassword ={
    body: Joi.object().keys({
        Email: Joi.string().required().email()
    })
}

const resetPassword = {
    body:Joi.object().keys({
        resetPasswordToken: Joi.string().required(),
        newPassword:Joi.string().required().custom(MatKhau),
    })
}

const logout = {
    body: Joi.object().keys({
    })
}
const changePassword = {
    body: Joi.object().keys({
        Email:Joi.string().required().email(),
        oldPassword:Joi.string().required().custom(MatKhau),
        newPassword:Joi.string().required().custom(MatKhau),
    })
}
module.exports = {
    register,
    login,
    sendVerificationEmail,
    verifyEmailToken,
    resetPassword,
    sendEmailResetPassword,
    refreshToken,
    logout,
    changePassword,
}