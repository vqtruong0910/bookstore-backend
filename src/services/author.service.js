const {Author} = require('../models');
const DB_Define = require('../utils/DB_Define');
const author = new Author();

const addAuthor = async function(obj){
    try {
        return author.addData(DB_Define.Author,obj);
    } catch (error) {
        throw error;
    }
}

const getAuthorByID = async function(ID){
    try {
        return author.getOne(DB_Define.Author,"IDTacGia",ID);
    } catch (error) {
        throw error;
    }
}
const getAuthor = async function(){
    try {
        return author.getAll(DB_Define.Author,"IDTacGia");
    } catch (error) {
        throw error;
    }
}

const updateAuthorByID = async function(ID,obj){
    try {
        const data = await getAuthorByID(ID);
        if(data.length === 0) throw new Error("does not exist");
        return author.updateData(DB_Define.Author,"IDTacGia",obj,ID);
    } catch (error) {
        throw error;
    }
}

const deleteAuthorByID = async function(ID){
    try {
        const data = await getAuthorByID(ID);
        if(data.length === 0) throw new Error("does not exist");
        return author.deleteData(DB_Define.Author,"IDTacGia",ID);
    } catch (error) {
        throw error;
    }
}
const getAuthorPagination = async function(page,size){
    try {
        const data = await author.getAuthorPagination(page,size);
        if (data.length === 0) {
          throw new Error('Page Not Found'); 
        }
        const amount = await author.countAll(DB_Define.Author);
        const amountPage = Math.ceil(amount[0].soluong / size);
        return {
          DanhSach: data,
          TongTacGia: amount[0].soluong,
          SoLuongTrang: amountPage,
        };
      } catch (error) {
          throw error;
      }
} 
module.exports = {
    addAuthor,
    getAuthorByID,
    updateAuthorByID,
    deleteAuthorByID,
    getAuthor,
    getAuthorPagination
}