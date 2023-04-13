const express = require("express");
const userRouter = require("./user.route");
const authRouter = require('./auth.route');
const provideRouter = require('./provide.route');
const publishingRouter = require('./publishing.route');
const authorRouter = require('./author.route');
const categoryRouter = require('./category.route');
const kindProuductRouter = require('./kindProduct.route');
const productRouter = require('./product.route');
const orderRouter = require('./order.route');
const router = express.Router();

const defaultRouter = [
    { 
        path: "/users",
        route: userRouter,
    },
    { 
        path: "/auths",
        route: authRouter,
    },
    { 
        path: "/provide",
        route: provideRouter,
    },
    { 
        path: "/publishing",
        route: publishingRouter,
    },
    { 
        path: "/author",
        route: authorRouter,
    },
    { 
        path: "/category",
        route: categoryRouter,
    },
    { 
        path: "/kind_product",
        route: kindProuductRouter,
    },
    { 
        path: "/product",
        route: productRouter,
    },
    { 
        path: "/order",
        route: orderRouter,
    },
];

defaultRouter.forEach((route)=>{
    router.use(route.path,route.route);
});
module.exports = router;
