const { User, Clothes } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      
      console.log("Context.user from 'me' in 'resolvers':", context.user); // Returns 'undefined'

      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
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
      console.log("Context.user from 'saveClothes' in 'resolvers:", context.user); // Returns the user
      
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
        if (updatedUser) {
          return updatedUser;
        } else {
          throw new Error('User not found.');
        }
      }
      throw new Error('User was not in context.');
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
