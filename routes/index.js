const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { signup, signin, signout } = require('../controllers/users');

router.post('/signup', signup);
router.post('/signin', signin);

// router.use(auth);

router.use('/users', userRouter);
router.use('/movies', moviesRouter);

router.post('/signout', signout);

module.exports = router;
