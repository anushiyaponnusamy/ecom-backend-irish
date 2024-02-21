const express = require('express');
const controller = require('./controller');
const validationMiddleware = require('../../middleware');

const router = express.Router();

router.post('/signUp', (req, res, next) =>
  controller
    .signUp(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);
//protected route for user
router.get('/user-auth', validationMiddleware.validateToken, (req, res) => {
  res.status(200).send({ ok: true })
}
);
//protected route for admin
router.get('/admin-auth', validationMiddleware.validateToken, validationMiddleware.validateAdmin, (req, res) =>
  res.status(200).send({ ok: true })
);

router.post('/forgotpassword', (req, res, next) =>
  controller
    .forgotpassword(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);
router.post('/login', (req, res, next) =>
  controller
    .login(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.post('/updateById', validationMiddleware.validateToken, (req, res, next) =>
  controller
    .updateById(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/getAllUsers', validationMiddleware.validateToken, (req, res, next) =>
  controller
    .getAllUsers()
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/getUserByUserId/:userId', (req, res, next) =>
  controller
    .getUserByUserId(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/deleteUserByUserId/userId', validationMiddleware.validateToken, validationMiddleware.validateAdmin, (req, res, next) =>
  controller
    .deleteUserByUserId(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.post('/updateAddress', validationMiddleware.validateToken, (req, res, next) =>
  controller
    .updateAddress(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.post('/updateUserDetails', validationMiddleware.validateToken, (req, res, next) =>
  controller
    .updateUserDetails(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);
module.exports = router;