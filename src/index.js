require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const routers = require('./routers');
const loginGoogle = require('./config/logingoogle');
const loginFacebook = require('./config/loginfacebook');
const app = express();
const path = require('path');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(process.env.SIGNEDCOOKIE));

loginGoogle(app);
loginFacebook(app);
//begin test
app.use('/public', express.static(path.join(__dirname, "../public")));
app.use('/home', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.use('/api-guide', (req, res) => {
    res.sendFile(__dirname + "/api-guide.json");
});
//end test
const corsOptions = {
    origin: process.env.CLIENT_HOST,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    exposedHeaders: ['*', 'Authorization'],
    credentials: true
}
app.use(cors(corsOptions));
// app.use(cors({origin:["https://bookstore-self.vercel.app"], credentials:true}));
app.use(helmet());
app.use('/api', routers);
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`running at ` + process.env.URL));