import React from 'react';

const LiveScoutFeed = () => {
    const candidates = [
        { id: 1, name: 'Alex Rivera', role: 'Senior React Developer', status: 'In Interview' },
        { id: 2, name: 'Sarah Chen', role: 'AI Engineer', status: 'Analyzing Skills' },
        { id: 3, name: 'Marcus Knight', role: 'Full Stack Dev', status: 'Generating Report' },
        { id: 4, name: 'Elena Vance', role: 'Frontend Lead', status: 'In Interview' },
        { id: 5, name: 'David Miller', role: 'React Native Dev', status: 'Scheduling' },
    ];

    return (
        <div className="bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-midnightBlue/5 dark:border-white/10 p-6 h-full flex flex-col transition-all duration-300 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-sora font-semibold text-lg text-midnightBlue dark:text-white transition-colors">Live Scout</h2>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brightTeal animate-pulse" />
                    <span className="text-xs font-inter text-brightTeal font-bold uppercase tracking-wider">Live</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {candidates.map((candidate) => (
                    <div
                        key={candidate.id}
                        className="p-4 bg-midnightBlue/5 dark:bg-white/5 rounded-2xl border border-midnightBlue/5 dark:border-white/5 hover:border-brightTeal/30 transition-all duration-300 group"
                    >
                        <div className="flex justify-between items-start mb-1">
                            <span className="font-sora text-sm text-midnightBlue dark:text-white font-medium transition-colors">{candidate.name}</span>
                            <div className={`w-1.5 h-1.5 rounded-full ${candidate.status === 'In Interview' ? 'bg-brightTeal animate-pulse' : 'bg-white/20'}`} />
                        </div>
                        <p className="text-xs text-white/40 font-inter mb-2">{candidate.role}</p>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] py-1 px-2 bg-brightTeal/10 text-brightTeal rounded-lg font-bold uppercase tracking-tighter">
                                {candidate.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveScoutFeed;
