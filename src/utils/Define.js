const { string } = require("joi");

const Define = {
    //API_BASE_URL: "http://localhost:2727/",
    //user access token
    REFRESHTOKEN: "refreshToken",
    TOKENACCESS: "accessToken",
    SESSION_COOKIE_OPTION: {
        httpOnly: true,
        secure: true,//only for browser
        sameSite: 'none',
        signed: true,
        domain: process.env.CLIENT_HOST,
        maxAge: 30 * 24 * 60 * 60 * 1000//1 day in milis
    },
    LOGOUT_COOKIE_OPTION: {
        httpOnly: true,
        secure: false,//only for browser
        sameSite: 'lax',
        signed: true,
        expires: new Date(0)
    },
    //pagination
    FORMAT_SQL_DATE: "YYYY-MM-DD",
    CREATED_AT: "created_at",
    PAGINATE_PAGE_SIZE: 10,
    USER_PAGE_SIZE: 5,
    //time
    DAYS: "days",
    MONTHS: "months",
    MINUTES: "minutes",
    SECONDS: "seconds",
}
module.exports = Define;