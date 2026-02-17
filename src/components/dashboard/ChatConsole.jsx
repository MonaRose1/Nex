import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatConsole = () => {
    const [messages, setMessages] = useState([
        { role: 'ai', text: 'Nex Manager online. How can I assist your hiring process today?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages([...messages, userMsg]);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'ai',
                text: 'Searching... 12 candidates found. 3 shortlisted based on your criteria.'
            }]);
        }, 1000);
    };

    return (
        <div className="bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-midnightBlue/5 dark:border-white/10 flex flex-col h-full overflow-hidden transition-all duration-300 shadow-sm dark:shadow-none">
            <div className="p-4 border-b border-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brightTeal/20 flex items-center justify-center border border-brightTeal/30 relative">
                    <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-brightTeal" />
                    <span className="text-brightTeal font-sora font-bold text-xs">NX</span>
                </div>
                <div>
                    <h2 className="text-white text-sm font-semibold">Nex Manager</h2>
                    <p className="text-[10px] text-brightTeal/70 font-bold uppercase tracking-tighter">AI Processing Active</p>
                </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-inter ${msg.role === 'user'
                            ? 'bg-royalBlue text-white rounded-tr-none shadow-lg'
                            : 'bg-white/10 text-white/80 border border-white/5 rounded-tl-none'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-midnightBlue/5 dark:border-white/5 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Talk to Nex..."
                    className="flex-1 bg-midnightBlue/5 dark:bg-white/5 border border-midnightBlue/5 dark:border-white/10 rounded-xl px-4 py-2 text-xs text-midnightBlue dark:text-white placeholder:text-midnightBlue/20 dark:placeholder:text-white/20 focus:outline-none focus:border-brightTeal/50 transition-all"
                />
                <button
                    type="submit"
                    className="bg-brightTeal text-midnightBlue rounded-xl p-2 hover:bg-brightTeal/80 transition-all hover:scale-105"
                >
                    <Send size={16} />
                </button>
            </form>
        </div>
    );
};

export default ChatConsole;
