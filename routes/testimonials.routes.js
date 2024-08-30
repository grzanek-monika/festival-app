/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const TestimonialController = require('./../controllers/testimonials.controller');

// get random testimonial
router.get('/testimonials/random', TestimonialController.getRandom);

// get all testimonials
router.get('/testimonials', TestimonialController.getAll);

// get single testimonial
router.get('/testimonials/:id', TestimonialController.getSingle);

// add new testimonial
router.post('/testimonials', TestimonialController.addNew);

// edit testimonial
router.put('/testimonials/:id', TestimonialController.updateItem);

router.delete('/testimonials/:id', TestimonialController.deleteItem);

module.exports = router;
