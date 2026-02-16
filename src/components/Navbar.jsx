import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${scrolled ? 'w-[90%] md:w-[70%]' : 'w-[95%] md:w-[85%]'}`}>
            <div className="glass rounded-full px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src={`${import.meta.env.BASE_URL}Nex LOGO/Final EXPORT.svg`} alt="Nex Logo" className="h-8 w-auto" />
                </div>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                    <a href="#hero" className="hover:text-brightTeal transition-colors">Home</a>
                    <a href="#process" className="hover:text-brightTeal transition-colors">How it Works</a>
                    <a href="#stats" className="hover:text-brightTeal transition-colors">Benefits</a>
                </div>

                {/* CTA */}
                <button className="bg-gradient-to-r from-royalBlue to-brightTeal text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-brightTeal/20 hover:shadow-brightTeal/40 transition-all transform hover:scale-105">
                    Get Started
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
