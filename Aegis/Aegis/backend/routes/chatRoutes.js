// backend/routes/chatRoutes.js

const express = require('express');
const router = express.Router();
const { handleChatRequest } = require('../controllers/chatController');

// Define the route: when a POST request is made to '/chat', use the controller logic
router.post('/chat', handleChatRequest);

module.exports = router;