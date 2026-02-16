import React from 'react';
import PageHeader from '../components/PageHeader';

const PortfolioItem = ({ title, category }) => (
    <div className="group relative overflow-hidden rounded-3xl h-64 glass border-0">
        {/* Placeholder Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 group-hover:scale-110 transition-transform duration-500"></div>

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold font-sora text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{title}</h3>
            <span className="text-brightTeal mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{category}</span>
        </div>
    </div>
);

const Portfolio = () => {
    return (
        <div className="min-h-screen pb-20">
            <PageHeader
                title="Success Stories"
                subtitle="See how leading companies are transforming their hiring with Nex."
            />

            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
                <PortfolioItem title="TechCorp Global" category="Enterprise Hiring" />
                <PortfolioItem title="Innovate Startup" category="Rapid Scaling" />
                <PortfolioItem title="Future Finance" category="Bias Reduction" />
                <PortfolioItem title="Green Energy Co" category="Global Sourcing" />
                <PortfolioItem title="HealthPlus" category="Staff Retention" />
                <PortfolioItem title="EduLearn" category="Automated Screening" />
            </div>
        </div>
    );
};

export default Portfolio;
