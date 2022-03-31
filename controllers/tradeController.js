const model = require('../models/skin');

exports.trades=(req,res, next)=>{
	model.find()
	.then(((skins) => {
		res.render('./skins/trades',{skins});
	}))
	.catch(err => next(err));
	
};

exports.newTrade=(req,res)=>{
	res.render('./skins/newTrade');
};

exports.trade=(req,res,next)=>{
	const id = req.params.id;
	if(!id.match(/^[0-9a-fA-F]{24}$/))
    {
        let err= new Error('Invalid story id');
        err.status=400;
        return next(err);
    }
	model.findById(id)
	.then((skin) => {
		if(skin){
			res.render('./skins/trade',{skin});
		} else {
			let err = new Error("No skin with ID = " + id);
			err.status = 404;
			next(err);
		}
	})
	.catch(err => next(err));
};	

exports.edit=(req,res,next)=>{
	const id = req.params.id;
	console.log(id);
	if(!id.match(/^[0-9a-fA-F]{24}$/)){
		let err = new Error("Invalid story id")
		err.status = 400;
		next(err)
	}
	model.findById(id)
	.then(skin => {
		if(skin){
			res.render('./skins/edit',{skin});
		}
		let err = new Error("No skin with ID = " + id);
		err.status = 404;
		next(err);
	})
	.catch(err => next(err))
	
};

exports.create=(req,res)=>{
	
	let skinBody = new model(req.body);
	
	skinBody.save()
	.then(skin =>{
		res.redirect('/trades')
	})
	.catch(err=>{
        if(err.name === 'ValidationError'){
            err.status= 400;
        }
        next(err);
    }); 
};

exports.delete=(req,res,next)=>{
	let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/))
    {
        let err= new Error('Invalid skin id');
        err.status=400;
        return next(err);
    }

    model.findByIdAndDelete(id,{useFindAndModify: false})
    .then(skin=>{
        if(skin){
            res.redirect('/trades');
        }
        else{
            let err = new Error('Cannot find a skin with id ' + id);
            err.status = 404;
           return next(err);
        }
    })
    .catch(err=>next(err));
};

exports.update=(req,res,next)=>{
	let skin = req.body;
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/))
    {
        let err= new Error('Invalid skin id');
        err.status=400;
        return next(err);
    }

    model.findByIdAndUpdate(id,skin,{useFindAndModify: false, runValidators:true})
    .then(skin=>{
        if(skin){
            res.redirect('/trades/'+id);
        }
        else{
         let   err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>{
        if(err.name=== 'ValidationError')
        err.status=400;
        next(err);
   
	});
};	
