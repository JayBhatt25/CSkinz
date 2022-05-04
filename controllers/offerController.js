const skins = require('../models/skin');
const offer = require('../models/offer');
const skin = require('../models/skin');
const user = require('../models/user');
exports.test = (req, res, next) => {
	const item1 = req.params.item1;
	res.redirect('/offer/'+item1+'/');
}

exports.offerstep2 = (req, res, next) => {
	const item1 = req.params.item1;
    const curruser = req.session.user;
    // console.log("from offer controller : "+item2);
    skins.find({owner: curruser})
    .then(result =>{
        
        if(result.length > 0){
            res.render('offer/select',{result,item1})
        } else {
            req.flash('error', 'You must have atleast one item to trade.')
            res.redirect('/trades/newTrade')
        }  
        
    } )
    .catch(err => next(err));
	console.log('step 2 is here');
}

exports.offerstep3 = (req, res, next) => {
	const item1 = req.params.item1;
    const item2 = req.params.item2;
    console.log("from offer step3 : "+item1);
    console.log("from offer step3 : "+item2);
   const curruser = req.session.user;
    currOffer = {};
    skin.findById(item1)
    .then(founditem => {
        currOffer.forUser = founditem.owner;
        currOffer.oItem = item2;
        currOffer.oFor = item1;
        currOffer.byUser = req.session.user;
        const newOffer = new offer(currOffer);
        newOffer.save()
        .then(result =>{
            Promise.all([skin.findByIdAndUpdate(result.oFor, {status : "pending"}), skin.findByIdAndUpdate(result.oItem, {status : "pending"})])
            .then(result1 => {
                offer.findByIdAndUpdate(result._id,{oStatus: 'made'}).then(abc => console.log("Success") ).catch(err=> next(err))
                
            })
            .catch(err => next(err))
            req.flash('success','Offer Made.')
            res.redirect('/users/profile')
	    })
	    .catch(err=>{
            if(err.name == 'ValidationError'){
                req.flash('error', err.message);
               return res.redirect('/users/profile');
            } else if(err.code == 11000){
                req.flash('error', 'Item is already in a offer');
                return res.redirect('/users/profile');
            }
            next(err);
          
        }); 
    })
    .catch(err => next(err))
    
	console.log('step 3 is here');
}

exports.withdraw = (req, res, next) => {
    let offer1 = req.params.offer;
    const curruser = req.session.user;
    offer.findById(offer1)
    .then(result =>{
        Promise.all([skin.findByIdAndUpdate(result.oFor, {status : "available"}), skin.findByIdAndUpdate(result.oItem, {status : "available"})])
        .then(result1 => {
            console.log("Success");
            offer.findByIdAndDelete(offer1)
            .then(abc => res.redirect('/'))
            .catch(err => next(err))
        })
        .catch(err => next(err))
        req.flash('success','Offer withdrawn.')
        res.redirect('/users/profile')
    })
    .catch(err=>{
    next(err)
    }); 

}

exports.accept = (req, res, next) => {
    let offer1 = req.params.offer;

    offer.findById(offer1)
    .then(result =>{
        Promise.all([skin.findById(result.oItem), skin.findById(result.oFor)])
        .then(fskins => {
            const [userskin, offeredskin] = fskins;
            let temp = userskin.owner;
            Promise.all([skin.findByIdAndUpdate(userskin._id, {owner: offeredskin.owner, status: 'traded'}), skin.findByIdAndUpdate(offeredskin._id, {owner: temp, status: 'traded'})])
            .then(newowners => {
                offer.findByIdAndUpdate(offer1, {oStatus: 'accepted'})
                .then(abc => {
                    req.flash('success','Offer Accepted.')
                    res.redirect('/users/profile')
                })
                .catch(err => next(err))
            })
            .catch(err => next(err))
            
        })
        .catch(err => next(err))
    })
    .catch(err=>{
    next(err)
    }); 

}

exports.reject = (req, res, next) => {
    let offer1 = req.params.offer;

    offer.findById(offer1)
    .then(result =>{
        Promise.all([skin.findById(result.oItem), skin.findById(result.oFor)])
        .then(fskins => {
            const [userskin, offeredskin] = fskins;
            Promise.all([skin.findByIdAndUpdate(userskin._id, {status: 'available'}), skin.findByIdAndUpdate(offeredskin._id, {status: 'available'})])
            .then(newowners => {
                offer.findByIdAndUpdate(offer1, {oStatus: 'rejected'})
                .then(abc => {
                    req.flash('error','Offer Rejected.')
                    res.redirect('/users/profile')
                })
                .catch(err => next(err))
            })
            .catch(err => next(err))
            
        })
        .catch(err => next(err))
    })
    .catch(err=>{
    next(err)
    }); 

}