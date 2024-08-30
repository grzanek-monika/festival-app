const Seat = require('./../models/seats.model');

exports.getAll = async (req, res) => {
    try{
        res.json(await Seat.find());
    }
    catch(err) {
        res.status(500).json({message: err});
    }   
}

exports.getSingle = async (req, res) => {
    try {
        const st = await Seat.findById(req.params.id);
        if(!st) {
            res.status(404).json({message: "Not found..."});
        } else {
            res.json(st);
        }
    }
    catch(err) {
        res.status(500).json({message: err});
    }    
}

exports.addNew =  async (req, res) => {
    const {day, seat, client, email} = req.body;
    try{
        if(day && seat && client && email) {
            //const seats = await Seat.find();
            const newSeat = new Seat({day: day, seat: seat, client: client, email: email});
            newSeat.save();
            //res.io.emit("seatsUpdated", seats );
            res.json({message: "OK"});
        } else {
            res.status(404).json("Not found...");
        }
    }
    catch(err) {
        res.status(500).json({message: err});
    }
}

exports.updateItem = async (req, res) => {
    const {day, seat, client, email} = req.body;
    try {
        if(day && seat && client && email) {
            await Seat.updateOne({_id: req.params.id}, {$set: {day: day, seat: seat, client: client, email: email}});
            res.json({message: "OK"});
        } else {
            res.status(404).json({message: "You can\'t leave any fields empty!"})
        }
    }
    catch(err) {
        res.status(500).json({message: err});
    }
}

exports.deleteItem =  async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(!seat) {
            res.status(404).json({message: "Not found..."});
        } else {
            await Seat.deleteOne({_id: req.params.id});
            res.json({message: "OK"});
        }
    }
    catch(err) {
        res.status(500).json({message: err});
    }
}