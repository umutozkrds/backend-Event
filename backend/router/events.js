const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/auth');
const eventController = require('../controllers/event');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });


router.post('', upload.single('image'), checkAuth, eventController.createEvent);
router.get('', eventController.getEvents);
router.get('/user/:userId', eventController.getEventsByCreator);
router.get('/:id', eventController.getEvent);
router.put('/:id', checkAuth, upload.single('image'), eventController.updateEvent);
router.delete('/:id', checkAuth, eventController.deleteEvent);

module.exports = router; 