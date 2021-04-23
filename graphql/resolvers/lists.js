const Book = require('../model/Book');
const List = require('../model/List');

module.exports = {
    Query: {
        getList: async (_, { listId }, context) => {
            return List.findById(listId);
        }
    },
    Mutation: {
        addWord: async (_, { wordInput: { content, description, bookTitle, listIndex} }, context) => {
            const book = await Book.findOne({ title: bookTitle });
            if((!book && listIndex !== 1) || (book && listIndex > book.listIds.length + 1)){
                return {
                    success: false,
                    message: "Can't find a list with given information (index out of bound)."
                }
            }

            if(book && listIndex <= book.listIds.length){
                const list = await List.findById(book.listIds[listIndex - 1]);
                list.words.push({ content, description });
                await list.save();

                return {
                    success: true,
                    message: `Inserted word ${content} into list ${listIndex}`
                };
            }

            const newList = new List({
                index: listIndex,
                words: [{ content, description }]
            });
            await newList.save();

            const listId = newList._id;

            if(!book){
                const newBook = new Book({
                    title: bookTitle,
                    listIds: [listId]
                });
                await newBook.save();

                return {
                    success: true,
                    message: `Created book ${bookTitle}, inserted word ${content} into list 1`
                };
            }

            book.listIds.push(listId);
            await book.save();

            return {
                success: true,
                message: `Created list, inserted word ${content} into list ${listIndex}`
            };
        },
        addList: async (_, { listInput: { content, bookTitle } }, context) => {
            const book = await Book.findOne({ title: bookTitle });

            let index;
            if(!book){
                index = 1;
            }else{
                index = book.listIds.length + 1;
            }

            const words = content.trim().split(/\s*(?:;|$)\s*/).filter(line => line.trim() !=='').map(line => {
                line = line.trim();

                const kv = line.split(',');
                return { content: kv[0].trim(), description: kv[1].trim() };
            });

            const newList = new List({ index, words });
            await newList.save();

            if(!book){
                const newBook = new Book({
                    title: bookTitle,
                    listIds: [newList._id]
                });
                await newBook.save();
            }else{
                book.listIds.push(newList._id);
                await book.save();
            }

            return true;
        }
    }
}