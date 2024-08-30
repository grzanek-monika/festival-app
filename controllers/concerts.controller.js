const Concert = require('./../models/concerts.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
    }
    catch(err) {
        res.status(500).json({message: err});
    }
}

exports.getSingle = async (req, res) => {
    try {
        const conc = await Concert.findById(req.params.id);
        if(!conc) {
            res.status(404).json({message: "Not found..."});
        } else {
            res.json(conc);
        }
    }
    catch(err) {
        res.status(500).json({message: err});
    }
}

exports.addNew = async (req, res) => {
    const {performer, genre, price, day, image } = req.body;
    try {
        if(performer && genre && price && day && image){
            const newConcert = new Concert({performer: performer, genre: genre, price: price, day: day, image: image });
            await newConcert.save();
            res.json({message: "OK"});
        } else {
            res.status(404).json("You can not leave any fields empty!")
        }   
    }
    catch(err) {
        res.status(500).json({message: err});
    }  
}

exports.updateItem =  async (req, res) => {
    const {performer, genre, price, day, image } = req.body; 
    try {
        if(performer && genre && price && day && image){
            await Concert.updateOne({_id: req.params.id}, {$set: {performer: performer, genre: genre, price: price, day: day, image: image}});
            res.json({message: "OK"});
        } else {
            res.status(404).json({message: "You can not leave any fields empty!"});
        } 
    }
    catch(err) {

    }
}

exports.deleteItem = async (req, res) => {
    try {
        const conc = await Concert.findById(req.params.id);
        if(!conc) {
            res.status(404).json({message: "Not found..."});
        } else {
            await Concert.deleteOne({_id: req.params.id});
            res.json({message: "OK"});
        }
    }
    catch(err) {
        res.status(500).json({message: err});
    }   
}