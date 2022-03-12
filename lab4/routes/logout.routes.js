const express = require('express');
const router = express.Router();
const Cart = require('../models/CartModel.js');

router.get('/', function (req, res, next) {
    req.session.cart = Cart.createCart()
    req.session.user = undefined
    res.redirect('/')
});

module.exports = router;