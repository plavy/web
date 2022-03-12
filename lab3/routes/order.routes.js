var express = require('express');
var router = express.Router();
var db = require('../db');


router.get('/', async function(req, res) {
    const [categories, items] = (await Promise.all([
        db.query('SELECT * FROM categories'),
        db.query('SELECT * FROM inventory'),
    ])).map(query => query.rows);
    for (const category of categories) {
        category.items = items.filter(item => (item.categoryid === category.id));
    }

    res.render('order', {title: 'Order', linkActive:'order', categories: categories});
});

module.exports = router;