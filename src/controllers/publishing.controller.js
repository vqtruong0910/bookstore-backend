const httpStatus = require('http-status');
const {publishingService} = require('../services');
const Response = require('../utils/Response');

const addPublisher = async function(req,res){
    const obj = req.body;
    try {
        await publishingService.addPublisher(obj);
        res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}

const deletePublisher = async function(req,res){
    try {
        const ID = req.params.ID;
        await publishingService.deletePublisher(ID);
        res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}

const updatePublisher = async function(req,res){
    try {
        const ID = req.params.ID;
        const obj = req.body;
        await publishingService.updatePublisher(obj,ID);
        res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getPublisherByID = async function(req,res){
    try {
        const ID = req.params.ID;
        const data = await publishingService.getPublisherByID(ID);
        res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getPublisher = async function(req,res){
    try {
        const data = await publishingService.getPublisher();
        res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getPublishingPagination = async function (req, res) {
    try {
      const page = req.query.p;
      const size = req.query.s;
      const data = await publishingService.getPublishingPagination(page,size);
      return res.status(httpStatus.OK).json(new Response(false, "", data));
    } catch (err) {
      return res.status(httpStatus.BAD_REQUEST).json(err.message);
    }
  };
module.exports = {
    addPublisher,
    getPublisher,
    getPublisherByID,
    updatePublisher,
    deletePublisher,
    getPublishingPagination,
}