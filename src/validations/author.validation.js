const { string } = require('joi');
const Joi = require('joi');
const addAuthor = {
    body: Joi.object().keys({
        TenTacGia: Joi.string().required(),
        DiaChi: Joi.string().required(),
    }),
};
const updateAuthor = {
    body: Joi.object().keys({
        TenTacGia: Joi.string().required(),
        DiaChi: Joi.string().required(),
    }),
    params:Joi.object().keys({
        ID:Joi.number().required()
    }),
};
const deleteAuthor = {
    body: Joi.object().keys({
    }),
    params:Joi.object().keys({
        ID:Joi.number().required()
    }),
};

const getAuthor = {
    body: Joi.object().keys({
    }),
};
const getAuthorByID = {
    body: Joi.object().keys({
    }),
    params:Joi.object().keys({
        ID:Joi.number().required()
    }),
};
const getAuthorPage = {
    body: Joi.object().keys({
    }),
    query: Joi.object().keys({
        p:Joi.number().required(),
        s:Joi.number().required(),
    })
};
module.exports ={
    addAuthor,
    updateAuthor,
    deleteAuthor,
    getAuthor,
    getAuthorPage,
    getAuthorByID,
}