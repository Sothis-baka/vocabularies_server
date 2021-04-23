const Book = require('../model/Book');

module.exports = {
    Query:{
        getBooks: async () => {
            return Book.find().sort({ title: 1 });
        }
    }
}