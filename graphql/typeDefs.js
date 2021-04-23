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
        getBooks: [Book]!
        getList(listId: String): List
    }
    
    input WordInput{
        content: String!
        description: String!
        bookTitle: String!
        listIndex: Int!
    }
    
    input ListInput{
        content: String!
        bookTitle: String!
    }
    
    type addWordResponse{
        success: Boolean!
        message: String!
    }
    
    type Mutation{
        addWord(wordInput: WordInput!): addWordResponse!
        addList(listInput: ListInput!): Boolean!
    }
`;