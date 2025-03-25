const express = require("express");
const router = express.Router();
const upload = require('../config/multer');
const { addMovie, getMovies, deleteMovie, editMovie } = require("../controllers/movieController");

router.post("/addmovie",upload.single('coverImage'), addMovie);

router.get("/getmovie", getMovies);

router.delete("/deletemovie/:name", deleteMovie);

router.put("/updatemovie/:name", editMovie);

module.exports = router;