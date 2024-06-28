import express from "express";
import mongoose from "mongoose";
import mainRoute from "./routes/main";

const MONGODB_URI =
  "mongodb+srv://lucasjan:Q41TavYrylvI7Xki@cluster.neqaq8n.mongodb.net/logins?&w=majority";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(mainRoute);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((err) => console.log(err));
