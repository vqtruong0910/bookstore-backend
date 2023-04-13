const Model = require("./Model");

class authorModel extends Model{
    getAuthorPagination = function(page,size){
        const skip = (page - 1) * size;
        const sql = `select * from tacgia order by IDTacGia limit ${size} offset ${skip}`;
        return new Promise((resolve, reject)=>{
          this.db.query(sql,(err ,data)=>{
            if(err) return reject(err);
            return resolve(data);
          });
        });
      };
}

module.exports = authorModel;