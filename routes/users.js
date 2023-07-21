const router = require('express').Router();
const {
  getCurrentUser,
  patchCurrentUser,
} = require('../controllers/users');
const { validatorUpdateCurrentUser } = require('../middlewares/validators');

router.get('/me', getCurrentUser);
router.patch('/me', validatorUpdateCurrentUser, patchCurrentUser);

module.exports = router;
