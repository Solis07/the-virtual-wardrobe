const { User, Clothes } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      
      console.log('context.user:', context.user);

      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        console.log('user:', user);
        return user;
      }
      throw new Error('User not found.');
    },
  },

  Mutation: {
    login: async (parent, args) => {
      const user = await User.findOne({ email: args.email });
      
      if (!user) {
        throw new Error('User not found.'); 
      }

      const isCorrectPassword = await user.isCorrectPassword(args.password);

      if (!isCorrectPassword) {
        throw new Error('Incorrect credentials.');
      }
      
      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    saveClothes: async (parent, args, context) => {
      // When click 'Save these clothes' button 'context.user' has value of 'undefined.'
      // If 'context.user' has the value of 'undefined', perhaps nothing happens in 'saveClothes' resolver?
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          {
            _id: context.user._id,
          },
          {
            $push: {
              savedClothes: args.input,
            },
          },
          { new: true }
        );
        return updatedUser;
      }
      throw new Error('User not found.');
    },

    removeClothes: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
      {
        _id: context.user._id,
      },
      {
        $pull: {
          savedClothess: {
            clothesId: args.clothesId,
          },
        },
      },
      { new: true }
      );
      return updatedUser;
      }
      throw new Error('User not found.');
    },
  },
};

module.exports = resolvers;
