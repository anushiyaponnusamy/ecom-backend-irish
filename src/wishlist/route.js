const express = require('express');
const controller = require('./controller');
const validationMiddleware = require('../../middleware');

const router = express.Router();

router.post('/add-to-wishlist', validationMiddleware.validateToken, (req, res, next) =>
  controller
    .addToWishlist(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/checkWishlist/:productId/:userId', validationMiddleware.validateToken, (req, res, next) =>
  controller
    .checkWishlist(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);
router.get('/getAllWishlistProducts/:userId', validationMiddleware.validateToken, (req, res, next) =>
  controller
    .getAllWishlistProducts(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.delete('/deleteByProductIdAndUserId/:productId/:userId', validationMiddleware.validateToken, (req, res, next) =>
  controller
    .deleteByProductIdAndUserId(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);


module.exports = router;