import React from 'react';

const MetricCard = ({ title, value, subtext, type = 'default' }) => {
    const isTeal = type === 'teal';

    return (
        <div className="p-6 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-midnightBlue/5 dark:border-white/10 relative overflow-hidden group transition-all duration-300 shadow-sm dark:shadow-none">
            {/* Decorative glow */}
            <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[60px] opacity-20 transition-all duration-500 group-hover:scale-150 ${isTeal ? 'bg-brightTeal' : 'bg-royalBlue'
                }`} />

            <h3 className="text-midnightBlue/40 dark:text-white/50 text-[10px] font-bold uppercase tracking-widest mb-4 relative z-10 transition-colors">{title}</h3>

            <div className="relative z-10">
                <div className={`text-3xl font-sora font-bold mb-2 transition-colors duration-300 ${isTeal ? 'text-brightTeal drop-shadow-[0_0_10px_rgba(60,178,184,0.3)]' : 'text-midnightBlue dark:text-white'
                    }`}>
                    {value}
                </div>
                <p className="text-midnightBlue/30 dark:text-white/30 text-[10px] font-inter uppercase tracking-wide transition-colors">{subtext}</p>
            </div>

            {type === 'progress' && (
                <div className="mt-6 flex items-center justify-center">
                    <div className="relative w-24 h-24">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="transparent"
                                className="text-white/5"
                            />
                            <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="transparent"
                                strokeDasharray={251.2}
                                strokeDashoffset={251.2 * 0.3} // Example 70% progress
                                strokeLinecap="round"
                                className="text-brightTeal drop-shadow-[0_0_8px_#3CB2B8]"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-white font-sora font-bold">4.2</span>
                            <span className="text-[10px] text-white/40 uppercase">Hours</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MetricCard;
