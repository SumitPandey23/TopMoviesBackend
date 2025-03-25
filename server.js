const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");

dotenv.config();

const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);

mongoose
  .connect(process.env.MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
