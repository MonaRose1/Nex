import React from 'react';
import { Bot } from 'lucide-react';

const AIAvatar = ({ isSpeaking = false }) => {
    return (
        <div className="relative flex items-center justify-center">
            {/* Outer Pulse Rings (when speaking) */}
            {isSpeaking && (
                <>
                    <div className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-royalBlue-dark/20 dark:from-royalBlue/20 to-brightTeal-dark/20 dark:to-brightTeal/20 animate-ping" />
                    <div className="absolute w-28 h-28 rounded-full bg-gradient-to-r from-royalBlue-dark/30 dark:from-royalBlue/30 to-brightTeal-dark/30 dark:to-brightTeal/30 animate-pulse" />
                </>
            )}

            {/* Main Avatar Circle */}
            <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br from-royalBlue-dark dark:from-royalBlue to-brightTeal-dark dark:to-brightTeal shadow-2xl transition-all duration-300 ${isSpeaking
                    ? 'scale-110 shadow-[0_0_40px_rgba(60,178,184,0.6)]'
                    : 'scale-100 shadow-[0_0_20px_rgba(34,123,206,0.4)] animate-pulse-slow'
                }`}>
                {/* Inner Glow */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent" />

                {/* Bot Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Bot
                        size={40}
                        className={`text-white transition-all duration-300 ${isSpeaking ? 'animate-bounce' : ''
                            }`}
                    />
                </div>

                {/* Rotating Border (when speaking) */}
                {isSpeaking && (
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-brightTeal-dark dark:from-brightTeal via-royalBlue-dark dark:via-royalBlue to-brightTeal-dark dark:to-brightTeal opacity-75 blur-sm animate-spin-slow" />
                )}
            </div>

            {/* Status Indicator */}
            <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest transition-all ${isSpeaking
                    ? 'bg-brightTeal-dark dark:bg-brightTeal text-white animate-pulse'
                    : 'bg-slate-200 dark:bg-white/10 text-slate-950 dark:text-slate-400'
                }`}>
                {isSpeaking ? 'Speaking' : 'Listening'}
            </div>
        </div>
    );
};

export default AIAvatar;
