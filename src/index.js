const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join("client", "build")));
app.use(express.json({ extended: false }));
app.use(express.static("public"));

const corsOptions = {
  origin: "http://localhost:5000",
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("tiny"));
const uri =
  process.env.ATLAS_URI ||
  "mongodb+srv://test:test@sushant.mqjbv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("connection established successfully");
});

const userRouter = require("./routes/v1/user");
const quizRouter = require("./routes/v1/quizzes");
const quizResponseRouter = require("./routes/v1/quizResponse");
app.use("/api/v1/user", userRouter);
app.use("/api/v1/quizzes", quizRouter);
app.use("/api/v1/quizResponse", quizResponseRouter);

app.listen(port, console.log(`listing at port ${port}`));
