const { model, Schema } = require('mongoose');

const List = new Schema({
    index: Number,
    words: [
        {
            content: String,
            description: String
        }
    ]
}, { collection: 'lists' });

module.exports = model('List', List);