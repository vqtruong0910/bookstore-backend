const { string } = require('joi');
const Joi = require('joi');
const addProduct = {
    body: Joi.object().keys({
        DonViTinh: Joi.string().required(),
        GiaBan:Joi.number().required(),
        GiamGia:Joi.number(),
        HinhAnh:Joi.required(),
        IDNhaXuatBan:Joi.string().required(),
        IDTheLoai: Joi.string().required(),
        SoLuongConLai: Joi.number().required(),
        SoTrang:Joi.number().required(),
        TacGia:Joi.number().required(),
        TenSanPham: Joi.string().required(),
        TomTatND: Joi.string(),
    }),
};
const updateProduct = {
    body: Joi.object().keys({
        TenSanPham: Joi.string().required(),
        IDDanhMuc: Joi.string().required(),
        IDNhaXuatBan:Joi.string().required(),
        DonViTinh: Joi.string().required(),
        TomTatND: Joi.string(),
        GiaBan:Joi.number().required(),
        Giamgia:Joi.number(),
        SoTrang:Joi.number().required(),
    }),
};
const deleteProduct = {
    body: Joi.object().keys({
    }),
    params: Joi.object().keys({
        ID:Joi.number().required(),
    }),
};
const getProduct = {
    body: Joi.object().keys({
    }),
};
const search = {
    body: Joi.object().keys({
    }),
    query: Joi.object().keys({
        name: Joi.string().required(),
    }),
};
const getProductPage = {
    body: Joi.object().keys({
    }),
    query: Joi.object().keys({
        p: Joi.number().required(),
        s: Joi.number().required(),
    }),
};
const getProductByKind = {
    body: Joi.object().keys({
    }),
    query: Joi.object().keys({
        k: Joi.number().required(),
        p: Joi.number().required(),
        s: Joi.number().required(),
    }),
};
const getProductByCategory = {
    body: Joi.object().keys({
    }),
    query: Joi.object().keys({
        c: Joi.number().required(),
        p: Joi.number().required(),
        s: Joi.number().required(),
    }),
};
const getProductByID = {
    body: Joi.object().keys({
    }),
    params: Joi.object().keys({
        ID:Joi.number().required(),
    }),
};
const filter = {
    query: Joi.object().keys({
        c: Joi.number(),
        k: Joi.number(),
        d: Joi.string(),
        p: Joi.number().required(),
        s: Joi.number().required(),
    }),
};
module.exports ={
    addProduct,
    getProduct,
    deleteProduct,
    updateProduct,
    filter,
    getProductByID,
    getProductByKind,
    getProductByCategory,
    getProductPage,
    search,
}