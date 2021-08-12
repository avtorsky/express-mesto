const router = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const { validateUser, validateAvatar } = require('../utils/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', validateUser, updateUser);
router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
