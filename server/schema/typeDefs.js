const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    savedClothes: [Clothes]
  }

  type Clothes {
    clothesId: String
    title: String
    price: String
    image: String
  }

  input clothesInput {
    clothesId: String
    title: String
    price: String
    image: String
  } 

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveClothes(input: clothesInput): User
    removeClothes(clothesId: ID!): User
  }
`;

module.exports = typeDefs;
