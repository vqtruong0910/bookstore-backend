const tokenService = require("./token.service");
const userService = require("./user.service");
const bcrypt = require("bcrypt");
const emailService = require("./email.service");

const loginWithEmailAndPassword = async (Email, MatKhau) => {
  try {
    let user = await userService.getUserByEmail(Email);
    user = user[0];
    if (!user) {
      throw new Error('0');
    }
    const ckPass = bcrypt.compareSync(MatKhau, user.MatKhau);
    if (!ckPass) {
      throw new Error('1');
    }

    if (user.XacThuc === 0) {
      throw new Error('2');
    }
    if (user.trangThai === 0) {
      throw new Error('3');
    }
    delete user.MatKhau;
    const accessToken = tokenService.generateAuthToken(user);
    const refreshToken = tokenService.generateRefreshToken(user);
    user['accessToken'] =  accessToken;
    return {user:user, refreshToken:refreshToken};
  } catch (error) {
    throw error;
  }
};

const loginThirdParty = async (Email) => {
  try {
    let user = await userService.getUserByEmail(Email);
    user = user[0];
    delete user.MatKhau;
    const accessToken = tokenService.generateAuthToken(user);
    const refreshToken = tokenService.generateRefreshToken(user);
    user['accessToken'] =  accessToken;
    return {user:user, refreshToken:refreshToken};
  } catch (error) {
    throw error;
  }
};

const verifyEmail = async (token) => {
  try {
    const user = tokenService.verifyEmailToken(token);
    console.log(user);
    return await userService.updateUserById(user.IDNguoiDung, { XacThuc: 1 });
  } catch (error) {
    throw error;
  }
};

const updateToken = async (oldRefreshToken) => {
  try {
    const IDOldToken = await tokenService.findIDRefreshToken(oldRefreshToken);
    console.log(IDOldToken);
    const body = tokenService.verifyRefreshToken(oldRefreshToken);
    console.log(body.IDNguoiDung);
    const user = await userService.getUserById(body.IDNguoiDung);
    const accessToken = tokenService.generateAuthToken(user[0]);
    const refreshToken = tokenService.generateRefreshToken(user[0]);
    await tokenService.updateRefreshToken(refreshToken, IDOldToken);
    return { accessToken: accessToken, refreshToken: refreshToken };
  } catch (error) {
    throw error;
  }
};

const logout =async (token)=>{
  try {
    const IDToken = await tokenService.findIDRefreshToken(token)
    return await tokenService.deleteRefreshToken(IDToken);
  } catch (error) {
    throw error;
  }
}

 const resetPassword = async(token,newPassword)=>{
    try {
      const ID = await tokenService.verifyPasswordToken(token);
      console.log(ID);
      const hashpass = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
      await userService.updateUserById(ID.IDNguoiDung,{MatKhau:hashpass});
    } catch (error) {
      throw error;
    }
 }
 
 const sendEmailResetPassword = async(email)=>{
    try {
      const user = await userService.getUserByEmail(email);
      const token = await tokenService.generatePasswordToken({IDNguoiDung: user[0].IDNguoiDung});
      return await emailService.sendEmailResetPassword(email,token);
    } catch (error) {
      throw error;
    }
 }

 const changePassword = async(email,oldPassword,newPassword)=>{
  try {
    const user =await userService.getUserByEmail(email);
    const ckPass = bcrypt.compareSync(oldPassword, user[0].MatKhau);
    if(!ckPass) throw new Error('wrong password');
    const hashpass = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
    await userService.updateUserById(user[0].IDNguoiDung,{MatKhau:hashpass});
  } catch (error) {
    throw error;
  }
 }
module.exports = {
  loginWithEmailAndPassword,
  verifyEmail,
  updateToken,
  logout,
  resetPassword,
  sendEmailResetPassword,
  changePassword,
  loginThirdParty,
};
