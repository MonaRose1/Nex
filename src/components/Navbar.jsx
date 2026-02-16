import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${scrolled ? 'w-[90%] md:w-[70%]' : 'w-[95%] md:w-[85%]'}`}>
            <div className="glass rounded-full px-6 py-3 flex items-center justify-between shadow-2xl backdrop-blur-xl bg-midnightBlue/30 border border-white/10">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <img src={`${import.meta.env.BASE_URL}Nex LOGO/Final EXPORT.svg`} alt="Nex Logo" className="h-8 w-auto group-hover:scale-110 transition-transform" />
                </Link>

                {/* Links */}
                <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
                    <Link to="/" className={`hover:text-brightTeal transition-colors ${isActive('/') ? 'text-brightTeal' : ''}`}>Home</Link>
                    <Link to="/about" className={`hover:text-brightTeal transition-colors ${isActive('/about') ? 'text-brightTeal' : ''}`}>About</Link>
                    <Link to="/services" className={`hover:text-brightTeal transition-colors ${isActive('/services') ? 'text-brightTeal' : ''}`}>Services</Link>
                    <Link to="/portfolio" className={`hover:text-brightTeal transition-colors ${isActive('/portfolio') ? 'text-brightTeal' : ''}`}>Portfolio</Link>
                    <Link to="/contact" className={`hover:text-brightTeal transition-colors ${isActive('/contact') ? 'text-brightTeal' : ''}`}>Contact</Link>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                    <Link to="/login" className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        Log In
                    </Link>
                    <Link to="/signup" className="bg-gradient-to-r from-royalBlue to-brightTeal text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-brightTeal/20 hover:shadow-brightTeal/40 transition-all transform hover:scale-105">
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
