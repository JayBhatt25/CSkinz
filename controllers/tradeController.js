const model = require('../models/skin');
const offer = require('../models/offer');
const user = require('../models/user');
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
	const userid = req.session.user;
	console.log(userid)
	Promise.all([model.findById(id).populate('owner'), offer.find(),user.findById(userid)])
	.then((result) => {
		const [skin,offer,curruser] = result;
		if(skin){
			res.render('./skins/trade',{skin,offer,curruser});
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
		req.flash('success', 'Item created successfully')
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
	
		offer.find({$or:[{oItem:id}, {oFor: id}]})
		.then(foundoffer => {
			if(foundoffer.length > 0){
				foundoffer.forEach(foffer => {
					Promise.all([model.findByIdAndUpdate(foffer.oItem, {status: 'available'}),model.findByIdAndUpdate(foffer.oFor, {status: 'available'})])
					.then(result => {
						offer.findByIdAndDelete(foundoffer)
						.then( abc => {
							model.findByIdAndDelete(id,{useFindAndModify: false})
							.then(skin=>{
								if(skin){
									req.flash('success','Item Deleted.')
									res.redirect('/trades');
								}
								else{
									let err = new Error('Cannot find a skin with id ' + id);
									err.status = 404;
								return next(err);
								}
							
							})
							.catch(err => next(err))
						}) .catch(err => next(err))
					}).catch(err => next(err))
				})
			} else {
				model.findByIdAndDelete(id,{useFindAndModify: false})
							.then(skin=>{
								if(skin){
									req.flash('success','Item Deleted.')
									res.redirect('/trades');
								}
								else{
									let err = new Error('Cannot find a skin with id ' + id);
									err.status = 404;
								return next(err);
								}
							
							})
							.catch(err => next(err))
			}

			
		}).catch(err => next(err));
   
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

