const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
 
    var db = mongoose.connection; 

    console.log('Connected correctly to server');

    Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    })
    .then((dish) => {
            console.log("This is dish: ");
            console.log(dish);

            return Dishes.find({}).exec();
        })
        .then((dishes) => {
            console.log("This is second");
            console.log(dishes);
            return db.collection('dishes').drop();
        })
        .then(() => {
            return db.close();
        })
        .catch((err) => {
            console.log(err);
        })
});