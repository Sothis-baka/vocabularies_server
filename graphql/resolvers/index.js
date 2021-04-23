const bookResolvers = require('./books');
const listResolvers = require('./lists');

module.exports = {
    Query: {
        ...bookResolvers.Query,
        ...listResolvers.Query
    },
    Mutation: {
        ...listResolvers.Mutation
    }
};