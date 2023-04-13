const {categoryService} = require('../services')
const httpStatus = require('http-status');
const Response = require('../utils/Response');

const addCategory = async function(req,res){
    const obj = req.body;
    try {
        await categoryService.addCategory(obj);
        res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}

const getAllCategory = async function(req,res){
    try {
        const data = await categoryService.getAllCategory();
        res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const deleteCategoryByID = async function(req,res){
    try {
        const ID = req.params.ID;
        await categoryService.deleteCategoryByID(ID);
        res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}

const updateCategoryByID = async function(req,res){
    try {
        const ID = req.params.ID;
        const obj = req.body;
        await categoryService.updateCategoryByID(ID,obj);
        res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getCategoryByID = async function(req,res){
    try {
        const ID = req.params.ID;
        const data = await categoryService.getCategoryByID(ID);
        res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getCategoryPagination = async function (req, res) {
    try {
      const page = req.query.p;
      const size = req.query.s;
      const data = await categoryService.getCategoryPagination(page,size);
      return res.status(httpStatus.OK).json(new Response(false, "", data));
    } catch (err) {
      return res.status(httpStatus.BAD_REQUEST).json(err.message);
    }
  };
module.exports = {
    addCategory,
    getCategoryByID,
    updateCategoryByID,
    deleteCategoryByID,
    getAllCategory,
    getCategoryPagination
}