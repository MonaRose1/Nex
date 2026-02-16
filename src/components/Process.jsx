import React from 'react';

const steps = [
    {
        number: '01',
        title: 'Automated Screening',
        description: 'AI parses thousands of resumes instantly, ranking candidates by relevance and skill match.',
    },
    {
        number: '02',
        title: 'AI Interviewing',
        description: 'Conduct asynchronous video interviews analyzed for soft skills, tone, and technical competency.',
    },
    {
        number: '03',
        title: 'Instant Shortlisting',
        description: 'Receive a curated list of the top 1% of talent ready for final human review.',
    }
];

const Process = () => {
    return (
        <section id="process" className="min-h-screen py-20 flex flex-col justify-center items-center relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royalBlue/5 rounded-full blur-[120px] -z-10"></div>

            <div className="text-center mb-16 relative z-10 px-4">
                <h2 className="text-3xl md:text-5xl font-bold font-sora mb-6">
                    From Sourcing to <span className="text-brightTeal">Signing</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    A seamless, autonomous pipeline designed for speed and precision.
                </p>
            </div>

            <div className="relative max-w-4xl w-full px-4">
                {/* Vertical Pulse Line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-brightTeal/50 to-transparent -translate-x-1/2 hidden md:block"></div>
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-brightTeal/50 to-transparent -translate-x-1/2 md:hidden"></div>

                <div className="flex flex-col gap-12 sm:gap-24 relative">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Content Card */}
                            <div className="w-full md:w-1/2">
                                <div className="glass p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300 relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-royalBlue to-brightTeal rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
                                    <div className="relative z-10">
                                        <span className="text-6xl font-bold font-sora text-white/5 absolute -top-8 -right-4 select-none">
                                            {step.number}
                                        </span>
                                        <h3 className="text-2xl font-bold font-sora mb-4 text-white">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-400 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline Node */}
                            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-midnightBlue border-2 border-brightTeal shadow-[0_0_15px_rgba(60,178,184,0.5)] z-20">
                                <div className="w-2 h-2 bg-brightTeal rounded-full animate-pulse"></div>
                            </div>

                            {/* Spacer for alternating layout */}
                            <div className="hidden md:block w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
