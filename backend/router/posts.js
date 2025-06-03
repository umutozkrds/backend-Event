const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/auth');
const eventController = require('../controllers/event');

router.post('', checkAuth, eventController.createEvent);
router.get('', eventController.getEvents);
router.get('/user/:userId', eventController.getEventsByCreator);
router.get('/:id', eventController.getEvent);
router.put('/:id', checkAuth, eventController.updateEvent);
router.delete('/:id', checkAuth, eventController.deleteEvent);

module.exports = router;
