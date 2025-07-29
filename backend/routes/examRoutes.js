const express = require('express');
const { insertQuestions, getQuestions } = require('../controllers/examController');
const { authenticateToken } = require('./authMiddleware'); // Import authentication middleware
const router = express.Router();

// Only allow authenticated users to get questions
router.post('/insert-questions', authenticateToken, insertQuestions);  // For inserting questions, requires authentication
router.get('/questions', authenticateToken, getQuestions);             // For fetching questions, requires authentication

module.exports = router;
