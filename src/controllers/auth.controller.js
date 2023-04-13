const { query } = require("express");
const httpStatus = require("http-status");
const Define = require('../utils/Define');
const {
  authService,
  userService,
  tokenService,
  emailService,
} = require("../services");
const Response = require("../utils/Response");
const { OK } = require("http-status");

const register = async (req, res) => {
  try {
    console.log(req.body);
    
    await userService.createUser(req.body);
    res
      .status(httpStatus.CREATED)
      .json(new Response(false, "Create", { Email: req.body.Email }));
  } catch (error) {
    console.log(error);
    res.status(httpStatus.NOT_ACCEPTABLE).json(new Response(true,error.message));
  }
};

const login = async (req, res) => {
  try {
    const { Email, MatKhau } = req.body;
    console.log(Email);
    const result = await authService.loginWithEmailAndPassword(Email, MatKhau);
    res.cookie(Define.REFRESHTOKEN,result.refreshToken,Define.SESSION_COOKIE_OPTION);
    tokenService.addRefreshToken(result.refreshToken);
    const user = result.user;
    if(user["Anh"] !== null && !user["Anh"].startsWith("http")){
      user.Anh = process.env.URL+user.Anh
    }
    res.status(httpStatus.OK).json(new Response(false, "", {Email:user.Email,HoTen:user.HoTen ,GioiTinh:user.GioiTinh ,Anh:user.Anh,accessToken:user.accessToken}));
  } catch (error) {
    res.status(httpStatus.NOT_ACCEPTABLE).json(new Response(true,error.message));
  }
};

const handleErrorGoogle = async (err, req, res, next) => {
  if (err.name === 'TokenError') {
    res.redirect(process.env.CLIENT_HOST +'/auths/google'); // redirect them back to the login page
} else {
    // Handle other errors here
}
};
const handleErrorFacebook = async (err, req, res, next) => {
  if (err.name === 'TokenError') {
    res.redirect(process.env.CLIENT_HOST + '/auths/facebook'); // redirect them back to the login page
} else {
    // Handle other errors here
}
};
const handleSuccessFacebook = async (req, res) => {
  const HoTen = req.user.displayName;
  const Email = req.user.emails[0].value;
  const Anh = req.user.photos[0].value;
  console.log(HoTen+"      "+Email+"      "+ Anh);
  let data = await userService.getUserByEmail(Email);
  if(data.length === 0){
    await userService.createThirdPartyUsers({HoTen:HoTen,Email:Email,Anh:Anh});
  }
  const result = await authService.loginThirdParty(Email);
  res.cookie(Define.REFRESHTOKEN,result.refreshToken,Define.SESSION_COOKIE_OPTION);
  tokenService.addRefreshToken(result.refreshToken);
  let anh = null;
  const user = result.user;
  if(user.Anh !== null){
    anh = user.Anh;
  }
  console.log(user);
  return res.status(httpStatus.OK).json(new Response(false, "", {Email:user.Email,HoTen:user.HoTen ,Anh:anh,accessToken:user.accessToken}));
};
const handleSuccessGoogle = async (req, res) => {
  const HoTen = req.user.displayName;
  const Email = req.user.emails[0].value;
  const Anh = req.user.photos[0].value;
  console.log(HoTen+"      "+Email+"      "+ Anh);
  let data = await userService.getUserByEmail(Email);
  if(data.length === 0){
    await userService.createThirdPartyUsers({HoTen:HoTen,Email:Email,Anh:Anh});
  }
  const result = await authService.loginThirdParty(Email);
  res.cookie(Define.REFRESHTOKEN,result.refreshToken,Define.SESSION_COOKIE_OPTION);
  tokenService.addRefreshToken(result.refreshToken);
  let anh = null;
  const user = result.user;
  if(user.Anh !== null){
    anh = user.Anh;
  }
  console.log(user);
  return res.status(httpStatus.OK).json(new Response(false, "", {Email:user.Email,HoTen:user.HoTen ,Anh:anh,accessToken:user.accessToken}));
};


const sendVerificationEmail = async (req, res) => {
  try {
    const Email = req.body.Email;
    const user = await userService.getUserByEmail(Email);
    const verifyEmailToken = tokenService.generateVerifyEmailToken(
      user[0].IDNguoiDung
    );
    await emailService.sendVerificationEmail(req.body.Email, verifyEmailToken);
    return res.status(httpStatus.OK).json(new Response(false, "success"));
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.EXPECTATION_FAILED).json(new Response(true,'fail-to-send-email',{error}));
  }
};

const verifyEmailToken = async (req, res) => {
  try {
    const token = req.body.token;
    await authService.verifyEmail(token);
    return res.status(httpStatus.OK).json(new Response(false,'success'));
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
  }
};

const updateToken = async (req,res)=>{
  try {
    const oldRefreshToken = req.signedCookies.refreshToken;
  console.log(oldRefreshToken);
  const result = await authService.updateToken(oldRefreshToken);
  res.cookie(Define.REFRESHTOKEN,result.refreshToken,Define.SESSION_COOKIE_OPTION);
  return res.status(httpStatus.OK).json(new Response(false,'',{accessToken:result.accessToken}));
  } catch (error) {
    console.log(error)
    res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
  }
};
const logout = async (req,res)=>{
  try {
    const token = req.signedCookies.refreshToken;
    await authService.logout(token);
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
  }
};

const sendEmailResetPassword = async(req,res)=>{
  try {
    const email = req.body.Email;
    await authService.sendEmailResetPassword(email);
    res.status(httpStatus.OK).json(new Response(false,"send email  success"));
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
  }
};
const resetPassword = async(req,res)=>{
  try {
    const {resetPasswordToken,newPassword} = req.body;
    console.log(req.body)
    await authService.resetPassword(resetPasswordToken,newPassword);
    res.status(httpStatus.OK).json(new Response(false,"update password success"));
  } catch (error) {
    console.log(error);
    res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
  }
};

const changePassword = async(req,res)=>{
  try {
    const {Email,oldPassword,newPassword} =  req.body;
    await authService.changePassword(Email,oldPassword,newPassword);
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(new Response(true,error.message));
  }
}
module.exports = {
  login,
  register,
  sendVerificationEmail,
  verifyEmailToken,
  updateToken,
  logout,
  resetPassword,
  sendEmailResetPassword,
  changePassword,
  handleErrorGoogle,
  handleSuccessGoogle,
  handleSuccessFacebook,
  handleErrorFacebook,
};
