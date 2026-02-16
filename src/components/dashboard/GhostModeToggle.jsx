import React, { useState } from 'react';

const GhostModeToggle = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 flex items-center justify-between group">
            <div>
                <h3 className="text-white text-sm font-semibold mb-1">Ghost Mode</h3>
                <p className="text-[10px] text-white/40 font-inter uppercase tracking-wide">Autonomous AI Interviewing</p>
            </div>

            <button
                onClick={() => setIsActive(!isActive)}
                className={`w-14 h-7 rounded-full p-1 transition-all duration-500 relative ${isActive ? 'bg-brightTeal shadow-[0_0_15px_#3CB2B8]' : 'bg-white/10'
                    }`}
            >
                <div className={`w-5 h-5 rounded-full bg-white transition-all duration-500 transform ${isActive ? 'translate-x-7' : 'translate-x-0'
                    }`} />

                {isActive && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-full text-center">
                        <div className="text-[8px] font-bold text-midnightBlue uppercase animate-pulse">Active</div>
                    </div>
                )}
            </button>
        </div>
    );
};

export default GhostModeToggle;
