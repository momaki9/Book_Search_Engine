const { User } = require('../models');

//TODO: add more code for different queries and mutations
const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },

        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        }
    }
}

module.exports = resolvers;