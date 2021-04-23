const { gql } = require('apollo-server');

module.exports = gql`
    type Word{
        content: String!
        description: String!
    }
    
    type List{
        id: ID!
        index: Int!
        words: [Word]!
    }
    
    type Book{
        id: ID!
        title: String!
        listIds: [String]!
    }
    
    type Query{
        "Get an array of all books in database."
        getBooks: [Book]!
        "Get a list with giving list id."
        getList(listId: String): List
    }
    
    input WordInput{
        content: String!
        description: String!
        bookTitle: String!
        listIndex: Int!
    }
    
    "Each line input should be seperated by ';', word and description shoule be seperated by ','."
    input ListInput{
        content: String!
        bookTitle: String!
    }
    
    type addWordResponse{
        success: Boolean!
        message: String!
    }
    
    type Mutation{
        "Insert a word. If book/list doesn't not exist but looks resonable, create it."
        addWord(wordInput: WordInput!): addWordResponse!
        "Create a list. Then push the list to the book."
        addList(listInput: ListInput!): Boolean!
    }
`;