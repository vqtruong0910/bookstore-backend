const { OAuth2Client } = require("google-auth-library");
// const path = require("path");
// require("dotenv").config({ path: __dirname + "./../../.env" });
// Khởi tạo OAuth2Client với Client ID và Client Secret

const getObjMailConfig = async () => {
  const myOAuth2Client = new OAuth2Client(
    process.env.CLIENTID,
    process.env.CLIENTIDSECRET
  );

  // Set Refresh Token vào OAuth2Client Credentials
  myOAuth2Client.setCredentials({
    refresh_token: process.env.REFRESHTMAILTOKEN,
  });

  const myAccessTokenObject = await myOAuth2Client.getAccessToken();
  // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
  const myAccessToken = myAccessTokenObject.token;
  return (smtp = {
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAILUSER,
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTIDSECRET,
      refreshToken: process.env.REFRESHTMAILTOKEN,
      accessToken: myAccessToken,
    },
  });
};

module.exports = getObjMailConfig;