const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        // TODO: add savedBooks below
    }

    type Query {
        users: [User]!
        user(userId: ID!): User
    }

    type Mutation {
        addUser(username: String!): User
        // TODO: add more mutations
    }
`;

module.export = typeDefs;
