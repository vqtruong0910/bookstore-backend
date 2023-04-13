const httpStatus = require('http-status');
const{provideService} = require('../services');
const Response = require('../utils/Response');

const addProvider = async function (req,res){
    try {
        await provideService.addProvider(req.body);
        return res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
};

const updateProvider = async function (req,res){
    try {
        const ID = req.params.ID;
        console.log(ID);
        await provideService.updateProvider(req.body, ID);
        return res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
};


const deleteProvider = async function (req,res){
    try {
        await provideService.deleteProvider(req.params.ID);
        return res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
};

const getProvider = async function(req,res){
    try {
        const data = await provideService.getProvider();
        let arr = req.originalUrl.split('/');
        console.log();
        if(data.length == 0){
            return res.status(httpStatus.NOT_FOUND).json(new Response(true,"Not Found"));
         }
        return res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getProviderByID = async function(req,res){
    try {
        const ID = req.params.ID;
        const data = await provideService.getProviderByID(ID);
        if(data.length == 0){
            return res.status(httpStatus.NOT_FOUND).json(new Response(true,"Not Found"));
         }
        return res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
module.exports = {
    addProvider,
    updateProvider,
    deleteProvider,
    getProvider,
    getProviderByID,
}