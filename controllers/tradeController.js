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
	
	model.findById(id).populate('owner')
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

exports.create=(req,res, next)=>{
	
	let skinBody = new model(req.body);
	skinBody.owner = req.session.user;
	skinBody.status = 'available';
	skinBody.save()
	.then(skin =>{
		res.redirect('/trades')
	})
	.catch(err=>{
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            res.redirect('back');
        }
    }); 
};

exports.delete=(req,res,next)=>{
	let id = req.params.id;

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

    model.findByIdAndUpdate(id,skin,{useFindAndModify: false, runValidators:true})
    .then(skin=>{
        if(skin){
			req.flash('success','Trade has been successfully updated!')
            res.redirect('/trades/'+id);
        }
        else{
         let   err = new Error('Cannot find a skin with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>{
        if(err.name=== 'ValidationError'){
            req.flash('error', err.message);
            res.redirect('back');
        }
        
   
	});
};	

