import React from 'react';

const CallToAction = () => {
    return (
        <section id="cta" className="py-32 flex items-center justify-center relative overflow-hidden">
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-royalBlue/20 via-midnightBlue to-brightTeal/20 opacity-40"></div>

            <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                <div className="glass rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden border border-white/10">
                    {/* Internal Glows */}
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brightTeal/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-royalBlue/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                    <h2 className="text-4xl md:text-6xl font-bold font-sora mb-8 relative z-10">
                        Hire the Best, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Before Anyone Else.</span>
                    </h2>

                    <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto relative z-10">
                        Join the automated revolution. Experience the future of recruitment with Nex today.
                    </p>

                    <button className="relative z-10 px-10 py-5 bg-white text-midnightBlue font-bold font-sora rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)]">
                        Get Started with Nex
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
