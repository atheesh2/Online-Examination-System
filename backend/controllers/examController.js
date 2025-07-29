// controllers/examController.js
const Question = require('../models/Question');

// Insert initial questions
const insertQuestions = async (req, res) => {
  try {
    const questions = req.body.questions;
    await Question.insertMany(questions);
    res.status(201).json({ message: 'Questions inserted successfully' });
  } catch (error) {
    console.error('Error inserting questions:', error);
    res.status(500).json({ message: 'Failed to insert questions', error });
  }
};

// Get all questions for the exam
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: 'No questions found' });
    }
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Failed to retrieve questions', error });
  }
};


module.exports = { insertQuestions, getQuestions };
