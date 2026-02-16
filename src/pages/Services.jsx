import React from 'react';
import PageHeader from '../components/PageHeader';
import { Bot, LineChart, Globe, ShieldCheck } from 'lucide-react';

const ServiceCard = ({ icon, title, description }) => (
    <div className="glass p-8 rounded-3xl hover:bg-white/10 transition-colors duration-300">
        <div className="w-14 h-14 bg-gradient-to-br from-royalBlue to-brightTeal rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-brightTeal/20">
            {icon}
        </div>
        <h3 className="text-xl font-bold font-sora mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
);

const Services = () => {
    return (
        <div className="min-h-screen pb-20">
            <PageHeader
                title="Our Services"
                subtitle="Comprehensive AI solutions tailored for modern recruitment needs."
            />

            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">
                <ServiceCard
                    icon={<Bot size={28} />}
                    title="AI-Powered Screening"
                    description="Automatically parse resumes, rank candidates, and identify top talent using our proprietary matching algorithms."
                />
                <ServiceCard
                    icon={<LineChart size={28} />}
                    title="Predictive Analytics"
                    description="Forecast candidate success and retention rates based on historical data and behavioral patterns."
                />
                <ServiceCard
                    icon={<Globe size={28} />}
                    title="Global Sourcing"
                    description="Access a worldwide talent pool with automated diverse sourcing strategies to build inclusive teams."
                />
                <ServiceCard
                    icon={<ShieldCheck size={28} />}
                    title="Bias Elimination"
                    description="Standardized evaluation frameworks that ensure every candidate is judged purely on merit."
                />
            </div>
        </div>
    );
};

export default Services;
