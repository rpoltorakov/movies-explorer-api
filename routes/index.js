const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { signup, signin, signout } = require('../controllers/users');
const { NotFoundError } = require('../utils/NotFoundError');
const { validatorSignup, validatorLogin } = require('../middlewares/validators');

router.post('/signup', validatorSignup, signup);
router.post('/signin', validatorLogin, signin);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.post('/signout', signout);
router.use((req, res, next) => {
  next(new NotFoundError());
});

module.exports = router;
