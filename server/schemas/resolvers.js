const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

//TODO: add more code for different queries and mutations
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select("-__v -password");
                return userData;
            }
            throw new AuthenticationError("Must be logged in!")
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found!')
            }
            const correctPassword = await user.isCorrectPassword(password);
            if(!correctPassword) {
                throw new AuthenticationError('Check your credentials and try again!')
            }
            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, { input }, context) => {
            if (context.user) {
                const updateUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: input }},
                    { new: true, runValidators: true}
                );
            }
            throw new AuthenticationError("Must be logged in!")
        },
        removeBook: async (parent, { bookId }, context) => {
            if (conext.user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId} } },
                    { new: true }
                );
                return updateUser;
            }
            throw new AuthenticationError("Must be logged in!")
        }
    }
};

module.exports = resolvers;