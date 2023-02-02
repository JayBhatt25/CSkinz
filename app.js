const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const creds = require('./credentials');
const flash = require('connect-flash');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
let port = 8080;
let host = 'localhost';

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');


const uri = creds.mongouri;

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true, serverApi:ServerApiVersion.v1 })
.then(()=> {
	app.listen(port, host, (req, res) => {
		console.log('Listening on port '+ port);
	});
})
.catch(err => console.log(err))

app.use(session({
	secret: creds.sessionsecret,
	resave: false,
	saveUninitialized: false,
	cookie: {maxAge: 60*60*1000},
	store: new MongoStore({mongoUrl: creds.sessionstore})
}));
app.use(flash());
app.use((req,res, next) => {
	res.locals.user = req.session.user || null;
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    
    next();
});
const tradeRouter = require('./routes/tradeRouter.js');
const mainRouter = require('./routes/mainRouter.js');
const userRouter = require('./routes/userRouter.js')
const offerRouter = require('./routes/offerRouter.js')
const watchRouter = require('./routes/watchRouter.js')



app.use('/users',userRouter);
app.use('/trades',tradeRouter);
app.use('/offer',offerRouter);
app.use('/watch',watchRouter);
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
   next();
   
});


