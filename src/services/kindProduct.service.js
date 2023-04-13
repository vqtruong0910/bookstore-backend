const { KindProduct } = require('../models');
const DB_Define = require('../utils/DB_Define');
const kindProduct = new KindProduct();

const addKindProduct = async function (obj) {
    try {
        console.log(obj)
        const isAvaiable = await kindProduct.getByCondition(DB_Define.KindOfProduct, "TenTheLoai", obj.TenTheLoai, "IDDanhMuc", obj.IDDanhMuc);
        if (isAvaiable.length !== 0) {
            throw new Error("Thể loại đã tồn tại!");
        }
        return kindProduct.addData(DB_Define.KindOfProduct, obj);
    } catch (error) {
        throw error;
    }
}
const getKindProduct = async function () {
    try {
        return kindProduct.getAll(DB_Define.KindOfProduct, "IDTheLoai");
    } catch (error) {
        throw error;
    }
}
const getKindProductByID = async function (ID) {
    try {
        return kindProduct.getOne(DB_Define.KindOfProduct, "IDTheLoai", ID);
    } catch (error) {
        throw error;
    }
}
const getKindProductByIDCategory = async function (ID) {
    try {
        return kindProduct.getByIDCategory(ID);
    } catch (error) {
        throw error;
    }
}
const updateKindProductByID = async function (ID, obj) {
    try {
        const isAvaiable = await kindProduct.getByCondition(DB_Define.KindOfProduct, "TenTheLoai", obj.TenTheLoai, "IDDanhMuc", obj.IDDanhMuc);
        if (isAvaiable.length !== 0) {
            throw new Error("Thể loại đã tồn tại!");
        }
        const data = await getKindProductByID(ID);
        if (data.length === 0) throw new Error("does not exist");
        return kindProduct.updateData(DB_Define.KindOfProduct, "IDTheLoai", obj, ID);
    } catch (error) {
        throw error;
    }
}

const deleteKindProductByID = async function (ID) {
    try {
        const data = await getKindProductByID(ID);
        if (data.length === 0) throw new Error("does not exist");
        return kindProduct.deleteData(DB_Define.KindOfProduct, "IDTheLoai", ID);
    } catch (error) {
        throw error;
    }
}
module.exports = {
    addKindProduct,
    getKindProductByID,
    updateKindProductByID,
    deleteKindProductByID,
    getKindProductByIDCategory,
    getKindProduct,
}