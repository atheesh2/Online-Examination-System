// Import necessary modules
const express = require('express');
const Result = require('../models/Result');  // Assuming your Result model is in 'models/Result.js'
const router = express.Router();

// POST route to handle saving results
router.post('/results', async (req, res) => {
    // Destructure the userId, score, and totalQuestions from the request body
    const { userId, score, totalQuestions } = req.body;

    // Log the received data for debugging purposes
    console.log('Received:', userId, score, totalQuestions);

    // Validate that all required fields are provided
    if (!userId || !score || !totalQuestions) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Create a new result document in MongoDB
        const newResult = new Result({
            userId,
            score,
            totalQuestions
        });

        // Save the result to the database
        await newResult.save();

        // Send a success response back to the client
        res.status(201).json({ message: 'Result saved successfully', result: newResult });
    } catch (err) {
        // If an error occurs during saving, log the error and send a failure response
        console.error('Error saving result:', err);
        res.status(500).json({ message: 'Error saving result', error: err.message });
    }
});

module.exports = router;
