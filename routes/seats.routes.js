/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const db = require('./../db');
const shortid = require('shortid');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.find((item) => item.id == req.params.id));
});

router.route('/seats').post((req, res) => {
    const {day, seat, client, email} = req.body;
    if(db.seats.some(check => check.day == day && check.seat == seat)) {
        res.status(404).json({message: 'The slot is already taken...'});
    } else {
        if(day, seat, client, email){
            db.seats.push({
                id: shortid(),
                day,
                seat,
                client,
                email
            });
            res.io.emit("seatsUpdated", db.seats);
            res.json({message: "OK "});
        } else {
            res.status(404).json({ message: "You can not leave any fields empty!" });
        }
    }
    
});

router.route('/seats/:id').put((req, res) => {
    const element = db.seats.find(element => element.id == req.params.id);
    const {day, seat, client, email} = req.body;
    if(day, seat, client, email) {
        element.day = day;
        element.seat = seat;
        element.client = client;
        element.email = email;
        res.json({ message: "OK" });
    } else {
        res.status(404).json("You can not leave any fields empty!");
    }
});

router.route('/seats/:id').delete((req, res) => {
    const element = db.seats.find(element => element.id == req.params.id);
    const indexOfSeat = db.seats.indexOf(element);
    db.seats.splice(indexOfSeat, 1);
    res.json({ message: "OK "});
});

module.exports = router;

