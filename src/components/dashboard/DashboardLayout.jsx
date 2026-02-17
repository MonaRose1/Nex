import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
    // Assuming isCollapsed state is managed elsewhere or will be added.
    // For now, we'll define it as false to make the code syntactically correct.
    const isCollapsed = false;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-midnightBlue dark:text-white flex transition-colors duration-300">
            {/* Background radial-gradient for tech feel */}
            <div className="fixed inset-0 pointer-events-none opacity-10 dark:opacity-20 transition-opacity duration-300">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brightTeal/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[0%] right-[0%] w-[30%] h-[30%] bg-royalBlue/20 rounded-full blur-[120px]" />
            </div>

            <Sidebar />
            <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <header className="flex items-center justify-between px-8 py-6 mb-4">
                    <div>
                        <h2 className="text-3xl font-sora font-bold text-slate-950 dark:text-white underline decoration-brightTeal-dark/30 dark:decoration-brightTeal/20 underline-offset-8">Nex Control Center</h2>
                        <p className="text-slate-950 dark:text-slate-400 text-sm font-medium mt-2">Autonomous Talent Acquisition Active</p>
                    </div>
                </header>
                <div className="max-w-7xl mx-auto pt-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
