/* eslint-disable no-undef */

const express = require('express');
const router = express.Router();
const db = require('./../db');
const shortid = require('shortid');


// get random testimonial
router.route('/testimonials/random').get((req, res) => {
    let item = db.testimonials[Math.floor(Math.random() * db.testimonials.length )];
    res.json(item);
});

// get all testimonials
router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

// get single testimonial
router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials.find((item) => item.id == req.params.id));
});

// add new testimonial
router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
  if(author && text) {
    db.testimonials.push({
      id: shortid(),
      author,
      text
    });
    return res.json({message: 'OK'});
  } else {
    res.status(404).json({ message: 'You can\'t leave any fields empty!' });
  }    
});

// edit testimonial
router.route('/testimonials/:id').put((req, res) => {
    const element = db.testimonials.find(element => element.id == req.params.id);
    const { author, text } = req.body;

    if(element){
        if(author && text){
        element.author = author;
        element.text = text;
        res.json({ message: 'OK' });
        } else {
        res.status(404).json({ message: 'You can\'t leave any fields empty!' });
        }
    } else {
        res.status(404).json({ message: 'You have to provide correct ID!' });
    }             
});

router.route('/testimonials/:id').delete((req, res) => {
    const getTestimonialById = db.testimonials.find((item) => item.id == req.params.id);
    const indexOfTestimonial = db.testimonials.indexOf(getTestimonialById);
    db.testimonials.splice(indexOfTestimonial, 1);
    return res.json({message: 'OK'});
})



module.exports = router;
