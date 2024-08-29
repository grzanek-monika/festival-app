/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const db = require('./../db');
const shortid = require('shortid');
const Concert = require('./../models/concerts.model')

router.get('/concerts', async (req, res) => {
    try {
        res.json(await Concert.find());
    }
    catch(err) {
        res.status(500).json({message: err});
    }
});

router.get('/concerts/:id', async (req, res) => {
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
    res.json(db.concerts.find((item) => item.id == req.params.id));
});

router.post('/concerts', async (req, res) => {
    const {performer, genre, price, day, image } = req.body;
    try {
        if(performer, genre, price, day, image){
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
});

router.put('/concerts/:id', async (req, res) => {
    const {performer, genre, price, day, image } = req.body; 
    try {
        if(performer, genre, price, day, image){
            await Concert.updateOne({_id: req.params.id}, {$set: {performer: performer, genre: genre, price: price, day: day, image: image}});
            res.json({message: "OK"});
        } else {
            res.status(404).json({message: "You can not leave any fields empty!"});
        } 
    }
    catch(err) {

    }
});

router.delete('/concerts/:id', async (req, res) => {
    /*const element = db.concerts.find((element) => element.id == req.params.id);
    const indexOfConcert = db.concerts.indexOf(element);
    db.concerts.splice(indexOfConcert, 1);
    res.json({ message: "OK "});*/
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
    
})

    module.exports = router;

