import React from 'react';

const PageHeader = ({ title, subtitle }) => (
    <div className="pt-32 pb-12 text-center relative z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-bold font-sora mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            {title}
        </h1>
        {subtitle && (
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light">
                {subtitle}
            </p>
        )}
    </div>
);

export default PageHeader;
