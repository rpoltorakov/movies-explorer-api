const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validatorCreateMovie, validatorDeleteMovie } = require('../middlewares/validators');

router.get('/', getMovies);
router.post('/', validatorCreateMovie, createMovie);
router.delete('/:movieId', validatorDeleteMovie, deleteMovie);

module.exports = router;
