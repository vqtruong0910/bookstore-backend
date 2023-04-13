const {Publishing} = require('../models');
const publisher = new Publishing();
const DB_Define = require('../utils/DB_Define');

const addPublisher = async function(obj){
    try {
        return publisher.addData(DB_Define.PublishingCompany,obj);
    } catch (error) {
        throw error;
    }
}
const getPublisher = async function(){
    try {
        const data = await publisher.getAll(DB_Define.PublishingCompany,"IDNhaXuatBan");
        if(data.length === 0) throw new Error("Publisher not found");
        return data;
    } catch (error) {
        throw error;
    }
}

const getPublisherByID = async function(ID){
    try {
        const data = await publisher.getOne(DB_Define.PublishingCompany,"IDNhaXuatBan",ID);
        if(data.length === 0) throw new Error("Publisher not found");
        return data;
    } catch (error) {
        throw error;
    }
}

const updatePublisher = async function(obj,ID){
    try {
        await getPublisherByID(ID);
        return publisher.updateData(DB_Define.PublishingCompany,"IDNhaXuatBan",obj,ID);
    } catch (error) {
        throw error;
    }
}

const deletePublisher = async function(ID){
    try {
        await getPublisherByID(ID);
        return publisher.deleteData(DB_Define.PublishingCompany,"IDNhaXuatBan",ID);
    } catch (error) {
        throw error;
    }
}
const getPublishingPagination = async function(page,size){
    try {
        const data = await publisher.getPublishingPagination(page,size);
        if (data.length === 0) {
          throw new Error('Page Not Found'); 
        }
        const amount = await publisher.countAll(DB_Define.PublishingCompany);
        const amountPage = Math.ceil(amount[0].soluong / size);
        return {
          DanhSach: data,
          TongNhaXuatBan: amount[0].soluong,
          SoLuongTrang: amountPage,
        };
      } catch (error) {
          throw error;
      }
} 
module.exports = {
    addPublisher,
    updatePublisher,
    getPublisherByID,
    deletePublisher,
    getPublisher,
    getPublishingPagination,
}