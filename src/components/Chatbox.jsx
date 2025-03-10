import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const Chatbox = () => {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const answerRef = useRef(null);

    const generateAnswer = async () => {
        if (!question.trim()) return;
        setAnswer("Generating... ⏳");

        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
                {
                    contents: [{ parts: [{ text: question }] }]
                }
            );

            setAnswer(response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.");
        } catch (error) {
            setAnswer("⚠️ Error fetching response. Please try again.");
            console.error(error);
        }
    };

    useEffect(() => {
        if (answerRef.current) {
            answerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [answer]);

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-gray-900 to-black p-6">
            <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20">
                <h1 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">
                    Confab AI 🤖
                </h1>

              
                <textarea
                    className="w-full p-4 rounded-xl bg-gray-800 text-white text-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none shadow-md transition-all duration-300 hover:bg-gray-700 placeholder-gray-400"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question here..."
                    rows={4}
                ></textarea>

                
                <button
                    className="mt-5 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
                    onClick={generateAnswer}
                >
                    Get Answer 🚀
                </button>

               
                <div className="mt-6 p-5 bg-gray-800 text-white rounded-xl shadow-md border border-gray-700 max-h-60   overflow-y-auto scrollbar-hide">
                    <p className="text-lg leading-relaxed" ref={answerRef}>
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
