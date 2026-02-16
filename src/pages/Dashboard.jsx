import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import LiveScoutFeed from '../components/dashboard/LiveScoutFeed';
import MetricCard from '../components/dashboard/MetricCard';
import ChatConsole from '../components/dashboard/ChatConsole';
import CandidateMatchChart from '../components/dashboard/CandidateMatchChart';
import GhostModeToggle from '../components/dashboard/GhostModeToggle';
import NexScore from '../components/dashboard/NexScore';
import InterviewScheduler from '../components/dashboard/InterviewScheduler'; // Import the scheduler

const Dashboard = () => {
    const [showScheduler, setShowScheduler] = useState(false);

    return (
        <DashboardLayout>
            {/* Top Section - Metrics, Live Feed, Score */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-4 sm:mb-6">
                {/* Left Column - Metrics & Toggle */}
                <div className="lg:col-span-3 space-y-4 sm:space-y-6">
                    <MetricCard
                        title="Cost Saved"
                        value="$12,450"
                        subtext="v/s Human Recruiters"
                    />
                    <MetricCard
                        title="Time-To-Hire"
                        value="4.2h"
                        subtext="Avg. Speed"
                        type="progress"
                    />
                    <GhostModeToggle />
                </div>

                {/* Center - Live Feed */}
                <div className="lg:col-span-6">
                    <LiveScoutFeed />
                </div>

                {/* Right Column - Nex Score & Match Chart */}
                <div className="lg:col-span-3 space-y-4 sm:space-y-6">
                    <NexScore score={98} />
                    <CandidateMatchChart />
                </div>
            </div>

            {/* Middle Section - Interview Scheduler Toggle */}
            <div className="mb-4 sm:mb-6">
                <button
                    onClick={() => setShowScheduler(!showScheduler)}
                    className="w-full bg-gradient-to-r from-royalBlue/30 to-brightTeal/30 backdrop-blur-md rounded-2xl border border-white/10 p-4 flex items-center justify-between group hover:from-royalBlue/40 hover:to-brightTeal/40 transition-all"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brightTeal/20 flex items-center justify-center">
                            <span className="text-xl">📅</span>
                        </div>
                        <div className="text-left">
                            <h3 className="text-white font-semibold">Interview Schedule</h3>
                            <p className="text-white/50 text-sm">5 interviews scheduled for today</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="bg-green-500 w-2 h-2 rounded-full animate-pulse"></span>
                        <span className="text-white/70 text-sm group-hover:text-white transition-all">
                            {showScheduler ? 'Hide Calendar ↑' : 'View Calendar ↓'}
                        </span>
                    </div>
                </button>
            </div>

            {/* Interview Scheduler (Collapsible) */}
            {showScheduler && (
                <div className="mb-4 sm:mb-6 animate-slideDown">
                    <InterviewScheduler />
                </div>
            )}

            {/* Bottom Section - Chat & Campaign */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                {/* Chat Console - Takes more space when scheduler is hidden */}
                <div className={`${showScheduler ? 'lg:col-span-7' : 'lg:col-span-8'} h-80`}>
                    <ChatConsole />
                </div>

                {/* Quick Stats Card */}
                <div className={`${showScheduler ? 'lg:col-span-5' : 'lg:col-span-4'} space-y-4 sm:space-y-6`}>
                    {/* Quick Action Card */}
                    <div className="bg-gradient-to-br from-royalBlue/20 to-brightTeal/20 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 flex flex-col justify-center items-center text-center">
                        <h3 className="font-sora font-bold text-white text-lg sm:text-xl mb-2 sm:mb-4">
                            Start New Campaign
                        </h3>
                        <p className="text-white/60 text-xs sm:text-sm mb-4 sm:mb-6 font-inter px-2">
                            Let Nex find your next superstar developers in minutes.
                        </p>
                        <button className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-white text-midnightBlue font-sora font-bold rounded-xl sm:rounded-2xl hover:bg-brightTeal hover:text-midnightBlue transition-all transform hover:scale-105 text-sm sm:text-base">
                            🚀 Launch AI Scout
                        </button>
                    </div>

                    {/* Quick Stats Row */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                        <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 p-2 sm:p-4 text-center">
                            <p className="text-white/50 text-[10px] sm:text-xs">Active</p>
                            <p className="text-white text-sm sm:text-lg font-bold">12</p>
                            <p className="text-white/30 text-[8px] sm:text-xs">interviews</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 p-2 sm:p-4 text-center">
                            <p className="text-white/50 text-[10px] sm:text-xs">Pending</p>
                            <p className="text-white text-sm sm:text-lg font-bold">5</p>
                            <p className="text-white/30 text-[8px] sm:text-xs">reviews</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 p-2 sm:p-4 text-center">
                            <p className="text-white/50 text-[10px] sm:text-xs">Hired</p>
                            <p className="text-white text-sm sm:text-lg font-bold">8</p>
                            <p className="text-white/30 text-[8px] sm:text-xs">this month</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add animation styles */}
            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
            `}</style>
        </DashboardLayout>
    );
};

export default Dashboard;