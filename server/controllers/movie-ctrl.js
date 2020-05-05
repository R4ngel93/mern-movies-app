const Movie = require('../models/movie-model.js');

/* Insert data */
createMovie = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a movie'
    });
  }

  const movie = new Movie(body);

  if (!movie) {
    return res.status(400).json({
      success: false,
      error: error
    });
  }

  movie.save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: movie._id,
        message: 'Movie created!'
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Movie not created!'
      })
    });
}
/* Update data */
updateMovie = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update'
    });
  }

  await Movie.findOne({ _id: req.params.id }, (error, movie) => {
    if (error) {
      return res.status(404).json({
        error,
        message: 'Movie not found'
      });
    }
    movie.name = body.name;
    movie.time = body.time;
    movie.rating = body.rating;

    movie.save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: movie._id,
          message: 'Movie updated!'
        });
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Movie not updated'
        });
      });
  })
}

/* Delete data */
deleteMovie = async (req, res) => {
  await Movie.findOneAndDelete({ _id: req.params.id }, (error, movie) => {
    if (error) {
      return res.status(400).json({ success: false, error: error });
    }

    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }

    return res.status(200).json({ success: true, data: movie })
  }).catch(error => console.error(error));
}

/* Get data by id */
getMovieById = async (req, res) => {
  await Movie.findOne({ _id: req.params.id }, (error, movie) => {
    if (error) {
      return res.status(400).json({ success: false, error });
    }
    if (!movie) {
      return res.status(404).json({ success: false, error: 'Movie not found' });
    }
    return res.status(200).json({ success: true, data: movie });
  }).catch(error => console.error(error));
}

/* Get all data */
getMovies = async (req, res) => {
  await Movie.find({}, (error, movies) => {
    if (error) {
      return res.status(400).json({ success: false, error });
    }
    if (!movies.length) {
      return res.status(404).json({ success: false, error: "There aren't any movies" })
    }
    return res.status(200).json({ success: true, data: movies })
  }).catch(error => console.error(error));
}

/* Exports */
module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovies,
  getMovieById
}
