import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import LiveScoutFeed from '../components/dashboard/LiveScoutFeed';
import MetricCard from '../components/dashboard/MetricCard';
import ChatConsole from '../components/dashboard/ChatConsole';
import CandidateMatchChart from '../components/dashboard/CandidateMatchChart';
import GhostModeToggle from '../components/dashboard/GhostModeToggle';
import NexScore from '../components/dashboard/NexScore';

const Dashboard = () => {
    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
                {/* Left Column - Metrics & Toggle */}
                <div className="md:col-span-3 space-y-6">
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
                <div className="md:col-span-6">
                    <LiveScoutFeed />
                </div>

                {/* Right Column - Nex Score & Match Chart */}
                <div className="md:col-span-3 space-y-6">
                    <NexScore score={98} />
                    <CandidateMatchChart />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Bottom - Chat Console */}
                <div className="md:col-span-8 h-80">
                    <ChatConsole />
                </div>

                {/* Quick Action Card */}
                <div className="md:col-span-4 bg-gradient-to-br from-royalBlue/20 to-brightTeal/20 p-6 rounded-3xl border border-white/10 flex flex-col justify-center items-center text-center">
                    <h3 className="font-sora font-bold text-white text-xl mb-4">Start New Campaign</h3>
                    <p className="text-white/60 text-sm mb-6 font-inter">Let Nex find your next superstar developers in minutes.</p>
                    <button className="px-8 py-3 bg-white text-midnightBlue font-sora font-bold rounded-2xl hover:bg-brightTeal hover:text-midnightBlue transition-all transform hover:scale-105">
                        Launch AI Scout
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
