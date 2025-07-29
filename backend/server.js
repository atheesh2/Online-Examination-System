const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const examRoutes = require('./routes/examRoutes');
const Question = require('./models/Question');
const authRoutes = require('./routes/authRoutes');
const resultRoutes = require('./routes/resultRoutes');
const adminRoutes = require('./routes/adminRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log('Connected to MongoDB');
  insertInitialQuestions(); // Call function to insert questions on startup
})
.catch((error) => console.error('MongoDB connection error:', error));

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api', resultRoutes);

app.use('/api/admin', adminRoutes);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all to serve React's index.html on unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Function to insert initial questions if they don't already exist
async function insertInitialQuestions() {
  try {
    // Check if questions already exist in the database
    const questionCount = await Question.countDocuments();

    if (questionCount === 0) {  // Only insert if no questions exist
      const initialQuestions = [
        {
          questionText: "What is the output of `console.log(2 + '2')`?",
          options: ["4", "'22'", "'4'", "NaN"],
          answer: "'22'"
        },
        {
          questionText: "Which of the following is not a primitive data type in JavaScript?",
          options: ["String", "Number", "Object", "Boolean"],
          answer: "Object"
        },
        {
          questionText: "What is the purpose of the `let` keyword in JavaScript?",
          options: [
            "Defines a variable that cannot be changed",
            "Defines a constant variable",
            "Defines a block-scoped variable",
            "Defines a globally scoped variable"
          ],
          answer: "Defines a block-scoped variable"
        },
        {
          questionText: "Which method is used to add elements to the end of an array in JavaScript?",
          options: ["push()", "pop()", "shift()", "unshift()"],
          answer: "push()"
        },
        {
          questionText: "Which of the following is used to declare a constant in JavaScript?",
          options: ["var", "let", "const", "constant"],
          answer: "const"
        },
        {
          questionText: "What is the output of `typeof null` in JavaScript?",
          options: ["'null'", "'object'", "'undefined'", "'number'"],
          answer: "'object'"
        },
        {
          questionText: "What is a closure in JavaScript?",
          options: [
            "A function that calls another function",
            "A function that has access to its own scope, the scope in which it was created, and the global scope",
            "A type of loop",
            "A type of variable"
          ],
          answer: "A function that has access to its own scope, the scope in which it was created, and the global scope"
        },
        {
          questionText: "Which function is used to parse a string into an integer in JavaScript?",
          options: ["parseInt()", "parseFloat()", "toInteger()", "parseString()"],
          answer: "parseInt()"
        },
        {
          questionText: "How do you create a new object in JavaScript?",
          options: [
            "var obj = {};",
            "var obj = Object();",
            "var obj = new Object();",
            "All of the above"
          ],
          answer: "All of the above"
        },
        {
          questionText: "What will `console.log(!!'false')` output?",
          options: ["true", "false", "undefined", "NaN"],
          answer: "true"
        },
        {
          questionText: "What does the `==` operator do in JavaScript?",
          options: [
            "Compares both value and type of two variables",
            "Compares only the value of two variables",
            "Compares only the type of two variables",
            "Assigns a value to a variable"
          ],
          answer: "Compares only the value of two variables"
        },
        {
          questionText: "Which method is used to remove the last element from an array in JavaScript?",
          options: ["pop()", "shift()", "splice()", "unshift()"],
          answer: "pop()"
        },
        {
          questionText: "How do you add a comment in JavaScript?",
          options: [
            "// This is a comment",
            "# This is a comment",
            "/* This is a comment */",
            "All of the above"
          ],
          answer: "// This is a comment"
        },
        {
          questionText: "What is the correct syntax to create a function in JavaScript?",
          options: [
            "function myFunction() {}",
            "function:myFunction() {}",
            "create function myFunction() {}",
            "None of the above"
          ],
          answer: "function myFunction() {}"
        },
        {
          questionText: "Which of the following is the correct way to write a JavaScript array?",
          options: [
            "[1, 2, 3]",
            "{1, 2, 3}",
            "(1, 2, 3)",
            "None of the above"
          ],
          answer: "[1, 2, 3]"
        },
        {
          questionText: "What is the capital of France?",
          options: ['Paris', 'London', 'Rome', 'Berlin'],
          answer: 'Paris'
        }
      ];

      // Insert initial questions into the database
      await Question.insertMany(initialQuestions);
      console.log('Initial questions inserted into the database');
    } else {
      console.log('Questions already exist in the database');
    }
  } catch (error) {
    console.error('Error inserting initial questions:', error);
  }
}
