const tokenModel = require("../models/token.model");
const helper = require("../utils/Helper");
const Helper = require("../utils/Helper");
const Token = new tokenModel();

const generateAuthToken = (user) => {
  try {
    const { IDNguoiDung, Quyen } = user;
    const payload = {
      Id: IDNguoiDung,
      Quyen: Quyen,
    };

    return helper.getAccesstoken(payload, "30d");
  } catch (error) {
    throw new Error('can not create accessToken');
  }
};

const generateVerifyEmailToken = (IDNguoiDung) => {
  try {
    const payload = { IDNguoiDung: IDNguoiDung };
    return helper.getVerifyEmailToken(payload, "1h");
  } catch (error) {
    throw new Error('can not create verifyEmailToken');
  }

};

const verifyEmailToken = (token) => {
  try {
    return helper.verifyEmailToken(token);
  } catch (error) {
    throw new Error('failed to verify EmailToken');
  }
};

const verifyRefreshToken = (token) => {
  try {
    return helper.verifyRefreshToken(token);
  } catch (error) {
    throw new Error('failed to verify refreshToken');
  }
};
const addRefreshToken = async (token) => {
  try {
    return Token.addRefreshToken(token);
  } catch (error) {
    throw new Error('failed to add refreshToken to database');
  }
};

const deleteRefreshToken = async (IDToken) => {
  try {
    return Token.deleteRefreshToken(IDToken);
  } catch (error) {
    throw new Error('failed to remove token');
  }
};

const findIDRefreshToken = async (token) => {
  try {
    const result = await Token.findIDRefreshToken(token);
    if (!result[0]) throw new Error("Token not found");
    return result[0].IDToken;
  } catch (error) {
    throw new Error('Token not found');
  }
};

const generateRefreshToken = (user) => {
  try {
    return helper.getRefreshToken({ IDNguoiDung: user.IDNguoiDung }, "30d");
  } catch (error) {
    throw new Error('can not create refreshToken');
  }
};
const updateRefreshToken = async (newToken, IDOldToken) => {
  try {
    return await Token.updateRefreshToken(newToken, IDOldToken);
  } catch (error) {
    throw new Error('can not update token');
  }
};

const generatePasswordToken = async (user) => {
  try {
    return helper.getPasswordToken({ IDNguoiDung: user.IDNguoiDung }, '1h');
  } catch (error) {
    throw new Error('can not create passwordToken');
  }
}

const verifyPasswordToken = async (token) => {
  try {
    return helper.verifyPasswordToken(token);
  } catch (error) {
    throw new Error('can not verify passwordToken');
  }
}


module.exports = {
  generateAuthToken,
  generateVerifyEmailToken,
  verifyEmailToken,
  addRefreshToken,
  findIDRefreshToken,
  deleteRefreshToken,
  updateRefreshToken,
  generateRefreshToken,
  verifyRefreshToken,
  generatePasswordToken,
  verifyPasswordToken,
};
