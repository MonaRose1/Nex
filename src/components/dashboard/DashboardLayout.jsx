import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-midnightBlue dark:text-white flex transition-colors duration-300">
            {/* Background radial-gradient for tech feel */}
            <div className="fixed inset-0 pointer-events-none opacity-10 dark:opacity-20 transition-opacity duration-300">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brightTeal/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[0%] right-[0%] w-[30%] h-[30%] bg-royalBlue/20 rounded-full blur-[120px]" />
            </div>

            <Sidebar />
            <main className="flex-1 ml-20 p-8 relative z-10 transition-all duration-500">
                <div className="max-w-7xl mx-auto pt-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
