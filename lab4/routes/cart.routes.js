const express = require('express');
const router = express.Router();
const Cart = require('../models/CartModel')
const cartSanitizer = require('./helpers/cart-sanitizer');

// Ulančavanje funkcija međuopreme
router.get('/', cartSanitizer, function (req, res, next) {
    res.render('cart', {
        title: 'Cart',
        linkActive: 'cart',
        cart: req.session.cart,
        user: req.session.user,
        err: undefined
    })
});


router.get('/add/:id', async function (req, res, next) {
    //dodavanje jednog artikla u košaricu
    await Cart.addItemToCart(req.session.cart, req.params.id, 1)
    res.render('cart', {
        title: 'Cart',
        linkActive: 'cart',
        cart: req.session.cart,
        user: req.session.user,
        err: undefined
    })
});

router.get('/remove/:id', async function (req, res, next) {
    //brisanje jednog artikla iz košarice
    await Cart.removeItemFromCart(req.session.cart, req.params.id, 1)
    res.render('cart', {
        title: 'Cart',
        linkActive: 'cart',
        cart: req.session.cart,
        user: req.session.user,
        err: undefined
    })
});

module.exports = router;