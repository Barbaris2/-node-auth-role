const Router = require('express');
const { check } = require('express-validator');
const router = new Router();
const controller = require('./authController');
const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');

router.post(
  '/registration',
  [
    check('username', 'Имя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 и меньше 10').isLength({
      min: 4,
      max: 10,
    }),
  ],
  controller.registration
);
router.post('/login', controller.login);
router.get('/users', roleMiddleware(['USER']), controller.getUsers);

module.exports = router;