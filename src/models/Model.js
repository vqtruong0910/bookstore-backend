const { resolve } = require("path");
const pool = require("../config/dbconfig");
const Define = require("../utils/Define");

class Model {
  db = pool;

  //get a  one data
  getOne = async function (table, fieldId, value) {
    let sql = `SELECT * FROM ?? WHERE ?? = ?`;
    return new Promise((reslove, reject) => {
      this.db.query(sql, [table, fieldId, value], (err, result) => {
        if (err) {
          return reject(err);
        }
        return reslove(result);
      });
    });
  };
  getByCondition = async function (table, fieldId, value, fieldId2, value2) {
    let sql = `SELECT * FROM ?? WHERE ?? = ? and ?? = ?`;
    return new Promise((reslove, reject) => {
      this.db.query(sql, [table, fieldId, value, fieldId2, value2], (err, result) => {
        if (err) {
          return reject(err);
        }
        return reslove(result);
      });
    });
  };

  //get all data from a table in decending order by a field
  getAll = async function (table, field) {
    let sql = `SELECT * from ?? ORDER BY ? DESC`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, [table, field], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    })
  };
  //insert into a specific table
  addData = async (table, obj) => {
    let sql = `INSERT INTO ${table} SET ?`;
    return new Promise((reslove, reject) => {
      this.db.query(sql, obj, (err, data) => {
        if (err) return reject(err);
        return reslove(data);
      });
    });
  };
  //update a specific row on a table

  updateData = async function (table, fieldId, obj, ID) {
    let sql = `UPDATE ?? SET ? WHERE ?? = ?`;
    return new Promise((reslove, reject) => {
      this.db.query(sql, [table, obj, fieldId, ID], (err) => {
        if (err) reject(err);
        return reslove();
      });
    });
  };
  //delete a specific row on a table

  deleteData = async function (table, fieldId, value) {
    let sql = `DELETE FROM ?? WHERE ?? = ?`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, [table, fieldId, value], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    })

  };

  countAll = function (table) {
    const sql = `select count(*) as soluong from ${table}`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      })
    })
  }
  countAllByID = function (table, column, value) {
    const sql = `select count(*) as soluong from ${table} where ${column} = ${value}`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      })
    })
  }

  //get all data from a table in decending order by a field with pagination
  getPaginateList = (page, table, field, value, field2 = "", value2 = -1, order_field) => {
    //implement pagination here later
    const page_size = Define.PAGINATE_PAGE_SIZE;
    let skip = (page - 1) * page_size;

    let sql = "";
    if (value2 === -1 && field2 === "") {
      sql = `SELECT * from ${table} WHERE ?? =? ORDER BY ?? DESC LIMIT ? OFFSET ? `;
      this.db.query(
        sql,
        [field, value, order_field, page_size, skip],
        callback
      );
    } else {
      sql = `SELECT * from ${table} WHERE ?? =? AND ??=? ORDER BY ?? DESC LIMIT ? OFFSET ? `;
      this.db.query(
        sql,
        [field, value, field2, value2, order_field, page_size, skip],
        callback
      );
    }
  };
}
module.exports = Model;
