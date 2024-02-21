const express = require('express');
const controller = require('./controller');
const validationMiddleware = require('../../middleware');

const router = express.Router();

router.post('/create-category', validationMiddleware.validateToken, validationMiddleware.validateAdmin, (req, res, next) =>
  controller
    .createcategory(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);


router.get('/getAllCategories', (req, res, next) =>
  controller
    .getAllCategories(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);
router.post('/update-category', validationMiddleware.validateToken, validationMiddleware.validateAdmin, (req, res, next) =>
  controller
    .updatecategory(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);

router.delete('/deleteCategoryById/:id', (req, res, next) =>
  controller
    .deleteCategoryById(req)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err))
);


module.exports = router;