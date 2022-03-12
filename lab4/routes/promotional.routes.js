const express = require('express');
const authHandler = require('./helpers/auth-handler');
const router = express.Router();

router.get('/', authHandler, function (req, res) {
    res.render('promotional', {
        title: 'Promotional',
        linkActive: 'cart',
        cart: req.session.cart,
        user: req.session.user,
        promoType: req.session.promoType,
        promoCode: req.session.promoCode
    })
});

router.post('/save', function(req, res) {
    req.session.promoType = req.body['promo-type']
    req.session.promoCode = req.body['promo-code']
    res.redirect('/cart')
})

router.post('/order', function(req, res) {
    req.session.promoType = undefined
    req.session.promoCode = undefined
    res.redirect('/checkout')
})

router.post('/reset', function(req, res) {
    req.session.promoType = undefined
    req.session.promoCode = undefined
    res.redirect('back')
})

module.exports = router;