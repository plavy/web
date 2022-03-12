const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const authHandler = require('./helpers/auth-handler');


router.get('/', function (req, res, next) {
    if(req.session.user) {
        // vec ulogiran
        res.redirect('/')
    } else {
        //vrati login stranicu
        let errMsg;
        if(req.session.err) {
            errMsg = req.session.err
            req.session.err = undefined
        }
        res.render('login', {
            title: 'Login',
            user: req.session.user,
            linkActive: 'login',
            err: errMsg
        })
        req.session.err = undefined
    }
});

router.post('/', async function (req, res, next) {
    //postupak prijave korisnika
    let user = await User.fetchByUsername(req.body.user)
    if(user.id === undefined || ! user.checkPassword(req.body.password)) {
        res.render('login', {
            title: 'Login',
            user: req.session.user,
            linkActive: 'login',
            err: 'User does not exist or incorrect password.'
        })
    } else {
        // uspješno prijavljen
        req.session.user = user
        res.redirect('/')
    }

});


module.exports = router;