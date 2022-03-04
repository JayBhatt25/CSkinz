const model = require('../models/skin.js');

exports.trades=(req,res)=>{
	const skins = model.find();
	res.render('./skins/trades',{skins});
};

exports.newTrade=(req,res)=>{
	res.render('./skins/newTrade');
};

exports.trade=(req,res,next)=>{
	const id = req.params.id;
	const skin = model.findById(id);
	if(skin){
		res.render('./skins/trade',{skin});
	}
	let err = new Error("No skin with ID = " + id);
	err.status = 404;
	next(err);
};

exports.edit=(req,res,next)=>{
	const id = req.params.id;
	console.log(id);
	const skin = model.findById(id);
	if(skin){
		res.render('./skins/edit',{skin});
	}
	let err = new Error("No skin with ID = " + id);
	err.status = 404;
	next(err);
};

exports.create=(req,res)=>{
	const skin = req.body;
	model.save(skin);
	res.redirect('/trades'); 
};

exports.delete=(req,res,next)=>{
	let id = req.params.id;
	if(model.deleteById(id)){
		res.redirect('/trades');
	}
	let err = new Error("No skin with ID = " + id);
	err.status = 404;
	next(err);
};

exports.update=(req,res,next)=>{
	let skin = req.body;
	let id = req.params.id;
	if(model.updateById(skin,id)){
		res.redirect('/trades/'+id);
	}
	let err = new Error("No skin with ID = " + id);
	err.status = 404;
	next(err);
};