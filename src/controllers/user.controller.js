const httpStatus = require('http-status');
const Response = require('../utils/Response');
const {userService} = require('../services');
const Uploader = require('../middlewares/Uploader');
const fs = require('fs');
const createUser = async (req,res)=>{
    try{
        console.log(req.body);
        const user = await userService.createUser(req.body);
        res.status(httpStatus.CREATED).json(new Response(false,'Create'));
    }
    catch(err){
        res.status(httpStatus.NOT_ACCEPTABLE).json(err);
    }
    
}

const getUser = async(req,res)=>{
    try{
        console.log(req.params.ID);
        const user = await userService.getUserById(req.params.ID);
        if(user.length == 0){
           return res.status(httpStatus.NOT_FOUND).json(new Response(true,"Not Found"));
        }
        return res.status(httpStatus.OK).json(new Response(false,'',user));
    }
    catch(err){
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new Response(true,"error"));
    }
}

const getAllUser = async (req,res)=>{
    try{
        const alluser = await userService.getAllUser();
        res.status(httpStatus.OK).json(alluser);
    }catch{
        console.log(e);
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const deleteUser = async (req,res)=>{
    try{
        const response = await userService.deleteUser(req.params.id);
        res.sendStatus(httpStatus.NO_CONTENT);
    }catch(err){
        console.log(err);
        res.status(httpStatus.NOT_FOUND).send(err);
    }
}

const getUserPagination = async(req,res)=>{
    try {
        const pageIndex = req.params.index;
        const result = await userService.getUserPagination(pageIndex);
        return res.status(httpStatus.OK).json(new Response(false,'',result));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(error);
    }
}
const changeInfoUser = async(req,res)=>{
    try {
        const id = req.user;
        const obj = {HoTen:req.body.HoTen,NgaySinh:req.body.NgaySinh,GioiTinh:req.body.GioiTinh};
        console.log(obj);
        await userService.updateUserById(id,obj)
        return res.status(httpStatus.OK).json(new Response(false,"Success"));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}
const changeInfoUserByAdmin = async(req,res)=>{
    try {
        const id = req.params.ID;
        await userService.updateUserById(id,req.body);
        return res.status(httpStatus.OK).json(new Response(false,"Success"));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}

const updateAvatar = async(req,res)=>{
    try {
        var upload = Uploader.single("image");
        upload(req,res,async function(err){
            if(err)return res.status(httpStatus.BAD_REQUEST).json(new Response(true,err.message));
            if (!req.file) {
                return res.status(httpStatus.BAD_REQUEST).json(new Response(true,'No file!'));
            }
            const id = req.user;
            // const id = req.body.Id;
            const user = await userService.getUserById(id);
            const scrImage = user[0].Anh;
           
            if(scrImage!= null){
                fs.unlink(scrImage,(err)=>{
                    if(err) throw err;
                })
            }
            
            let src = req.file.path.split('\\').join('/');
            const obj = {Anh:src};
            await userService.updateAvatar(id,obj);
            res.status(httpStatus.OK).json(new Response(false,"update avatar success",{Anh:process.env.URL+src}));
          }); 
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
    }
}

const getNewRegistration = async(req,res)=>{
    try {
        const result = await userService.getNewRegistration();
        return res.status(httpStatus.OK).json(new Response(false,'',result));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(error);
    }
}
const getNewRegistrationPerDay = async(req,res)=>{
    try {
        const result = await userService.getNewRegistrationPerDay();
        return res.status(httpStatus.OK).json(new Response(false,'',result));
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json(error);
    }
}
module.exports = {
    createUser,
    getAllUser,
    getUser,
    deleteUser,
    getUserPagination,
    changeInfoUser,
    updateAvatar,
    getNewRegistration,
    getNewRegistrationPerDay,
    changeInfoUserByAdmin,
}