import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const data = [
    { subject: 'Skills', A: 120, fullMark: 150 },
    { subject: 'Cultural Fit', A: 98, fullMark: 150 },
    { subject: 'Salary Expect.', A: 86, fullMark: 150 },
    { subject: 'Experience', A: 99, fullMark: 150 },
    { subject: 'Tech Depth', A: 85, fullMark: 150 },
    { subject: 'Soft Skills', A: 65, fullMark: 150 },
];

const CandidateMatchChart = () => {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Responsive font size based on screen width
    const getTickFontSize = () => {
        if (windowWidth < 480) return 7;
        if (windowWidth < 640) return 8;
        if (windowWidth < 1024) return 9;
        return 10;
    };

    // Responsive outer radius
    const getOuterRadius = () => {
        if (windowWidth < 480) return "65%";
        if (windowWidth < 640) return "70%";
        if (windowWidth < 1024) return "75%";
        return "80%";
    };

    return (
        <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/10 p-3 sm:p-4 lg:p-6 w-full">
            {/* Header with proper spacing */}
            <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="font-sora font-semibold text-sm sm:text-base lg:text-lg text-white">
                    Candidate Match
                </h2>
                <div className="bg-[#3CB2B8]/20 px-2 sm:px-3 py-1 rounded-full">
                    <span className="text-[10px] sm:text-xs text-[#3CB2B8] font-medium">
                        Overall: 92%
                    </span>
                </div>
            </div>

            {/* Chart container with fixed height and proper spacing */}
            <div className="w-full" style={{ height: '220px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={getOuterRadius()} 
                        data={data}
                        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                    >
                        <PolarGrid 
                            stroke="#ffffff15" 
                            strokeDasharray="3 3"
                        />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{ 
                                fill: '#ffffff70', 
                                fontSize: getTickFontSize(),
                                fontWeight: 500,
                            }}
                        />
                        <Radar
                            name="Candidate"
                            dataKey="A"
                            stroke="#3CB2B8"
                            fill="#3CB2B8"
                            fillOpacity={0.3}
                            animationDuration={1000}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Stats Grid - Properly separated from chart */}
            <div className="grid grid-cols-3 gap-1 sm:gap-2 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center p-1">
                        <span className="text-[8px] sm:text-[9px] lg:text-[10px] text-white/50 uppercase tracking-wider">
                            {item.subject}
                        </span>
                        <span className="text-xs sm:text-sm lg:text-base font-bold text-white mt-0.5">
                            {item.A}%
                        </span>
                        <div className="w-full h-0.5 bg-white/10 mt-1 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-[#3CB2B8] rounded-full" 
                                style={{ width: `${(item.A / 150) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CandidateMatchChart;