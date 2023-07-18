const router = require('express').Router();
const {
  getCurrentUser,
  patchCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', patchCurrentUser);

module.exports = router;
