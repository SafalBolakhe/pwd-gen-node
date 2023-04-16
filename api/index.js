const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const displayRoute = require("./routes/displaypasswords")
const passRoute = require("./routes/passwords");
dotenv.config();
mongoose
  .connect(process.env.mongourl)
  .then(console.log("Connected to DB"))
  .catch((err) => console.log(err));
app = express();

app.listen(3001, () => {
  console.log("Started listening on port 3001....");
});

app.use(express.json());
app
  .get("/", (req, res) => {
    res.send("Hello");
  })
  .use("/auth", authRoute)
  .use("/users", userRoute)
  .use("/load", displayRoute)
  .use("/passwords", passRoute);
