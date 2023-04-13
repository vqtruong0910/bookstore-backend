const helper = require('../utils/Helper');
const httpStatus = require("http-status");

const verifyJWT = (req, res,next)=>{
    try {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(httpStatus.UNAUTHORIZED);
    const token = authHeader.split(' ')[1];
    const user = helper.verifyAccesstoken(token);
    req.user = user.Id;
    req.roles = [user.Quyen];
    next();
    } catch (error) {
    res.sendStatus(httpStatus.FORBIDDEN);
    }
}
module.exports = verifyJWT;