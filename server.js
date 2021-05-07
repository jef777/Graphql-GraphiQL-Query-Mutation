const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const { graphql } = require('graphql');
const app = express();

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
  } = require('graphql');


app.listen(5000, () => console.log('server running on port 5000'))