import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="relative min-h-screen text-midnightBlue dark:text-white overflow-x-hidden font-inter selection:bg-brightTeal selection:text-white transition-colors duration-300">
            {/* Background Image / Gradient */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-slate-50 dark:bg-midnightBlue/80 mix-blend-multiply z-10"></div>
                <img
                    src={`${import.meta.env.BASE_URL}BG/Abstract.jpg`}
                    alt="Background"
                    className="w-full h-full object-cover opacity-20 dark:opacity-60 transition-opacity duration-300"
                />
                {/* Grainy Overlay */}
                <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow flex flex-col items-center w-full max-w-[1600px] mx-auto px-6 sm:px-12 pt-32 pb-12">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
