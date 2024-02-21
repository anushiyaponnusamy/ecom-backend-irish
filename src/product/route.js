const express = require('express');
const controller = require('./controller');
const validationMiddleware = require('../../middleware');

const router = express.Router();

router.post('/create-product', validationMiddleware.validateToken, validationMiddleware.validateAdmin, (req, res, next) =>
  controller
    .createproduct(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);


router.get('/getAllProduct/:pageNumber/:perPage', validationMiddleware.validateToken, (req, res, next) =>
  controller
    .getAllProduct(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.post('/update-product', validationMiddleware.validateToken, validationMiddleware.validateAdmin, (req, res, next) =>
  controller
    .updateproduct(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/getProductById/:id', (req, res, next) =>
  controller
    .getProductById(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/getProductsByCategory/:categoryId', (req, res, next) =>
  controller
    .getProductsByCategory(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.delete('/deleteProductById/:id',
  validationMiddleware.validateToken,
  validationMiddleware.validateAdmin, (req, res, next) =>
  controller
    .deleteproductById(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/getProductPhotoById/:id',
  validationMiddleware.validateToken,
  validationMiddleware.validateAdmin, (req, res, next) =>
  controller
    .getProductPhotoById(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.post('/getProductByCategories',
  validationMiddleware.validateToken, (req, res, next) =>
  controller
    .getProductByCategories(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.get('/searchProduct/:searchText',
  validationMiddleware.validateToken, (req, res, next) =>
  controller
    .searchProduct(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

module.exports = router;