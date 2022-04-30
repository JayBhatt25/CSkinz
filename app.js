const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
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

app.use(session({
	secret: 'Jay@cskinz',
	resave: false,
	saveUninitialized: false,
	cookie: {maxAge: 60*60*1000},
	store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/skinsdb'})
}));
app.use(flash());
app.use((req,res, next) => {
	console.log(req.session);
	res.locals.user = req.session.user || null;
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    
    next();
});
const tradeRouter = require('./routes/tradeRouter.js');
const mainRouter = require('./routes/mainRouter.js');
const userRouter = require('./routes/userRouter.js')
const offerRouter = require('./routes/offerRouter.js')



app.use('/users',userRouter);
app.use('/trades',tradeRouter);
app.use('/offer',offerRouter);
app.use('',mainRouter);


app.use((req,res,next)=>{
	let err = new Error('The Server cannot find '+ req.url);
	err.status = 404;
	next(err);
});

// app.use((err,req,res,next)=>{
// 	if(!err.status){
// 		err.status = "500";
// 		err.message = "Internal Server Error";
// 	}
// 	res.status = err.status;
// 	res.render('error',{error:err});
//    console.log(err.message);
//    next();
   
// });


