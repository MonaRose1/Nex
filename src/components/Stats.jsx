import React from 'react';
import { Clock, TrendingDown, Zap } from 'lucide-react';

const GlassIcon = ({ children }) => (
    <div className="relative w-20 h-20 mb-6 flex items-center justify-center rounded-2xl glass overflow-hidden group-hover:scale-110 transition-transform duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-brightTeal/20 to-royalBlue/20 opacity-50"></div>
        <div className="relative z-10 text-brightTeal-dark dark:text-brightTeal drop-shadow-[0_0_10px_rgba(60,178,184,0.5)]">
            {React.cloneElement(children, { size: 40, strokeWidth: 1.5 })}
        </div>
        {/* Inner Highlight */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
    </div>
);

const StatCard = ({ title, value, description, icon, delay }) => {
    return (
        <div
            className="group glass-card p-8 flex flex-col items-center text-center hover:bg-white/10 relative overflow-hidden"
            style={{
                animation: `fadeInUp 0.8s ease-out forwards ${delay}s`,
                opacity: 0,
                transform: 'translateY(20px)'
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-brightTeal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* 3D Glass Effect Border */}
            <div className="absolute inset-0 border border-white/5 rounded-2xl group-hover:border-brightTeal/30 transition-colors duration-300"></div>

            <div className="relative z-10 flex flex-col items-center">
                <GlassIcon>{icon}</GlassIcon>
                <div className="text-5xl md:text-6xl font-bold font-sora bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 dark:from-white dark:to-slate-400 bg-clip-text text-transparent mb-4 drop-shadow-xl group-hover:scale-110 transition-transform duration-300">
                    {value}
                </div>
                <h3 className="text-xl font-bold text-brightTeal-dark dark:text-brightTeal mb-2">{title}</h3>
                <p className="text-slate-950 dark:text-slate-400 text-sm font-medium">{description}</p>
            </div>
        </div>
    );
};

const Stats = () => {
    return (
        <section id="stats" className="min-h-screen py-20 flex flex-col justify-center items-center relative">
            <div className="text-center mb-16 relative z-10 px-4">
                <h2 className="text-3xl md:text-5xl font-bold font-sora mb-6 text-slate-950 dark:text-white">
                    The <span className="text-brightTeal-dark dark:text-brightTeal">Nex</span> Edge
                </h2>
                <p className="text-slate-950 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                    Replacing traditional inefficiencies with autonomous intelligence.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4 relative z-10">
                <StatCard
                    icon={<TrendingDown />}
                    value="70%"
                    title="Less Cost"
                    description="Drastically reduce recruitment overhead and agency fees."
                    delay={0.2}
                />
                <StatCard
                    icon={<Zap />}
                    value="10x"
                    title="Faster Hiring"
                    description="From sourcing to shortlisting in seconds, not weeks."
                    delay={0.4}
                />
                <StatCard
                    icon={<Clock />}
                    value="0%"
                    title="Human Bias"
                    description="Purely data-driven evaluation for fair and merit-based hiring."
                    delay={0.6}
                />
            </div>

            {/* Decorative Blur */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-royalBlue/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        </section>
    );
};

export default Stats;
