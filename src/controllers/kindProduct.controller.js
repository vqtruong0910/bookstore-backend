const {kindProductService} = require('../services')
const httpStatus = require('http-status');
const Response = require('../utils/Response');

const addKindProduct = async function(req,res){
    const obj = req.body;
    try {
        await kindProductService.addKindProduct(obj);
        res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}

const deleteKindProductByID = async function(req,res){
    try {
        const ID = req.params.ID;
        await kindProductService.deleteKindProductByID(ID);
        res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}

const updateKindProductByID = async function(req,res){
    try {
        const ID = req.params.ID;
        const obj = req.body;
        await kindProductService.updateKindProductByID(ID,obj);
        res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getKindProduct = async function(req,res){
    try {
        const data = await kindProductService.getKindProduct();
        res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getKindProductByID = async function(req,res){
    try {
        const ID = req.params.ID;
        const data = await kindProductService.getKindProductByID(ID);
        res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getKindProudctByIDCategory = async function(req,res){
    try {
        const ID = req.params.ID;
        const data = await kindProductService.getKindProductByIDCategory(ID);
        for await(element of data){
            delete element["IDDanhMuc"];
        }
        res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
module.exports = {
    getKindProduct,
    addKindProduct,
    getKindProductByID,
    updateKindProductByID,
    deleteKindProductByID,
    getKindProudctByIDCategory,
}