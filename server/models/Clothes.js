const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedClothes` array in User.js
const clothesSchema = new Schema({
  seller: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // saved clothe id from
  clothesId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = clothesSchema;
