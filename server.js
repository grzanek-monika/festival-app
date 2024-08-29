/* eslint-disable no-undef */
const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const testimonialsRoutes = require('./routes/testimonials.routes.js');
const concertsRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');

app.use(cors());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use((req, res, next) => {
    req.io = io;
    next();
});  

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
  

app.use((req, res) => {
    res.status(404).json({message: '404 - not found...'});
})

mongoose.connect('mongodb://localhost:27017/NewWaveDB', {useNewUrlParser: true});
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database');
})

db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on("connection", (socket) => {
    console.log("New socket: " + socket.id );
    socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} has left...`)
    })
})
