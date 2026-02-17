import React from 'react';

const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
            {/* Dynamic Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-royalBlue/20 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-brightTeal/10 rounded-full blur-[100px] -z-10"></div>

            <div className="text-center relative z-10 max-w-5xl px-4 animate-fade-in-up">
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 font-sora leading-tight tracking-tight">
                    <span className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 dark:from-white dark:via-softWhite dark:to-slate-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300">
                        Nex:
                    </span> <br className="md:hidden" />
                    <span className="bg-gradient-to-r from-royalBlue-dark dark:from-royalBlue to-brightTeal-dark dark:to-brightTeal bg-clip-text text-transparent text-glow">
                        The Future of Hiring
                    </span>
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-slate-950 dark:text-slate-300 mb-10 font-medium max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
                    24/7 AI-driven recruitment that replaces high overhead with <span className="text-brightTeal-dark dark:text-brightTeal font-bold">high performance</span>.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full transition-all duration-300 hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-r from-royalBlue-dark dark:from-royalBlue to-brightTeal-dark dark:to-brightTeal opacity-20 dark:opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        <div className="absolute inset-0 border border-brightTeal-dark/40 dark:border-brightTeal/50 rounded-full box-glow"></div>
                        <span className="relative z-10 font-sora font-bold text-lg flex items-center gap-2 text-slate-950 dark:text-white transition-colors">
                            Start Free Trial
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                        </span>
                    </button>

                    <button className="px-8 py-4 text-slate-600 dark:text-slate-300 font-bold hover:text-midnightBlue dark:hover:text-white transition-colors flex items-center gap-2">
                        <svg className="w-5 h-5 text-brightTeal-dark dark:text-brightTeal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Watch Demo
                    </button>
                </div>
            </div>

            <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
        </section>
    );
};

export default Hero;
