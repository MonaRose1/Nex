import React from 'react';

const NexScore = ({ score = 98 }) => {
    return (
        <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 flex flex-col items-center justify-center relative overflow-hidden group">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-brightTeal/5 to-royalBlue/5 opacity-50" />

            <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4 relative z-10">Nex Score</h3>

            <div className="relative z-10">
                <div className="text-6xl font-sora font-extrabold text-brightTeal drop-shadow-[0_0_20px_#3CB2B8] animate-pulse-slow">
                    {score}
                </div>
                <div className="absolute -bottom-2 -right-4 text-white/20 font-sora font-bold text-xl italic">/100</div>
            </div>

            <div className="mt-4 px-4 py-1 bg-brightTeal/10 rounded-full border border-brightTeal/20 relative z-10">
                <span className="text-[10px] text-brightTeal font-bold uppercase tracking-widest">High Confidence</span>
            </div>
        </div>
    );
};

export default NexScore;
