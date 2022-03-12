const express = require('express');
const app = express();
var path = require('path');

const home = require('./routes/home.routes');
const order = require('./routes/order.routes');
const item = require('./routes/item.routes');

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use('/', home);
app.use('/order', order);
app.use('/item', item);

app.listen(8000);