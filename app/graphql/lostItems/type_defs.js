const { gql } = require('apollo-server');

const rootTypes = gql`
  extend type Query {
    lostItems(limit: Int, id: ID): [LostItem]
  }
  extend type Mutation {
    createLostItem(lostItem: LostItemInput!): LostItem
  }
`;

const customTypes = gql`
  type LostItem {
    description: String!
    state: String!
    userInfoStateLost: String
    userInfoStateDelivered: String
    images: [String]
    id: ID!
  }
`;

const inputTypes = gql`
  input LostItemInput {
    description: String!
    state: String!
    userInfoStateLost: String
    userInfoStateDelivered: String
    images: [String!]
  }
`;

exports.typeDefs = [rootTypes, customTypes, inputTypes];
