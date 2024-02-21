const express = require('express');
const validationMiddleware = require('../../middleware');
const controller = require('./controller');
const router = express.Router();
router.post('/success', validationMiddleware.validateToken, (req, res, next) =>
    controller
        .success(req)
        .then((data) => res.status(200).send(data))
        .catch((err) => next(err))
);


router.post('/orders', (req, res, next) =>
    controller
        .orders(req)
        .then((data) => res.status(200).send(data))
        .catch((err) => next(err))
);

module.exports = router;