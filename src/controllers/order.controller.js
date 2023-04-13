const httpStatus = require("http-status");
const{orderService} =require("../services");
const Response = require('../utils/Response');
const addOrder = async function(req,res){
    try {
        const obj = req.body;
        
        obj["IDNguoiDung"] = req.user;
        console.log(req.user);
        console.log(obj);
        await orderService.addOrder(obj);
        return res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getOrderByID = async function(req,res){
    try {
        const ID = req.params.ID;
        const data = await orderService.getOrderByID(ID);
        return res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const updateOrderByID = async function(req,res){
    try {
        const ID = req.params.ID;
        
        const data = await orderService.updateOrder(req.body,ID);
        return res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getAllOrder = async function(req,res){
    try {
        const data = await orderService.getAllOrder()
        return res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getOrderByIDUser = async function(req,res){
    try {
        const ID = req.user;
        const data = await orderService.getOrderByIDUser(ID)
        return res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getOrderDetailByIDOrder = async function(req,res){
    try {
        const ID = req.params.ID;
        const data = await orderService.getOrderDetailByIDOrder(ID)
        return res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getRevanuePerDay = async function(req,res){
    try {
        const data = await orderService.getRevanuePerDay()
        return res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getRevanue = async function(req,res){
    try {
        const data = await orderService.getRevanue()
        return res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getAmount = async function(req,res){
    try {
        const data = await orderService.getAmount()
        return res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        console.log(error);
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getAmountPerDay = async function(req,res){
    try {
        const data = await orderService.getAmountPerDay();
        return res.status(httpStatus.OK).json(new Response(false,"",data));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const getOrderPagination = async function (req, res) {
    try {
      const page = req.query.p;
      const size = req.query.s;
      const data = await orderService.getOrderPagination(page,size);
      return res.status(httpStatus.OK).json(new Response(false, "", data));
    } catch (err) {
      return res.status(httpStatus.BAD_REQUEST).json(err.message);
    }
  };
module.exports={
    addOrder,
    getOrderByID,
    getAllOrder,
    getOrderDetailByIDOrder,
    getRevanue,
    getAmount,
    getAmountPerDay,
    getOrderPagination,
    getRevanuePerDay,
    getOrderByIDUser,
    updateOrderByID,
}