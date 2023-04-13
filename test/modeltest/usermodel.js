const path = require('path');
require("dotenv").config({path:__dirname+'./../../.env'});
const user = require("./../../src/models/user.model");
async function getdata(){
   const result = await new usermodel().isEmailTaken('nguoidung','minhvu@gmail.com')
   return result;
}
//getdata();

// const user = {
//     Quyen: "1",
//     Email: "minhvuhah@gmail.com",
//     HoTen: "minhvu",
//     MatKhau: "",
//     NgaySinh:"",
//     GioiTinh:"",
//   };
// async function addData(table,obj){
//     const result = await new usermodel().addData(table,user);
//     console.log(result);
// }

// async function servicesGetByID(table,id){
//   return new usermodel().getUserById(table,id);
// }



async function controllerGetByID(table,field,id){
  try{
    const result = await new user().getOne(table,field,id);
    if(result.length == 0){
      throw new Error("loi roi");
    }else{
      console.log(result);
    }
  }catch(err){
    console.log(err);
  }
  
}

controllerGetByID('nguoidung','IDnguoidung',2);
