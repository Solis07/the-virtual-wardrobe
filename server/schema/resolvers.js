const { User, Clothes } = require('../models');
const { signToken } = require('../utils/auth');
require('dotenv').config();

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

    apiClothes: async (parent, args, context) => {
      console.log('HELLO!')
      try {
        const key = process.env.PRICE_API;
        const query = args.query;
        console.log(key, query);
      const res = await fetch (`https://amazon-price1.p.rapidapi.com/search?keywords=${encodeURIComponent(query)}&marketplace=ES`, {
    method: 'GET',
    headers: {
              'Content-Type': 'application/json',
      // Scott's 2nd API key:
              'X-RapidAPI-Key': key,
              'X-RapidAPI-Host': 'amazon-price1.p.rapidapi.com'
            }
        })
        const data = await res.json()
          console.log(data);
        // return JSON.stringify(data);
        return (JSON.stringify(data));

    } catch(error) {
      console.log(error);
      return error;
    }
  }
      
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
      console.log('HELLO!');
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
      {
        _id: context.user._id,
      },
      {
        $pull: {
          savedClothes: {
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
