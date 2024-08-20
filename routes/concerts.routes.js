/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const db = require('./../db');
const shortid = require('shortid');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts.find((item) => item.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
    const {performer, genre, price, day, image } = req.body;
    if(performer, genre, price, day, image) {
        db.concerts.push({
            id: shortid(),
            performer,
            genre,
            price,
            day,
            image
        })
        res.json({ message: "OK" })
    } else {
        res.status(404).json({message: "You can not leave any fields empty!"})
    }
    
});

router.route('/concerts/:id').put((req, res) => {
    const element = db.concerts.find(element => element.id == req.params.id);
    const {performer, genre, price, day, image} = req.body;
    if(element){
        if(performer, genre, price, day, image) {
            element.performer = performer,
            element.genre = genre,
            element.price = price,
            element.day = day,
            element.image = image
            res.json({message: "OK "})
        } else {
            res.status(404).json({ message: "You can not leave any fields empty!"});
        }
    } else {
        res.status(404).json({ message: "OK"})
    } 
});

router.route('/concerts/:id').delete((req, res) => {
    const element = db.concerts.find((element) => element.id == req.params.id);
    const indexOfConcert = db.concerts.indexOf(element);
    db.concerts.splice(indexOfConcert, 1);
    res.json({ message: "OK "});
})

    module.exports = router;

