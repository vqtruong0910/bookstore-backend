const Model = require("./Model");

class kindProductModel extends Model{
    getByIDCategory = async function (ID) {
        let sql = `SELECT * FROM theloai WHERE IDDanhMuc = ?`;
        return new Promise((reslove, reject) => {
          this.db.query(sql,ID, (err, result) => {
            if (err) {
              return reject(err);
            }
            return reslove(result);
          });
        });
      };
}
module.exports = kindProductModel;