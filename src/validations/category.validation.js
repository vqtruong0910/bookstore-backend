const { string } = require('joi');
const Joi = require('joi');
const addCategory = {
    body: Joi.object().keys({
        TenDanhMuc: Joi.string().required(),
    }),
};
const updateCategory = {
    body: Joi.object().keys({
        TenDanhMuc: Joi.string().required(),
    }),
    params: Joi.object().keys({
        ID: Joi.number().required(),
    }),
};
const deleteCategory = {
    body: Joi.object().keys({
    }),
    params: Joi.object().keys({
        ID: Joi.number().required(),
    }),
};

const getCategoryPage = {
    body: Joi.object().keys({
    }),
    query: Joi.object().keys({
        p: Joi.number().required(),
        s: Joi.number().required(),
    }),
};
const getCategory = {
    body: Joi.object().keys({
    }),
};
const getCategoryByID = {
    body: Joi.object().keys({
    }),
    params: Joi.object().keys({
        ID: Joi.number().required(),
    }),
};
module.exports ={
    addCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    getCategoryPage,
    getCategoryByID
}