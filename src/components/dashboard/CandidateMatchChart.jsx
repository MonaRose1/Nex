import React from 'react';
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
    return (
        <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 h-full flex flex-col">
            <h2 className="font-sora font-semibold text-lg text-white mb-6">Candidate Match</h2>
            <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid stroke="#ffffff10" />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: '#ffffff50', fontSize: 10, fontWeight: 'bold' }}
                        />
                        <Radar
                            name="Candidate"
                            dataKey="A"
                            stroke="#3CB2B8"
                            fill="#3CB2B8"
                            fillOpacity={0.4}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CandidateMatchChart;
