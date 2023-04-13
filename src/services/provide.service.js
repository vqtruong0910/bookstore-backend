const {Provide} = require('../models');
const DB_Define = require('../utils/DB_Define');
const provide = new Provide();
//crud provider
const addProvider = async function(obj){
    try {
        const{TenNhaCungCap,DiaChi} = obj;
        await provide.addData(DB_Define.provide_table,{TenNhaCungCap,DiaChi});
    } catch (error) {
        throw error;
    }
   
}

const deleteProvider = async function(id){
    try {
        await provide.deleteData(DB_Define.provide_table,"IDNhaCungCap",id);
    } catch (error) {
        throw error;
    }
}

const updateProvider = async function(obj,ID){
    try {
        const{TenNhaCungCap,DiaChi} = obj;
        await provide.updateData(DB_Define.provide_table,"IDNhaCungCap",obj,ID);
    } catch (error) {
        throw error;   
    }
}

const getProvider = async function(){
    try {
        const array = await provide.getAll(DB_Define.provide_table,"IDNhaCungCap");
        if(array.length ===0) throw new Error('ID Not found');
    return array;
    } catch (error) {
        throw error;
    }
}
const getProviderByID = async function(ID){
    try {
        return await provide.getOne(DB_Define.provide_table,"IDNhaCungCap",ID);
    } catch (error) {
        throw error
    }
}
// crud goods received note
const createGRS = async function(obj){
    try {
        return await provide.addData(DB_Define.GRS,obj);
    } catch (error) {
       throw error; 
    }
}
const deleteGRS = async function(id){
    try {
        await provide.deleteData(DB_Define.GRS,"IDNhaCungCap",id);
    } catch (error) {
        throw error;
    }
}

const updateGRS = async function(obj,ID){
    try {
        const{TenNhaCungCap,DiaChi} = obj;
        await provide.updateData(DB_Define.GRS,"IDPhieuNhap",obj,ID);
    } catch (error) {
        throw error;   
    }
}

const getGRS = async function(){
    try {
        const array = await provide.getAll(DB_Define.GRS,"IDPhieuNhap");
        if(array.length ===0) throw new Error('ID Not found');
    return array;
    } catch (error) {
        throw error;
    }
}
const getGRSByID = async function(ID){
    try {
        return await provide.getOne(DB_Define.GRS,"IDPhieuNhap",ID);
    } catch (error) {
        throw error
    }
}
//crud GRS detail
const createGRSDetail = async function(obj){
    try {
        return await provide.addData(DB_Define.GRSDetail,obj);
    } catch (error) {
       throw error; 
    }
}
const deleteGRSDetail = async function(id){
    try {
        await provide.deleteData(DB_Define.GRSDetail,"IDNhaCungCap",id);
    } catch (error) {
        throw error;
    }
}

const updateGRSDetail = async function(obj,ID){
    try {
        const{TenNhaCungCap,DiaChi} = obj;
        await provide.updateData(DB_Define.GRSDetail,"IDChiTietPhieuNhap",obj,ID);
    } catch (error) {
        throw error;   
    }
}
const getGRSDetailByID = async function(ID){
    try {
        return await provide.getOne(DB_Define.GRSDetail,"IDChiTietPhieuNhap",ID);
    } catch (error) {
        throw error
    }
}
const getGRSDetailByIDGRS = async function(ID){
    try {
        return await provide.getOne(DB_Define.GRSDetail,"IDPhieuNhap",ID);
    } catch (error) {
        throw error
    }
}
module.exports = {
    addProvider,
    deleteProvider,
    updateProvider,
    getProviderByID,
    getProvider,
    createGRS,
    deleteGRS,
    updateGRS,
    getGRS,
    getGRSByID,
    createGRSDetail,
    updateGRSDetail,
    getGRSDetailByID,
    getGRSDetailByIDGRS,
    deleteGRSDetail,
}