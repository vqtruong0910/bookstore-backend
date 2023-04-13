const { string } = require('joi');
const Joi = require('joi');
const changeInfo = {
    body: Joi.object().keys({
        HoTen: Joi.string().required(),
        SoDienThoai: Joi.number().required(),
        GioiTinh: Joi.number().required(),
        NgaySinh: Joi.string().required().isoDate(),
    }),
};
const changeInfoByAdmin = {
    body: Joi.object().keys({
        TrangThai: Joi.number().required(),
        Quyen: Joi.number().required(),
    }),
    params: Joi.object().keys({
        ID:Joi.number().required(),
    }),
};
const getInfor = {
    body: Joi.object().keys({
    }),
};
const getInforByID = {
    body: Joi.object().keys({
    }),
    params: Joi.object().keys({
        ID:Joi.number().required(),
    }),
};
const getInforByIndex = {
    body: Joi.object().keys({
    }),
    params: Joi.object().keys({
        index:Joi.number().required(),
    }),
};
const deleteByID = {
    body: Joi.object().keys({
    }),
    params: Joi.object().keys({
        ID:Joi.number().required(),
    }),
};

module.exports ={
    changeInfo,
    getInfor,
    changeInfoByAdmin,
    getInforByID,
    deleteByID,
    getInforByIndex,
}