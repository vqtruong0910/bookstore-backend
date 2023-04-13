const {Category} = require('../models');
const DB_Define = require('../utils/DB_Define');
const category = new Category();

const addCategory = async function(obj){
    try {
        const data = await category.getOne(DB_Define.Category,"TenDanhMuc",obj.TenDanhMuc);
        if(data.length !== 0){
            throw new Error("Danh mục đã tồn tại!");
        }
        return category.addData(DB_Define.Category,obj);
    } catch (error) {
        throw error;
    }
}

const getCategoryByID = async function(ID){
    try {
        return category.getOne(DB_Define.Category,"IDDanhMuc",ID);
    } catch (error) {
        throw error;
    }
}

const getAllCategory = async function(){
    try {
        return category.getAll(DB_Define.Category,"IDDanhMuc");
    } catch (error) {
        throw error;
    }
}

const updateCategoryByID = async function(ID,obj){
    try {
        const data = await getCategoryByID(ID);
        if(data.length === 0) throw new Error("does not exist");
        return category.updateData(DB_Define.Category,"IDDanhMuc",obj,ID);
    } catch (error) {
        throw error;
    }
}

const deleteCategoryByID = async function(ID){
    try {
        const data = await getCategoryByID(ID);
        if(data.length === 0) throw new Error("does not exist");
        return category.deleteData(DB_Define.Category,"IDDanhMuc",ID);
    } catch (error) {
        throw error;
    }
}
const getCategoryPagination = async function(page,size){
    try {
        const data = await category.getCategoryPagination(page,size);
        if (data.length === 0) {
          throw new Error('Page Not Found'); 
        }
        const amount = await category.countAll(DB_Define.Category);
        const amountPage = Math.ceil(amount[0].soluong / size);
        return {
          DanhSach: data,
          TongDanhMuc: amount[0].soluong,
          SoLuongTrang: amountPage,
        };
      } catch (error) {
          throw error;
      }
} 
module.exports = {
    addCategory,
    getCategoryByID,
    updateCategoryByID,
    deleteCategoryByID,
    getAllCategory,
    getCategoryPagination,
}