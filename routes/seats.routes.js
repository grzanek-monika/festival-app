/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const SeatController = require('./../controllers/seats.controller');

router.get('/seats', SeatController.getAll);

router.get('/seats/:id', SeatController.getSingle);

router.post('/seats', SeatController.addNew);

router.put('/seats/:id', SeatController.updateItem);

router.delete('/seats/:id', SeatController.deleteItem);

module.exports = router;

