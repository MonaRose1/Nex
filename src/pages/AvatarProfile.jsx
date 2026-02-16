import React, { useState, useRef, useEffect } from 'react';
import { Camera, Mic, Volume2, VolumeX, Send, Award, AlertCircle, CheckCircle, XCircle, Loader, Clock, BarChart3, TrendingUp, CheckSquare, MessageSquare, ThumbsUp } from 'lucide-react';

const AvatarInterview = () => {
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isInterviewActive, setIsInterviewActive] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isMuted, setIsMuted] = useState(false);
    const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [answerTimer, setAnswerTimer] = useState(null);
    
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const recognitionRef = useRef(null);
    const synthesisRef = useRef(window.speechSynthesis);

    // 3 completely different interview questions
    const questions = [
        {
            id: 1,
            question: "What is React and why is it popular?",
            category: "React Basics",
            difficulty: "Easy",
            keywords: ['library', 'ui', 'components', 'javascript', 'virtual dom', 'facebook', 'reusable'],
            correctAnswer: "React is a JavaScript library for building user interfaces. It's popular because of its component-based architecture, virtual DOM for performance, and strong community support from Facebook.",
            idealPoints: [
                "JavaScript library for UI",
                "Component-based architecture",
                "Virtual DOM for performance",
                "Created and maintained by Facebook",
                "Large ecosystem and community"
            ]
        },
        {
            id: 2,
            question: "What is the difference between var, let, and const in JavaScript?",
            category: "JavaScript",
            difficulty: "Medium",
            keywords: ['var', 'let', 'const', 'scope', 'redeclare', 'reassign', 'block', 'function', 'hoisting'],
            correctAnswer: "var is function-scoped and can be redeclared and updated. let is block-scoped and can be updated but not redeclared. const is block-scoped and cannot be updated or redeclared.",
            idealPoints: [
                "var is function-scoped",
                "let and const are block-scoped",
                "var can be redeclared and updated",
                "let can be updated but not redeclared",
                "const cannot be updated or redeclared",
                "var variables are hoisted"
            ]
        },
        {
            id: 3,
            question: "Explain the concept of closures in JavaScript with an example.",
            category: "Advanced JS",
            difficulty: "Hard",
            keywords: ['closure', 'function', 'inner', 'outer', 'scope', 'variables', 'remember', 'access', 'private'],
            correctAnswer: "A closure is a function that has access to variables from its outer (enclosing) scope even after the outer function has returned. It's created when an inner function is returned from an outer function.",
            idealPoints: [
                "Function with access to outer scope",
                "Inner function returned from outer",
                "Remembers variables even after outer returns",
                "Used for data privacy",
                "Creates private variables",
                "Common in event handlers and callbacks"
            ]
        }
    ];

    // Initialize speech recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setUserAnswer(transcript);
                setIsListening(false);
                clearTimer();
                analyzeAnswer(transcript);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsProcessing(false);
                setIsListening(false);
                clearTimer();
                
                if (event.error === 'no-speech') {
                    handleNoAnswer();
                }
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }

        // Load voices
        const loadVoices = () => {
            synthesisRef.current.getVoices();
        };
        
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

    // Camera control
    const toggleCamera = async () => {
        if (!isCameraOn) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: true, 
                    audio: true 
                });
                
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                streamRef.current = stream;
                setIsCameraOn(true);
            } catch (err) {
                console.error("Error accessing camera:", err);
                alert("Please allow camera and microphone access");
            }
        } else {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
            setIsCameraOn(false);
        }
    };

    // Text to speech function
    const speakText = (text, callback) => {
        if (isMuted) {
            if (callback) callback();
            return;
        }

        synthesisRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        
        // Select a good voice
        const voices = synthesisRef.current.getVoices();
        const preferredVoice = voices.find(voice => 
            voice.name.includes('Google UK') || 
            voice.name.includes('Microsoft David') || 
            voice.name.includes('Samantha')
        );
        
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        utterance.onstart = () => setIsAvatarSpeaking(true);
        utterance.onend = () => {
            setIsAvatarSpeaking(false);
            if (callback) callback();
        };
        utterance.onerror = () => {
            setIsAvatarSpeaking(false);
            if (callback) callback();
        };

        synthesisRef.current.speak(utterance);
    };

    // Timer functions
    const startTimer = () => {
        setTimeLeft(15);
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    if (isListening) {
                        recognitionRef.current?.stop();
                        handleNoAnswer();
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        setAnswerTimer(timer);
    };

    const clearTimer = () => {
        if (answerTimer) {
            clearInterval(answerTimer);
            setAnswerTimer(null);
        }
    };

    // Start interview
    const startInterview = () => {
        if (!isCameraOn) {
            alert("Please turn on camera first!");
            return;
        }

        setIsInterviewActive(true);
        setCurrentQuestion(0);
        setScore(0);
        setAnswers([]);
        setFeedback(null);
        setShowAnalytics(false);
        
        setTimeout(() => {
            askQuestion(0);
        }, 1000);
    };

    // Ask question
    const askQuestion = (index) => {
        const q = questions[index];
        setFeedback(null);
        setUserAnswer('');
        
        speakText(`Question ${index + 1}: ${q.question}`, () => {
            const prompt = "You have 15 seconds to answer. Please speak now.";
            speakText(prompt, () => {
                setTimeout(() => {
                    startVoiceAnswer();
                    startTimer();
                }, 500);
            });
        });
    };

    // Start voice recognition
    const startVoiceAnswer = () => {
        if (recognitionRef.current && !isProcessing && !isAvatarSpeaking) {
            setIsProcessing(true);
            setIsListening(true);
            recognitionRef.current.start();
        }
    };

    // Handle no answer
    const handleNoAnswer = () => {
        clearTimer();
        const timeUpMessage = "Time's up! No answer detected. ";
        const q = questions[currentQuestion];
        
        const feedbackData = {
            correctness: 'incorrect',
            matchedKeywords: [],
            missingKeywords: q.keywords,
            matchPercentage: 0,
            score: 0,
            expectedPoints: q.idealPoints,
            correctAnswer: q.correctAnswer,
            remarks: "No answer provided. Time expired."
        };
        
        setFeedback(feedbackData);
        setIsProcessing(false);
        
        // Save answer
        setAnswers(prev => [...prev, {
            question: q.question,
            answer: "[No answer provided]",
            feedback: feedbackData,
            timestamp: new Date().toISOString()
        }]);
        
        speakText(timeUpMessage + "The correct answer is: " + q.correctAnswer, () => {
            setTimeout(() => {
                speakText("Moving to next question.", () => {
                    setTimeout(() => {
                        moveToNextQuestion();
                    }, 1000);
                });
            }, 2000);
        });
    };

    // Analyze answer with advanced matching
    const analyzeAnswer = (answer) => {
        clearTimer();
        const q = questions[currentQuestion];
        const answerLower = answer.toLowerCase();
        
        // Smart keyword matching
        const matchedKeywords = q.keywords.filter(keyword => {
            const keywordLower = keyword.toLowerCase();
            // Exact match
            if (answerLower.includes(keywordLower)) return true;
            // Partial matches for common variations
            if (keywordLower.endsWith('ing') && answerLower.includes(keywordLower.slice(0, -3))) return true;
            if (keywordLower.endsWith('ed') && answerLower.includes(keywordLower.slice(0, -2))) return true;
            if (keywordLower.endsWith('s') && answerLower.includes(keywordLower.slice(0, -1))) return true;
            return false;
        });
        
        // Remove duplicates
        const uniqueMatchedKeywords = [...new Set(matchedKeywords)];
        const matchPercentage = (uniqueMatchedKeywords.length / q.keywords.length) * 100;
        
        // Determine correctness
        let correctness = 'incorrect';
        let scoreIncrement = 0;
        let feedbackMessage = '';
        let remarks = '';
        
        if (matchPercentage >= 70) {
            correctness = 'correct';
            scoreIncrement = 10;
            feedbackMessage = "Excellent answer! You've covered all the key points perfectly. ";
            remarks = "Outstanding! Perfect understanding of the concept.";
        } else if (matchPercentage >= 50) {
            correctness = 'partial';
            scoreIncrement = 6;
            feedbackMessage = "Good attempt! You're on the right track. ";
            remarks = "Decent answer but missing some important details.";
        } else if (matchPercentage >= 30) {
            correctness = 'partial';
            scoreIncrement = 3;
            feedbackMessage = "You have some understanding, but need more depth. ";
            remarks = "Basic understanding shown but needs improvement.";
        } else {
            correctness = 'incorrect';
            scoreIncrement = 0;
            feedbackMessage = "That's not quite right. ";
            remarks = "Answer is incorrect or doesn't match the expected response.";
        }

        const feedbackData = {
            correctness,
            matchedKeywords: uniqueMatchedKeywords,
            missingKeywords: q.keywords.filter(k => !answerLower.includes(k.toLowerCase())),
            matchPercentage,
            score: scoreIncrement,
            expectedPoints: q.idealPoints,
            correctAnswer: q.correctAnswer,
            userAnswer: answer,
            remarks
        };

        setFeedback(feedbackData);
        setScore(prev => prev + scoreIncrement);
        
        setAnswers(prev => [...prev, {
            question: q.question,
            answer,
            feedback: feedbackData,
            timestamp: new Date().toISOString()
        }]);

        setIsProcessing(false);

        // Speak feedback
        let fullFeedback = feedbackMessage;
        if (correctness !== 'correct') {
            fullFeedback += "The correct answer is: " + q.correctAnswer + ". ";
        }
        
        if (currentQuestion < questions.length - 1) {
            fullFeedback += "Moving to next question.";
        } else {
            fullFeedback += "This was your last question. Interview completed!";
        }

        speakText(fullFeedback, () => {
            setTimeout(() => {
                moveToNextQuestion();
            }, 2000);
        });
    };

    // Move to next question
    const moveToNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            const nextIndex = currentQuestion + 1;
            setCurrentQuestion(nextIndex);
            askQuestion(nextIndex);
        } else {
            // End interview and show analytics
            setIsInterviewActive(false);
            setShowAnalytics(true);
            
            const totalPossibleScore = questions.length * 10;
            const percentage = (score / totalPossibleScore) * 100;
            
            let finalRemark = "";
            if (percentage >= 80) {
                finalRemark = "🌟 Excellent performance! You have strong knowledge!";
            } else if (percentage >= 60) {
                finalRemark = "👍 Good job! Keep practicing to improve further.";
            } else if (percentage >= 40) {
                finalRemark = "📚 Fair attempt. Review the concepts and try again.";
            } else {
                finalRemark = "💪 Needs improvement. Study the fundamentals and practice more.";
            }
            
            const finalMessage = `Interview completed! Your final score is ${score} out of ${totalPossibleScore}. ${finalRemark}`;
            speakText(finalMessage);
        }
    };

    // Submit typed answer
    const submitTypedAnswer = () => {
        if (userAnswer.trim() && !isProcessing) {
            clearTimer();
            if (isListening) {
                recognitionRef.current?.stop();
            }
            analyzeAnswer(userAnswer);
        }
    };

    // Cleanup
    useEffect(() => {
        return () => {
            clearTimer();
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            synthesisRef.current.cancel();
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, []);

    // Calculate analytics
    const getAnalytics = () => {
        const totalQuestions = answers.length;
        const correctAnswers = answers.filter(a => a.feedback.correctness === 'correct').length;
        const partialAnswers = answers.filter(a => a.feedback.correctness === 'partial').length;
        const incorrectAnswers = answers.filter(a => a.feedback.correctness === 'incorrect').length;
        const avgMatch = answers.reduce((acc, a) => acc + a.feedback.matchPercentage, 0) / totalQuestions || 0;
        const totalPossible = questions.length * 10;
        const percentage = (score / totalPossible) * 100;
        
        let overallRemark = "";
        if (percentage >= 80) {
            overallRemark = "🌟 Excellent! You're well-prepared!";
        } else if (percentage >= 60) {
            overallRemark = "👍 Good! Keep learning!";
        } else if (percentage >= 40) {
            overallRemark = "📚 Fair. Needs more study.";
        } else {
            overallRemark = "💪 Needs improvement. Try again!";
        }
        
        return {
            totalQuestions,
            correctAnswers,
            partialAnswers,
            incorrectAnswers,
            avgMatch: Math.round(avgMatch),
            totalScore: score,
            totalPossible,
            percentage: Math.round(percentage),
            overallRemark
        };
    };

    const analytics = getAnalytics();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0F1F] to-[#1A1F35] p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                            🤖 AI Interview Avatar
                            {isInterviewActive && (
                                <span className="text-sm bg-green-500/20 text-green-400 px-3 py-1 rounded-full animate-pulse">
                                    Q{currentQuestion + 1}/{questions.length}
                                </span>
                            )}
                            {showAnalytics && (
                                <span className="text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                                    Results
                                </span>
                            )}
                        </h1>
                        <p className="text-white/50 text-sm mt-1">3 questions • Real-time evaluation</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 px-4 py-2 rounded-xl">
                            <span className="text-white/50 mr-2">Score:</span>
                            <span className="text-[#3CB2B8] font-bold text-xl">{score}/30</span>
                        </div>
                        
                        <button
                            onClick={toggleCamera}
                            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                                isCameraOn 
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                    : 'bg-white/10 text-white/70 border border-white/10'
                            }`}
                        >
                            <Camera size={18} />
                            {isCameraOn ? 'Camera On' : 'Camera Off'}
                        </button>
                        
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="p-2 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 transition-all"
                        >
                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Video Section */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
                            <div className="relative aspect-video bg-gray-900">
                                {isCameraOn ? (
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#2A2A5A] to-[#3CB2B8] flex items-center justify-center">
                                                <span className="text-4xl">🤖</span>
                                            </div>
                                            <p className="text-white/50">Turn on camera to start</p>
                                        </div>
                                    </div>
                                )}
                                
                                {/* AI Speaking Indicator */}
                                {isAvatarSpeaking && (
                                    <div className="absolute top-4 left-4 bg-[#3CB2B8] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                        AI is speaking...
                                    </div>
                                )}
                                
                                {/* Listening Indicator */}
                                {isListening && (
                                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                        <Clock size={16} />
                                        <span className="font-bold">{timeLeft}s</span>
                                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                        Listening...
                                    </div>
                                )}
                            </div>

                            {/* Controls */}
                            <div className="p-4 border-t border-white/10">
                                {!isInterviewActive && !showAnalytics ? (
                                    <button
                                        onClick={startInterview}
                                        disabled={!isCameraOn}
                                        className={`w-full py-3 rounded-xl font-medium text-lg ${
                                            isCameraOn
                                                ? 'bg-gradient-to-r from-green-500 to-[#3CB2B8] text-white hover:shadow-lg hover:scale-[1.02] transition-all'
                                                : 'bg-white/10 text-white/30 cursor-not-allowed'
                                        }`}
                                    >
                                        🎯 Start Interview
                                    </button>
                                ) : isInterviewActive ? (
                                    <button
                                        onClick={startVoiceAnswer}
                                        disabled={isProcessing || isAvatarSpeaking || isListening}
                                        className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 text-lg ${
                                            isProcessing || isListening
                                                ? 'bg-yellow-500/20 text-yellow-400'
                                                : 'bg-[#3CB2B8] text-white hover:bg-[#2A8A8F] hover:scale-[1.02] transition-all'
                                        }`}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader size={20} className="animate-spin" />
                                                Analyzing...
                                            </>
                                        ) : isListening ? (
                                            <>
                                                <Mic size={20} className="animate-pulse" />
                                                Listening... {timeLeft}s
                                            </>
                                        ) : (
                                            <>
                                                <Mic size={20} />
                                                Click & Speak Answer
                                            </>
                                        )}
                                    </button>
                                ) : null}
                            </div>
                        </div>

                        {/* Current Question */}
                        {isInterviewActive && (
                            <div className="bg-gradient-to-r from-[#2A2A5A]/30 to-[#3CB2B8]/30 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#3CB2B8] flex items-center justify-center text-2xl flex-shrink-0">
                                        🤖
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs bg-white/10 text-white/70 px-2 py-1 rounded-full">
                                                {questions[currentQuestion].category}
                                            </span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                questions[currentQuestion].difficulty === 'Hard' 
                                                    ? 'bg-red-500/20 text-red-400'
                                                    : questions[currentQuestion].difficulty === 'Medium'
                                                    ? 'bg-yellow-500/20 text-yellow-400'
                                                    : 'bg-green-500/20 text-green-400'
                                            }`}>
                                                {questions[currentQuestion].difficulty}
                                            </span>
                                        </div>
                                        <p className="text-white text-xl font-medium">
                                            {questions[currentQuestion].question}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Analytics Section */}
                        {showAnalytics && (
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                        <BarChart3 className="text-[#3CB2B8]" />
                                        Interview Results
                                    </h2>
                                    <div className="bg-[#3CB2B8]/20 px-4 py-2 rounded-full">
                                        <span className="text-[#3CB2B8] font-bold">{analytics.percentage}%</span>
                                    </div>
                                </div>
                                
                                {/* Overall Remark */}
                                <div className="bg-gradient-to-r from-[#2A2A5A]/40 to-[#3CB2B8]/40 rounded-xl p-4 mb-6 text-center">
                                    <p className="text-white text-lg font-semibold">{analytics.overallRemark}</p>
                                </div>
                                
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gradient-to-br from-[#2A2A5A]/20 to-[#3CB2B8]/20 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp size={20} className="text-[#3CB2B8]" />
                                            <p className="text-white/70 text-sm">Final Score</p>
                                        </div>
                                        <p className="text-3xl font-bold text-white">{score}/{analytics.totalPossible}</p>
                                    </div>
                                    
                                    <div className="bg-gradient-to-br from-[#2A2A5A]/20 to-[#3CB2B8]/20 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckSquare size={20} className="text-green-400" />
                                            <p className="text-white/70 text-sm">Accuracy</p>
                                        </div>
                                        <p className="text-3xl font-bold text-white">{analytics.percentage}%</p>
                                    </div>
                                </div>

                                {/* Answer Breakdown */}
                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    <div className="bg-green-500/10 rounded-xl p-3 text-center">
                                        <CheckCircle className="text-green-400 mx-auto mb-1" size={24} />
                                        <p className="text-white font-bold">{analytics.correctAnswers}</p>
                                        <p className="text-white/50 text-xs">Correct</p>
                                    </div>
                                    <div className="bg-yellow-500/10 rounded-xl p-3 text-center">
                                        <AlertCircle className="text-yellow-400 mx-auto mb-1" size={24} />
                                        <p className="text-white font-bold">{analytics.partialAnswers}</p>
                                        <p className="text-white/50 text-xs">Partial</p>
                                    </div>
                                    <div className="bg-red-500/10 rounded-xl p-3 text-center">
                                        <XCircle className="text-red-400 mx-auto mb-1" size={24} />
                                        <p className="text-white font-bold">{analytics.incorrectAnswers}</p>
                                        <p className="text-white/50 text-xs">Incorrect</p>
                                    </div>
                                </div>

                                <h3 className="text-white font-semibold mb-3">Question Review</h3>
                                <div className="space-y-3">
                                    {answers.map((ans, idx) => (
                                        <div key={idx} className="bg-white/5 rounded-xl p-3">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-white/50 text-xs">Q{idx + 1}: {questions[idx].category}</span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${
                                                    ans.feedback.correctness === 'correct'
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : ans.feedback.correctness === 'partial'
                                                        ? 'bg-yellow-500/20 text-yellow-400'
                                                        : 'bg-red-500/20 text-red-400'
                                                }`}>
                                                    {Math.round(ans.feedback.matchPercentage)}% Match
                                                </span>
                                            </div>
                                            <p className="text-white/70 text-sm mb-1">You: "{ans.answer}"</p>
                                            <p className="text-white/50 text-xs italic">{ans.feedback.remarks}</p>
                                        </div>
                                    ))}
                                </div>
                                
                                <button
                                    onClick={() => {
                                        setShowAnalytics(false);
                                        setCurrentQuestion(0);
                                        setScore(0);
                                        setAnswers([]);
                                    }}
                                    className="w-full mt-6 bg-gradient-to-r from-[#3CB2B8] to-[#2A2A5A] text-white py-3 rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                >
                                    <ThumbsUp size={18} />
                                    Start New Interview
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Feedback Section */}
                    <div className="space-y-4">
                        {/* Answer Input */}
                        {isInterviewActive && (
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                                <h3 className="text-white font-semibold mb-3">Your Answer</h3>
                                <textarea
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="Type your answer here..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#3CB2B8] h-24"
                                />
                                <button
                                    onClick={submitTypedAnswer}
                                    disabled={!userAnswer.trim() || isProcessing || isListening}
                                    className="w-full mt-2 bg-[#3CB2B8] text-white py-2 rounded-xl hover:bg-[#2A8A8F] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Submit Answer
                                </button>
                            </div>
                        )}

                        {/* Real-time Feedback */}
                        {feedback && (
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                                    <Award size={18} className="text-[#3CB2B8]" />
                                    Feedback
                                </h3>
                                
                                <div className={`mb-4 p-3 rounded-xl ${
                                    feedback.correctness === 'correct' 
                                        ? 'bg-green-500/20 border border-green-500/30'
                                        : feedback.correctness === 'partial'
                                        ? 'bg-yellow-500/20 border border-yellow-500/30'
                                        : 'bg-red-500/20 border border-red-500/30'
                                }`}>
                                    <p className="text-white font-medium">
                                        {feedback.correctness === 'correct' ? '✅ Correct!' : 
                                         feedback.correctness === 'partial' ? '⚠️ Partially Correct' : 
                                         '❌ Incorrect'}
                                    </p>
                                    <p className="text-white/70 text-sm mt-1">Score: +{feedback.score}</p>
                                </div>

                                <p className="text-white/70 text-sm mb-2 italic">"{feedback.remarks}"</p>

                                {feedback.correctness !== 'correct' && (
                                    <div className="mt-3 p-2 bg-blue-500/20 rounded-lg">
                                        <p className="text-blue-400 text-sm font-medium">Correct answer:</p>
                                        <p className="text-white/70 text-xs mt-1">{feedback.correctAnswer}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvatarInterview;