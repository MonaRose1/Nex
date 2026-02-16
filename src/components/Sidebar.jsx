import React, { useState, useEffect } from 'react';

const sections = [
    { id: 'hero', label: '01. Home' },
    { id: 'stats', label: '02. Benefits' },
    { id: 'process', label: '03. Process' },
    { id: 'cta', label: '04. Start' },
];

const Sidebar = () => {
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6">
            <div className="absolute right-[5px] top-0 bottom-0 w-[1px] bg-white/10 -z-10"></div>
            {sections.map(({ id, label }) => (
                <a
                    key={id}
                    href={`#${id}`}
                    className="group flex items-center justify-end gap-4 relative"
                >
                    <span className={`text-xs font-sora transition-all duration-300 ${activeSection === id ? 'text-brightTeal opacity-100' : 'text-slate-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0'}`}>
                        {label}
                    </span>
                    <div className={`w-3 h-3 rounded-full border border-white/20 transition-all duration-300 ${activeSection === id ? 'bg-brightTeal shadow-[0_0_10px_rgba(60,178,184,0.8)] scale-125' : 'bg-transparent group-hover:bg-white/20'}`}></div>
                </a>
            ))}
        </div>
    );
};

export default Sidebar;
