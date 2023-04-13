const {Comment} = require('../models');
const DB_Define = require('../utils/DB_Define');
const comment = new Comment();

const addComment = async function(obj){
    try {
        return comment.addData(DB_Define.Comment,obj);
    } catch (error) {
        throw error;
    }
}

const getCommentByIDSanPham = async function(ID){
    try {
        return comment.getOne(DB_Define.Comment,"IDSanPham",ID);
    } catch (error) {
        throw error;
    }
}

const updateComment = async function(ID,obj){
    try {
        const data = await getCategoryByID(ID);
        if(data.length === 0) throw new Error("does not exist");
        return category.updateData(DB_Define.Comment,"IDYKienDanhGia",obj,ID);
    } catch (error) {
        throw error;
    }
}

const deleteComment = async function(ID){
    try {
        const data = await getCategoryByID(ID);
        if(data.length === 0) throw new Error("does not exist");
        return category.deleteData(DB_Define.Comment,"IDYKienDanhGia",ID);
    } catch (error) {
        throw error;
    }
}
module.exports = {
    addComment,
    getCommentByIDSanPham,
    updateComment,
    deleteComment,
}