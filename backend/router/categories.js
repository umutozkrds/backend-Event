const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

router.get('/', categoryController.getCategories);
router.get('/:category', categoryController.getEventsByCategory);
module.exports = router;
