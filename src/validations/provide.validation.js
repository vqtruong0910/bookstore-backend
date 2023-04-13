const { string } = require('joi');
const Joi = require('joi');
const addProvider = {
    body: Joi.object().keys({
        TenNhaCungCap: Joi.string().required(),
        DiaChi: Joi.string().required(),
    }),
};
const updateProvider = {
    body: Joi.object().keys({
        TenNhaCungCap: Joi.string().required(),
        DiaChi: Joi.string().required(),
    }),
    params: Joi.object().keys({
        ID:Joi.number().required(),
    }),
};
const deleteProvider = {
    body: Joi.object().keys({
    }),
    params: Joi.object().keys({
        ID:Joi.number().required(),
    }),
};
const getProvider = {
    body: Joi.object().keys({
    }),
};
const getProviderByID = {
    body: Joi.object().keys({
    }),
    params: Joi.object().keys({
        ID:Joi.number().required(),
    }),
};
module.exports ={
    addProvider,
    updateProvider,
    deleteProvider,
    getProvider,
    getProviderByID,
}