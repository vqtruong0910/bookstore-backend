const { string } = require('joi');
const Joi = require('joi');
const addKindProduct = {
    body: Joi.object().keys({
        TenTheLoai:Joi.string().required(),
        IDDanhMuc:Joi.number().required(),
    }),
};
const updateKindProduct = {
    body: Joi.object().keys({
        TenTheLoai:Joi.string().required(),
        IDDanhMuc:Joi.number().required(),
    }),
    params: Joi.object().keys({
        ID: Joi.number().required(),
    }),
};
const deleteKindProduct = {
    body: Joi.object().keys({
    }),
    params: Joi.object().keys({
        ID: Joi.number().required(),
    }),
};

const getKindProduct = {
    body: Joi.object().keys({
    }),
};
const getKindProductByID = {
    body: Joi.object().keys({
    }),
    params: Joi.object().keys({
        ID: Joi.number().required(),
    }),
};
module.exports ={
    addKindProduct,
    getKindProduct,
    updateKindProduct,
    deleteKindProduct,
    getKindProductByID,
}