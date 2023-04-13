const Model = require("./Model");

class categoryModel extends Model{
    getCategoryPagination = function(page,size){
        const skip = (page - 1) * size;
        const sql = `select * from danhmuc order by IDDanhMuc limit ${size} offset ${skip}`;
        return new Promise((resolve, reject)=>{
          this.db.query(sql,(err ,data)=>{
            if(err) return reject(err);
            return resolve(data);
          });
        });
      };
}

module.exports = categoryModel;