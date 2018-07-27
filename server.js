require('dotenv').config();

console.log(process.env.DATABASE);
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');


const app = express();

const UserRoutes = require('./routes/users');
const TaskRoutes = require('./routes/tasks');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/todoapp',  { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to the database');
});
mongoose.connection.on('error', (err) => {
    console.log('Unable to connect to the database ' + err);
});

const _PORT = process.env.PORT;


app.use(cors());

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.get('/', (req, res, next) => {
    res.send('I am a test');
})

app.use('/users', UserRoutes);
app.use('/tasks', TaskRoutes);  

app.listen(_PORT, () => {
    console.log('Server Started on port ', _PORT)
});