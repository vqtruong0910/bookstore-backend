const { User } = require("../models");
const DB = require("../utils/DB_Define");
const bcrypt = require("bcrypt");
const user = new User();
const Define = require("../utils/Define");
const moment = require('moment');

const createUser = async (userBody) => {
  try {
    const { Email, HoTen, MatKhau, GioiTinh, NgaySinh } = userBody;
    const check = await user.getUserByEmail(Email);
    if (check.length != 0) {
      throw new Error("Email already use");
    }
    const hashpass = bcrypt.hashSync(MatKhau, bcrypt.genSaltSync(10));
    const utcDate = moment.utc(NgaySinh);
    const mysqlDate = utcDate.format("YYYY-MM-DD");
    const obj = {
      Quyen: 1,
      Email,
      HoTen,
      MatKhau: hashpass,
      GioiTinh,
      NgaySinh: mysqlDate,
      TrangThai: 1,
      XacThuc: 0,
    };
    return user.addData(DB.user_table, obj);
  } catch (error) {
    throw error;
  }
};
const createThirdPartyUsers = async (userBody) => {
  console.log("user service" + userBody.HoTen);
  try {
    const { Email, HoTen, Anh } = userBody;
    const obj = {
      Quyen: 1,
      Email,
      HoTen,
      Anh,
      XacThuc: 1,
      TrangThai: 1,
    };
    return user.addData(DB.user_table, obj);
  } catch (error) {
    throw error;
  }
};


const getUserByEmail = async (Email) => {
  try {
    const array = await user.getUserByEmail(Email);
    for await(const element of array){
      if(element["Anh"] && !element["Anh"].startsWith("http")){
        element["Anh"] = process.env.URL + "" + element["Anh"];
        console.log(element["Anh"])
      }
    }
    return array;
  } catch (error) {
    throw error;
  }
};
const getAllUser = async () => {
  try {
    const array = await user.getAll(DB.user_table, "IDNguoiDung");
    if(array.length === 0) throw new Error('Not found');
    for await(const element of array){
      if(element["Anh"] && !element["Anh"].startsWith("http")){
        element["Anh"] = process.env.URL + "" + element["Anh"];
        console.log(element["Anh"])
      }
    }
    return array;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const array = await user.getUserById(id);
    if(array.length ===0) throw new Error('ID Not found');
    for await(const element of array){
      if(element["Anh"] && !element["Anh"].startsWith("http")){
        element["Anh"] = process.env.URL + "" + element["Anh"];
        console.log(element["Anh"])
      }
    }
    return array;
  } catch (error) {
    throw error;
  }
};

const updateUserById = async (id, obj) => {
  try {
    const data =await user.getUserById(id);
    console.log(data);
    if(data.length === 0) throw new Error("ID Not Found");
    return await user.updateUserById(id, obj);
  } catch (error) {
    throw new Error('can not update user');
  }
};

const updateAvatar = async(id,obj)=>{
  try {
    return user.updateUserById(id,obj);
  } catch (error) {
    throw new Error('can not update user');
  }
}
const getUserPagination = async (page) => {
  try {
    const data = await user.getUserPagination(page);
    if (data.length === 0) {
      throw new Error('Page Not Found'); 
    }
    for await(const element of data){
      if(element["Anh"] && !element["Anh"].startsWith("http")){
        element["Anh"] = process.env.URL + "" + element["Anh"];
        console.log(element["Anh"])
      }
    }
    const amountUser = await user.countAll(DB.user_table);
    const amountPage = Math.ceil(amountUser[0].soluong / Define.USER_PAGE_SIZE);
    return {
      DanhSach: data,
      TongNguoiDung: amountUser[0].soluong,
      SoLuongTrang: amountPage,
    };
  } catch (error) {
      throw error;
  }
};



// const deleteUserById = async (id)=>{
//    const result = await user.getUserById(id);
//    if(result.length === 0){
//       throw new Response(true,"Not Found");
//    }
//    return user.deleteData(DB.user_tableid);
// }

const getNewRegistration = async () => {
  try {
    let date = moment().isoWeekday(1).format("YYYY-MM-DD");
    const array = await user.getNewRegistration(date);
    if(array[1].soluong == 0) return {TaiKhoan:array[0].soluong,PhanTram:100};
    let percent;
    if(array[0].soluong === array[1].soluong){
      percent = 100;
    }else{
      percent = ((array[0].soluong / array[1].soluong) * 100 )-100;
    }
    return {TaiKhoan:array[0].soluong,PhanTram:Math.round(percent)};
  } catch (error) {
    throw error;
  }
};
const getNewRegistrationPerDay = async () => {
  try {
    let date = moment().isoWeekday(1).format("YYYY-MM-DD");
    const array = await user.getNewRegistrationPerDay(date);
    for await(const element of array){
      if(element["Anh"] && !element["Anh"].startsWith("http")){
        element["Anh"] = process.env.URL + "" + element["Anh"];
        console.log(element["Anh"])
      }
    }
    return array;
  } catch (error) {
    console.log(error);
    throw error;
    
  }
};
module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserById,
  getAllUser,
  getUserPagination,
  updateAvatar,
  getNewRegistration,
  getNewRegistrationPerDay,
  createThirdPartyUsers,
};
