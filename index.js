import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || "4000";
const DB_PASSWORD = process.env.DB_PASSWORD
const db = `mongodb+srv://demo:${DB_PASSWORD}@cluster0.3cqtx.mongodb.net/graphqlDemo?retryWrites=true&w=majority1;`

const { buildSchema } = require('graphql');
const schema = buildSchema(`
  type User {
    id: ID!
  }
  type Query {
    hello: String
    viewer: User
  }
`);

const rootValue = {
  hello: () => {
    return 'Hello world!';
  },
  viewer: () => {
    return {
      id: 1
    }
  }
};
// Connect to MongoDB with Mongoose.
mongoose
  .connect(
    db,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
  })
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
