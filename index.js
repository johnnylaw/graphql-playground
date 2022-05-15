import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || "4000";
const DB_PASSWORD = process.env.DB_PASSWORD
const db = `mongodb+srv://demo:${DB_PASSWORD}@cluster0.3cqtx.mongodb.net/graphqlDemo?retryWrites=true`

import schema from "./graphql";

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

const captureLoggedInUser = (({ url }) => url.replace(/^.*logged_in_user=([a-z0-9A-Z]+).*$/, '$1'))

app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  graphqlHTTP((request) => ({
    schema,
    context: { currentUserId: captureLoggedInUser(request) },
    graphiql: true
  }))
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
