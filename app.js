const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
let port = 8080;
let host = 'localhost';

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/skinsdb',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> {
	app.listen(port, host, (req, res) => {
		console.log('Listening on port '+ port);
	});
})
.catch(err => console.log(err))

const tradeRouter = require('./routes/tradeRouter.js');
const mainRouter = require('./routes/mainRouter.js');


app.use('/trades',tradeRouter);

app.use('',mainRouter);


app.use((req,res,next)=>{
	let err = new Error('The Server cannot find '+ req.url);
	err.status = 404;
	next(err);
});

app.use((err,req,res,next)=>{
	if(!err.status){
		err.status = "500";
		err.message = "Internal Server Error";
	}
	res.status = err.status;
	res.render('error',{error:err});
   console.log(err.message);
   next();
   
});


