const { model, Schema } = require('mongoose');

const Book = new Schema({
    title: String,
    listIds: [String]
}, { collection: 'books'});

module.exports = model('Book', Book);