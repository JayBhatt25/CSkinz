const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

const app = express();
let port = 8080;
let host = 'localhost';

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.send('App is working');
});

app.listen(port, host, (req, res) => {
    console.log('Listening on port '+ port);
});
