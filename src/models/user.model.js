const { resolve } = require("path");
const Define = require("../utils/Define");
const Model = require("./Model");
class UserModel extends Model {

  getUserByEmail = function (email) {
    let sql = `select * from nguoidung where email=?`;
    return new Promise((resolve, reject) => {
      this.db.query(sql,email,(err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  };

  getUserById = function(id) {
    let sql = `select * from nguoidung where IDNguoiDung = ?`;
    return new Promise((resolve, reject) => {
      this.db.query(sql,id, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  };
  updateUserById = function(id,obj){
    let sql = `UPDATE nguoidung SET ? WHERE IDNguoiDung = ?`;
    return new Promise((reslove,reject)=>{
        this.db.query(sql, [obj,id], (err)=>{
            if(err)reject(err);
            return reslove();
        });
    });
  };
  getUserPagination = function(page){
    const size = Define.USER_PAGE_SIZE;
    const skip = (page - 1) * size;
    const sql = `select IDNguoiDung,Quyen,Email,HoTen,DATE_FORMAT(NgaySinh,"%d-%m-%Y") as NgaySinh,GioiTinh,Anh,XacThuc,TrangThai from nguoidung order by IDNguoiDung DESC limit ${size} offset ${skip} `;
    return new Promise((resolve, reject)=>{
      this.db.query(sql,(err ,data)=>{
        if(err) return reject(err);
        return resolve(data);
      });
    });
  };

  getNewRegistration = function(date) {
    let sql = `SELECT
    COUNT(nguoidung.IDNguoiDung) as soluong, 1 as number
    FROM nguoidung 
    WHERE nguoidung.NgayDangKi 
    BETWEEN ? AND CURRENT_DATE
    UNION
    SELECT 
    COUNT(nguoidung.IDNguoiDung) as soluong, 2 as number
    FROM nguoidung 
    WHERE nguoidung.NgayDangKi 
    BETWEEN DATE_SUB(?, INTERVAL 1 WEEK) AND DATE_SUB(?, INTERVAL 1 DAY)`;
    return new Promise((resolve, reject) => {
      this.db.query(sql,[date,date,date], (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  };

  getNewRegistrationPerDay = function(date) {
    let sql = `SELECT nguoidung.NgayDangKi,
    COUNT(nguoidung.IDNguoiDung) as soluong
    FROM nguoidung 
    WHERE nguoidung.NgayDangKi 
    BETWEEN ? AND CURRENT_DATE
    GROUP BY nguoidung.NgayDangKi`;
    return new Promise((resolve, reject) => {
      this.db.query(sql,date, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  };

}


module.exports = UserModel;
