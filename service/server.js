
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const {orderRouter, restaurantRouter, userRouter} = require('./router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));