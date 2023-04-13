const Model = require("./Model");

class publishingModel extends Model{
    getPublishingPagination = function(page,size){
        const skip = (page - 1) * size;
        const sql = `select * from NhaXuatBan order by IDNhaXuatBan DESC limit ${size} offset ${skip}`;
        return new Promise((resolve, reject)=>{
          this.db.query(sql,(err ,data)=>{
            if(err) return reject(err);
            return resolve(data);
          });
        });
      };
}
module.exports = publishingModel;