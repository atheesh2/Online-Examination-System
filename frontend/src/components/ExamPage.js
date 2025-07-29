import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Timer from './Timer';
import { useNavigate } from 'react-router-dom';
import './Exam.css';

const ExamPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/login');
    }, [navigate]);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const token = localStorage.getItem('token');
                if (!token) return navigate('/login');
                const response = await axios.get('https://online-examination-system-uje7.onrender.com/api/exams/questions', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const initializedQuestions = response.data.map(q => ({ ...q, userAnswer: null }));
                setQuestions(initializedQuestions);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        }
        fetchQuestions();
    }, [navigate]);

    const currentQuestion = questions[currentQuestionIndex];

    const handleTimeUp = () => {
        setIsQuizComplete(true);
        submitResults();
    };

    const handleNextQuestion = () => {
        const updated = [...questions];
        updated[currentQuestionIndex].userAnswer = selectedAnswer;
        setQuestions(updated);

        if (selectedAnswer === currentQuestion.answer) {
            setScore(prev => prev + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
        } else {
            setIsQuizComplete(true);
            submitResults();
        }
    };

    const submitResults = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            if (!userId || !token) throw new Error("Missing userId or token.");
            const response = await axios.post(
                'http://localhost:5000/api/results/',
                { userId, score, totalQuestions: questions.length },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            if (response.status === 201) console.log('Results saved successfully!');
        } catch (error) {
            console.error('Error submitting results:', error);
            alert(`Error: ${error.message}`);
        }
    };

    if (isQuizComplete) {
        return (
            <div className="exam-container">
                <h2>Quiz Complete!</h2>
                <p>Your score: {score} out of {questions.length}</p>
            </div>
        );
    }

    return (
        <div className="exam-wrapper">
            {/* Sidebar */}
            <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? '❮' : '❯'}
                </div>
                {sidebarOpen && (
                    <div className="question-panel">
                        <div className="panel-header">
                            <h4>Questions</h4>
                        </div>
                        <div className="panel-body">
                            {questions.map((_, index) => (
                                <button
                                    key={index}
                                    className={`question-number ${currentQuestionIndex === index ? 'active' : ''} ${questions[index].userAnswer ? 'answered' : ''}`}
                                    onClick={() => {
                                        setCurrentQuestionIndex(index);
                                        setSelectedAnswer(questions[index].userAnswer);
                                    }}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Timer */}
            <div className="timer-box">
                <Timer duration={300} onTimeUp={handleTimeUp} />
            </div>

            {/* Main content */}
            <div className="main-content">
                <div className="header">
                    <h1>Online Examination</h1>
                    <p>Test your knowledge</p>
                </div>

                <div className="question-box">
                    <h3>Question {currentQuestionIndex + 1}</h3>
                    <p className="question-text">{currentQuestion?.questionText}</p>

                    <div className="options">
                        {currentQuestion?.options.map((option, index) => (
                            <label
                                key={index}
                                className={`option-box ${selectedAnswer === option ? 'selected' : ''}`}
                            >
                                <input
                                    type="radio"
                                    name="answer"
                                    value={option}
                                    checked={selectedAnswer === option}
                                    onChange={() => setSelectedAnswer(option)}
                                />
                                <div className="option-content">
                                    <div className="option-index">{String.fromCharCode(65 + index)}</div>
                                    <div className="option-text">{option}</div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    className="next-button"
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                >
                    {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default ExamPage;
