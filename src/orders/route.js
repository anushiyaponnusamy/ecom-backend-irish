const express = require('express');
const controller = require('./controller');
const validationMiddleware = require('../../middleware');

const router = express.Router();

router.post('/create-order', validationMiddleware.validateToken, (req, res, next) =>
  controller
    .createOrder(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);


router.get('/getAllOrders', (req, res, next) =>
  controller
    .getAllOrders(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);
router.get('/getAllOrdersByUserId/:userId', (req, res, next) =>
  controller
    .getAllOrdersByUserId(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);
router.post('/update-shipping-status', validationMiddleware.validateToken, (req, res, next) =>
  controller
    .updateShippingStatus(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);




module.exports = router;