var express = require('express');
var router = express.Router();
var db = require('../db');
var check = require('express-validator');
var bodyParser = require('body-parser');

router.get('/([0-9]{1,100})', async function (req, res) {

    var arr = (req.originalUrl).split("/");
    var itemId = arr[arr.length - 1];

    const [inventory] = (await Promise.all([
        db.query(`SELECT * FROM inventory WHERE id = ${itemId}`),
    ])).map(query => query.rows);
    
    var itemRow = inventory[0]
    var categoryId = itemRow.categoryid

    const [categories, suppliers] = (await Promise.all([
        db.query(`SELECT * FROM categories WHERE id = ${categoryId}`),
        db.query(`SELECT * FROM suppliers WHERE supplierfor = ${itemId}`),
    ])).map(query => query.rows);

    var categoryRow = categories[0]

    res.render('item', {
        id: itemId,
        imageurl: itemRow.imageurl,
        title: itemRow.name,
        price: itemRow.price,
        colors: itemRow.colors,
        category: categoryRow.name,
        seasonal: categoryRow.seasonal,
        description: categoryRow.description,
        suppliers: suppliers,
        linkActive: 'order'
    });
});

router.get('/([0-9]{1,100}/addsupplier)', async function (req, res) {

    var arr = (req.originalUrl).split("/");
    var itemId = arr[arr.length - 2];

    const [inventory] = (await Promise.all([
        db.query(`SELECT * FROM inventory WHERE id = ${itemId}`),
    ])).map(query => query.rows);
    
    var itemRow = inventory[0]
  
    res.render('addSupplier', {
        id: itemId,
        title: itemRow.name,
        linkActive: 'order'
    });
});

router.post('/([0-9]{1,100}/addsupplier)', async function (req, res) {

    var arr = (req.originalUrl).split("/");
    var itemId = arr[arr.length - 2];
    
    console.log(req.body)


});

module.exports = router;