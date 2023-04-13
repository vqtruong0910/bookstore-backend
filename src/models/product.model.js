const { resolve } = require("path");
const Model = require("./Model");

class ProductModel extends Model {
  addProduct = function (obj) {
    let sql = `INSERT INTO sanpham SET ?`;
    return new Promise((reslove, reject) => {
      this.db.query(sql, obj, (err, data) => {
        if (err) return reject(err);
        return reslove(data);
      });
    });
  };

  getProductByID = function(id){
    let sql = `select * from sanpham where sanpham.TrangThai = 0 and IDSanPham = ?`;
    return new Promise((resolve, reject)=>{
        this.db.query(sql, id, (err, data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  };
  getProductByName = function(name){
    let sql = `select * from sanpham where sanpham.TrangThai = 0 and TenSanPham = ?`;
    return new Promise((resolve, reject)=>{
        this.db.query(sql, name, (err, data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  };

  getProductByIDTheloai = function(IDTheLoai,page,size){
    const skip = (page - 1) * size;
    let sql = `select * from sanpham where sanpham.TrangThai = 0 and IDTheLoai = ? order by IDSanPham DESC limit ${size} offset ${skip} `;
    return new Promise((resolve, reject)=>{
        this.db.query(sql, IDTheLoai, (err, data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  };

  getProductByIDNhaXuatBan = function(id){
    let sql = `select * from sanpham where sanpham.TrangThai = 0 and IDNhaXuatBan = ? order by IDSanPham DESC`;
    return new Promise((resolve, reject)=>{
        this.db.query(sql, id, (err, data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  };
  getAllProductByIDTheLoai = function(id){
    let sql = `select * from sanpham where sanpham.TrangThai = 0 and IDTheLoai = ? order by IDSanPham DESC`;
    return new Promise((resolve, reject)=>{
        this.db.query(sql, id, (err, data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  };

  getProductByIDDanhMuc = function(idcategory,page,size){
    const skip = (page - 1) * size;
    let sql = `select * from sanpham
    where sanpham.TrangThai = 0 and IDTheLoai IN(select IDTheLoai FROM theloai
                      WHERE IDDanhMuc = ?) order by IDSanPham DESC limit ${size} offset ${skip}`;
    return new Promise((resolve, reject)=>{
        this.db.query(sql, idcategory, (err, data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  };

  getAllProduct = function(){
    let sql = 'select * from sanpham where sanpham.TrangThai = 0 order by IDSanPham DESC';
    return new Promise((resolve,reject)=>{
        this.db.query(sql,(err,data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  }

  getNewProduct = function(){
    let sql = "SELECT * FROM `sanpham` where sanpham.TrangThai = 0 and NgayThem BETWEEN DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH) AND CURRENT_DATE order by IDSanPham DESC";
    return new Promise((resolve,reject)=>{
        this.db.query(sql,(err,data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  }

  getBestseller = function(){
    let sql = `select sanpham.*,
    SUM(chitietdonhang.SoLuong) as soluong
    from sanpham
    LEFT JOIN chitietdonhang
    on sanpham.IDSanPham = chitietdonhang.IDSanPham
    where sanpham.TrangThai = 0
    GROUP BY sanpham.IDSanPham
    ORDER BY soluong DESC`;
    return new Promise((resolve,reject)=>{
        this.db.query(sql,(err,data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  }

  getTopTenBestsellerPerDay = function(day){
    let sql = `select sanpham.*,
    SUM(chitietdonhang.SoLuong) as soluong
    from sanpham
    LEFT JOIN chitietdonhang
    on sanpham.IDSanPham = chitietdonhang.IDSanPham
    LEFT JOIN donhang
    on chitietdonhang.IDDonHang = donhang.IDDonHang
    WHERE donhang.TrangThai = 1 and sanpham.TrangThai = 0 and donhang.NgayDat BETWEEN ? and CURRENT_DATE
    GROUP BY sanpham.IDSanPham
    ORDER BY soluong DESC
    LIMIT 10`;
    return new Promise((resolve,reject)=>{
        this.db.query(sql,day,(err,data)=>{
            if(err) return reject(err);
            return resolve(data);
        });
    });
  };

  getProductPagination = function(page,size){
    const skip = (page - 1) * size;
    const sql = `SELECT sanpham.*, theloai.TenTheLoai,danhmuc.IDDanhMuc,danhmuc.TenDanhMuc FROM sanpham
    LEFT JOIN theloai
    ON sanpham.IDTheLoai = theloai.IDTheLoai
    LEFT JOIN danhmuc
    ON theloai.IDDanhMuc = danhmuc.IDDanhMuc where TrangThai = 0 order by IDSanPham DESC limit ${size} offset ${skip} `;
    return new Promise((resolve, reject)=>{
      this.db.query(sql,(err ,data)=>{
        if(err) return reject(err);
        return resolve(data);
      });
    });
  };
  filter = function(filter,page,size){
    const skip = (page - 1) * size;
    const sql = `SELECT sanpham.*, theloai.TenTheLoai,danhmuc.IDDanhMuc,danhmuc.TenDanhMuc FROM sanpham
    LEFT JOIN theloai
    ON sanpham.IDTheLoai = theloai.IDTheLoai
    LEFT JOIN danhmuc
    ON theloai.IDDanhMuc = danhmuc.IDDanhMuc where TrangThai = 0 ${filter} order by IDSanPham DESC limit ${size} offset ${skip}`;
    return new Promise((resolve, reject)=>{
      this.db.query(sql,(err ,data)=>{
        if(err) return reject(err);
        return resolve(data);
      });
    });
  };
  countFilter = function(filter){
    const sql = `select count(IDSanPham) as soluong from sanpham
    LEFT JOIN theloai
    ON sanpham.IDTheLoai = theloai.IDTheLoai
    LEFT JOIN danhmuc
    ON theloai.IDDanhMuc = danhmuc.IDDanhMuc  where TrangThai = 0 ${filter}`;
    return new Promise((resolve,reject)=>{
      this.db.query(sql,(err,result)=>{
        if(err) return reject(err);
        return resolve(result);
      })
    })
  };

  hideProuct = function(id){
    const sql = `UPDATE sanpham SET TrangThai = 1 WHERE IDSanPham = ?`;
    return new Promise((resolve,reject)=>{
      this.db.query(sql,id,(err,result)=>{
        if(err) return reject(err);
        return resolve(result);
      })
    })
  };

  filterByName = function(name) {
    let sql = `select * from sanpham WHERE sanpham.TenSanPham LIKE "%${name}%";`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  };
}



module.exports = ProductModel;