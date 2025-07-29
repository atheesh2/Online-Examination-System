const Result = require('../models/Result'); // Import the Result model

// Controller function to create a new result entry
const createResult = async (req, res) => {
    try {
        // Destructure the values from the request body
        const { userId, score, totalQuestions } = req.body;

        // Create a new result entry
        const newResult = new Result({
            userId,
            score,
            totalQuestions
        });

        // Save the result to the database
        await newResult.save();

        // Send success response
        return res.status(201).json({
            message: 'Result created successfully',
            result: newResult
        });
    } catch (error) {
        console.error('Error saving result:', error);
        return res.status(500).json({
            message: 'Failed to save result',
            error: error.message
        });
    }
};

module.exports = { createResult };
