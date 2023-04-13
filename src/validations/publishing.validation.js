const { string } = require('joi');
const Joi = require('joi');
const addPublisher = {
    body: Joi.object().keys({
        TenNhaXuatBan: Joi.string().required(),
        DiaChi: Joi.string().required(),
    }),
};
const updatePulisher = {
    body: Joi.object().keys({
        TenNhaXuatBan: Joi.string().required(),
        DiaChi: Joi.string().required(),
    }),
    params: Joi.object().keys({
        ID:Joi.number().required(),
    }),
};
const deletePublisher = {
    body: Joi.object().keys({
    }),
    params: Joi.object().keys({
        ID:Joi.number().required(),
    }),
};

const getPublisher = {
    body: Joi.object().keys({
    }),
};
const getPublisherByID = {
    body: Joi.object().keys({
    }),
    params: Joi.object().keys({
        ID:Joi.number().required(),
    }),
};
module.exports ={
    addPublisher,
    updatePulisher,
    deletePublisher,
    getPublisher,
    getPublisherByID,
}