const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const Movie = mongoose.model('Movie', movieSchema, 'movies');

module.exports = Movie;