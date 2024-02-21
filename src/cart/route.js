const express = require('express');
const controller = require('./controller');
const validationMiddleware = require('../../middleware');

const router = express.Router();

router.post('/add-to-cart', validationMiddleware.validateToken, (req, res, next) =>
  controller
    .addToCart(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);


router.get('/getCartItemCountByUserId/:userId', (req, res, next) =>
  controller
    .getCartItemCountByUserId(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);
router.get('/getAllCartItemsByUserId/:userId', (req, res, next) =>
  controller
    .getAllCartItemsByUserId(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);


router.get('/checkCart/:userId/:productId', (req, res, next) =>
  controller
    .checkCart(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.delete('/deleteCartItemByUserIdAndProductId/:userId/:productId', (req, res, next) =>
  controller
    .deleteCartItemByUserIdAndProductId(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.delete('/deleteById/:id', (req, res, next) =>
  controller
    .deleteById(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);


module.exports = router;