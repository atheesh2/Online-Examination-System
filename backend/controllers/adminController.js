const User = require('../models/User');
const Result = require('../models/Result');
const Question = require('../models/Question');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

exports.getResults = async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching results' });
  }
};

exports.manageQuestions = async (req, res) => {
  const { method } = req;
  const { questionText, options, answer } = req.body;
  const questionId = req.params.id;

  try {
    if (method === 'POST') {
      // Add a new question
      const newQuestion = new Question({ questionText, options, answer });
      await newQuestion.save();
      res.status(201).json(newQuestion);
    } else if (method === 'PUT') {
      // Update an existing question
      const updatedQuestion = await Question.findByIdAndUpdate(questionId, { questionText, options, answer }, { new: true });
      res.json(updatedQuestion);
    } else if (method === 'DELETE') {
      // Delete a question
      await Question.findByIdAndDelete(questionId);
      res.status(204).json({ message: 'Question deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error managing questions' });
  }
};
