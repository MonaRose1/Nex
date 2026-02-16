import React from 'react';
import PageHeader from '../components/PageHeader';

const About = () => {
    return (
        <div className="min-h-screen pb-20">
            <PageHeader
                title="We are Nex"
                subtitle="Revolutionizing recruitment through artificial intelligence and human-centric design."
            />

            <div className="max-w-4xl mx-auto px-6 grid gap-12">
                <div className="glass p-8 rounded-3xl">
                    <h3 className="text-2xl font-bold font-sora mb-4 text-brightTeal">Our Mission</h3>
                    <p className="text-slate-300 leading-relaxed">
                        At Nex, we believe that hiring should be precise, unbiased, and effortless. Our mission is to empower organizations to build world-class teams by leveraging the power of advanced AI to automate the mundane and highlight the extraordinary.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="glass p-8 rounded-3xl">
                        <h3 className="text-2xl font-bold font-sora mb-4 text-royalBlue">Innovation</h3>
                        <p className="text-slate-400">Pushing the boundaries of what is possible in HR tech with state-of-the-art LLMs and computer vision.</p>
                    </div>
                    <div className="glass p-8 rounded-3xl">
                        <h3 className="text-2xl font-bold font-sora mb-4 text-royalBlue">Integrity</h3>
                        <p className="text-slate-400">Building algorithms that are fair, transparent, and designed to eliminate unconscious bias.</p>
                    </div>
                </div>
            </div>
            <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-royalBlue/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        </div>
    );
};

export default About;
