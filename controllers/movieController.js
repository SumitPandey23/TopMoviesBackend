const Movie = require("../models/movieSchema");
const upload = require("../config/multer");

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({
      message: "Movies fetched successfully",
      movies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

exports.addMovie = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Cover image is required.' });
  }

  const { name, director, rating, description, releaseDate, duration } = req.body;

  if (!name || !director || !rating || !description || !releaseDate || !duration) {
    return res.status(400).json({
      error:
        "All fields are required: name, director, rating, description, releaseDate, duration.",
    });
  }

  if (isNaN(duration) || duration <= 0) {
    return res
      .status(400)
      .json({ error: "Duration must be a positive number." });
  }

  try {
    const newMovie = new Movie({
      name,
      coverImage: `uploads/${req.file.filename}`,
      director,
      rating,
      description,
      releaseDate,
      duration,
    });

    await newMovie.save();

    res.status(201).json({
      message: "Movie added successfully",
      movie: newMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};


exports.editMovie = async (req, res) => {
  const { name } = req.params;
  const { director, rating, description, duration } = req.body;

  if (!director && !rating && !description && duration === undefined) {
    return res
      .status(400)
      .json({ error: "At least one field is required to update the movie." });
  }

  try {
    const movie = await Movie.findOneAndUpdate(
      { name },
      {
        director,
        rating,
        description,
        duration,
      },
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ error: "Movie not found." });
    }

    res.status(200).json({
      message: "Movie updated successfully",
      movie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

exports.deleteMovie = async (req, res) => {
  const { name } = req.params;

  try {
    const movie = await Movie.findOneAndDelete({ name });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found." });
    }

    res.status(200).json({
      message: "Movie deleted successfully",
      movie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};
