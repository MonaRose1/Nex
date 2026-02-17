import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-midnightBlue dark:text-white flex transition-colors duration-300">
            {/* Background radial-gradient for Admin feel (Blue-ish) */}
            <div className="fixed inset-0 pointer-events-none opacity-5 dark:opacity-10 transition-opacity duration-300">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-royalBlue/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[150px]" />
            </div>

            <AdminSidebar />

            <main className="flex-1 transition-all duration-300 ml-64">
                <header className="flex items-center justify-between px-8 py-6 mb-4 bg-white/5 border-b border-royalBlue/5">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-royalBlue/10 text-royalBlue-dark dark:text-royalBlue text-[10px] font-bold rounded uppercase tracking-widest">Root Environment</span>
                        </div>
                        <h2 className="text-2xl font-sora font-bold text-slate-950 dark:text-white underline decoration-royalBlue-dark/40 dark:decoration-royalBlue/30 underline-offset-8">Nex Admin Strategy</h2>
                    </div>
                </header>
                <div className="max-w-7xl mx-auto pt-8 px-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
