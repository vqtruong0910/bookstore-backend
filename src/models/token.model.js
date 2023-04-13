const Model = require('./Model');

class tokenModel extends Model{

    addRefreshToken = async function(token){
        const sql = `insert into tb_token set token = ?`;
        return new Promise((resolve,reject)=>{
            this.db.query(sql,token,(err,data)=>{
                if(err) return reject(err);
                return resolve(data);
            });
        });
    }
    
    findIDRefreshToken = async function(token){
        const sql = `select IDToken from tb_token where token = ?`;
        return new Promise((resolve,reject)=>{
            this.db.query(sql,token,(err,data)=>{
                if(err) return reject(err);
                return resolve(data);
            });
        });
    }

    updateRefreshToken = async function(newToken,IDoldToken){
        const sql = `update tb_token set token = ? where IDToken = ?`;
        return new Promise((resolve,reject)=>{
            this.db.query(sql,[newToken,IDoldToken],(err,data)=>{
                if(err) return reject(err);
                return resolve(data);
            });
        });
    }

    deleteRefreshToken = async function(IDToken){
        const sql = `delete from tb_token where IDToken = ?`;
        return new Promise((resolve,reject)=>{
            this.db.query(sql,IDToken,(err,data)=>{
                if(err) return reject(err);
                return resolve(data);
            })
        })
    }
}

module.exports = tokenModel;