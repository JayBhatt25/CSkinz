const { v4:uuidv4 } = require("uuid");
const { DateTime } = require("luxon");

const skins = [{id:'1',
                skin_name: 'Decimator', 
                category:'rifles', 
                owner: 'Jay Bhatt',
                img: '/images/decimator.png',
                desc: 'M4A1-S | Decimator was added to the game on March 15, 2017, as part of The Spectrum Collection, which was createdreleased alongside the “Take a trip to the Canals” update. The skin was created by Coridium.', 
                created: DateTime.now(2021,2,12,12,0).toLocaleString(DateTime.DATETIME_SHORT)},
                {id:'2',
                skin_name: 'Vulcan', 
                category:'rifles', 
                owner: 'Jay Bhatt',
                img: '/images/vulcan.png',
                desc: 'AK-47 | Vulcan was added to the Workshop on December 13, 2013, and appeared in the game on May 1, 2014, as part of The Huntsman Collection, which was released alongside “The Hunt Begins” update. The skin was created by jim´s.', 
                created: DateTime.now(2021,2,12,12,0).toLocaleString(DateTime.DATETIME_SHORT)},
                {id:'3',
                skin_name: 'Dragon Lore', 
                category:'rifles', 
                owner: 'Jay Bhatt',
                img: '/images/dragon.png',
                desc: 'AWP | Dragon Lore was added to the game on July 1, 2014, as part of The Cobblestone Collection, which was released alongside the start of Operation Breakout.The body of the rifle is painted olive and adorned with an image of a dragon spitting fire. The body of the dragon is adorned with Celtic ornaments. A black-and-green checkered pattern is applied to the scope, the front part of the barrel and the back part of the buttstock.', 
                created: DateTime.now(2021,2,12,12,0).toLocaleString(DateTime.DATETIME_SHORT)},
                {id:'4',
                skin_name: 'Spearmint', 
                category:'gloves', 
                owner: 'Jay Bhatt',
                img: '/images/spearmint.png',
                desc: 'Moto Gloves | Spearmint were added to the game on November 28, 2016. The gloves are available in The Glove Case and The Operation Hydra Case.', 
                created: DateTime.now(2021,2,12,12,0).toLocaleString(DateTime.DATETIME_SHORT)},
                {id:'5',
                skin_name: 'Amphibious', 
                category:'gloves', 
                owner: 'Jay Bhatt',
                img: '/images/amphibious.png',
                desc: 'Sport Gloves | Amphibious were added to the game on February 15, 2018. The gloves are available in The Clutch Case. The upper side of the gloves is made of synthetic fabric that is adorned with an abstract pattern made in various shades of blue and complemented with white accents. The palm side is made of light gray synthetic fabric and reinforced with blue inserts.', 
                created: DateTime.now(2021,2,12,12,0).toLocaleString(DateTime.DATETIME_SHORT)},
                        
                {id: "6",
                skin_name: 'Slaughter',
                category: 'gloves',
                img: '/images/slaughter.png',
                owner: 'Jay Bhatt',
                desc: 'Hand Wraps | Slaughter were added to the game on November 28, 2016. The gloves are available in The Glove Case and The Operation Hydra Case.The inner layer of the wraps is made of brown fabric. The outer layer is made of tarp tape that is adorned with a red-brown abstract pattern.', 
                created: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)},
                ];

exports.find = () => skins;

exports.findById = (id) => {
    
    return skins.find(skin =>skin.id === id);
};

exports.save = (newskin) => {
    newskin.created = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
	newskin.id = uuidv4();
	skins.push(newskin);
}

exports.updateById = (newskin,id) => {
   let skin = skins.find(skin => skin.id === id);
    if(skin){
        skin.category = newskin.category;
        skin.desc = newskin.desc;
        skin.skin_name = newskin.skin_name;
        skin.owner = newskin.owner;
        skin.created = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);

        return true;
    } else {
        return false;
    }

}

exports.deleteById = function(id){
	let index = skins.findIndex(skin => skin.id === id);
	if(index !== -1){
		skins.splice(index,1);
		return true;
	}
	else{
		return false;
	}
}