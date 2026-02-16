import React, { useState } from 'react';

const InterviewScheduler = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewMode, setViewMode] = useState('week'); // 'week' or 'month'
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    
    // Sample interview data
    const interviews = [
        {
            id: 1,
            candidate: 'Alex Rivera',
            role: 'Senior React Developer',
            time: '10:30 AM',
            duration: '45 min',
            date: '2024-01-20',
            status: 'scheduled',
            avatar: 'AR',
            type: 'Technical',
            avatarColor: 'from-blue-500 to-cyan-500'
        },
        {
            id: 2,
            candidate: 'Sarah Chen',
            role: 'AI Engineer',
            time: '2:00 PM',
            duration: '60 min',
            date: '2024-01-20',
            status: 'in-progress',
            avatar: 'SC',
            type: 'System Design',
            avatarColor: 'from-purple-500 to-pink-500'
        },
        {
            id: 3,
            candidate: 'Marcus Knight',
            role: 'Full Stack Developer',
            time: '11:15 AM',
            duration: '45 min',
            date: '2024-01-21',
            status: 'scheduled',
            avatar: 'MK',
            type: 'Technical',
            avatarColor: 'from-green-500 to-teal-500'
        },
        {
            id: 4,
            candidate: 'Elena Vance',
            role: 'Frontend Lead',
            time: '3:30 PM',
            duration: '60 min',
            date: '2024-01-21',
            status: 'scheduled',
            avatar: 'EV',
            type: 'Behavioral',
            avatarColor: 'from-orange-500 to-red-500'
        },
        {
            id: 5,
            candidate: 'David Miller',
            role: 'React Native Dev',
            time: '9:45 AM',
            duration: '45 min',
            date: '2024-01-22',
            status: 'scheduled',
            avatar: 'DM',
            type: 'Technical',
            avatarColor: 'from-indigo-500 to-blue-500'
        },
        {
            id: 6,
            candidate: 'Priya Patel',
            role: 'DevOps Engineer',
            time: '1:15 PM',
            duration: '60 min',
            date: '2024-01-22',
            status: 'pending',
            avatar: 'PP',
            type: 'System Design',
            avatarColor: 'from-yellow-500 to-orange-500'
        }
    ];

    // Get dates for week view
    const getWeekDays = () => {
        const days = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const day = new Date(today);
            day.setDate(today.getDate() + i);
            days.push(day);
        }
        return days;
    };

    const weekDays = getWeekDays();
    
    // Time slots
    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
    ];

    // Format date to compare with interview dates
    const formatDateKey = (date) => {
        return date.toISOString().split('T')[0];
    };

    // Get interviews for specific date and time
    const getInterviewsForSlot = (date, time) => {
        const dateKey = formatDateKey(date);
        const timeHour = parseInt(time.split(':')[0]);
        const timePeriod = time.split(' ')[1];
        
        return interviews.filter(interview => {
            const interviewDate = interview.date;
            const interviewHour = parseInt(interview.time.split(':')[0]);
            const interviewPeriod = interview.time.split(' ')[1];
            
            return interviewDate === dateKey && 
                   interviewHour === timeHour && 
                   interviewPeriod === timePeriod;
        });
    };

    // Status color mapper
    const getStatusColor = (status) => {
        switch(status) {
            case 'in-progress': return 'bg-green-500';
            case 'pending': return 'bg-yellow-500';
            default: return 'bg-blue-500';
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 sm:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                        📅 Interview Schedule
                        <span className="text-xs bg-brightTeal/20 text-brightTeal px-2 py-1 rounded-full">
                            Beta
                        </span>
                    </h2>
                    <p className="text-white/50 text-sm mt-1">Manage and track all interviews</p>
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    {/* View Toggle */}
                    <div className="flex bg-white/10 rounded-xl p-1">
                        <button
                            onClick={() => setViewMode('week')}
                            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg transition-all ${
                                viewMode === 'week' 
                                ? 'bg-brightTeal text-white' 
                                : 'text-white/70 hover:text-white'
                            }`}
                        >
                            Week
                        </button>
                        <button
                            onClick={() => setViewMode('month')}
                            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg transition-all ${
                                viewMode === 'month' 
                                ? 'bg-brightTeal text-white' 
                                : 'text-white/70 hover:text-white'
                            }`}
                        >
                            Month
                        </button>
                    </div>
                    
                    {/* Schedule Button */}
                    <button
                        onClick={() => setShowScheduleModal(true)}
                        className="bg-gradient-to-r from-royalBlue to-brightTeal text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium hover:shadow-lg transition-all flex items-center gap-1"
                    >
                        <span>+</span>
                        <span className="hidden sm:inline">Schedule</span>
                    </button>
                </div>
            </div>

            {/* Week View Calendar */}
            {viewMode === 'week' && (
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        {/* Week Days Header */}
                        <div className="grid grid-cols-8 gap-2 mb-4">
                            <div className="text-white/50 text-xs font-medium">Time</div>
                            {weekDays.map((day, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-white/70 text-xs">
                                        {day.toLocaleDateString('en-US', { weekday: 'short' })}
                                    </div>
                                    <div className={`text-lg font-bold mt-1 ${
                                        day.toDateString() === new Date().toDateString() 
                                        ? 'text-brightTeal' 
                                        : 'text-white'
                                    }`}>
                                        {day.getDate()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Time Slots */}
                        {timeSlots.map((time, timeIndex) => (
                            <div key={timeIndex} className="grid grid-cols-8 gap-2 mb-2">
                                <div className="text-white/50 text-xs font-medium flex items-center">
                                    {time}
                                </div>
                                
                                {weekDays.map((day, dayIndex) => {
                                    const slotInterviews = getInterviewsForSlot(day, time);
                                    
                                    return (
                                        <div
                                            key={dayIndex}
                                            className="bg-white/5 rounded-xl p-2 min-h-[80px] hover:bg-white/10 transition-all cursor-pointer relative group"
                                        >
                                            {slotInterviews.map((interview, i) => (
                                                <div
                                                    key={i}
                                                    className="mb-1 last:mb-0"
                                                >
                                                    <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(interview.status)} rounded-l-xl`}></div>
                                                    <div className="pl-3">
                                                        <p className="text-white text-xs font-medium truncate">
                                                            {interview.candidate}
                                                        </p>
                                                        <p className="text-white/50 text-[10px] truncate">
                                                            {interview.role}
                                                        </p>
                                                        <div className="flex items-center gap-1 mt-1">
                                                            <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(interview.status)}`}></span>
                                                            <span className="text-white/30 text-[8px]">
                                                                {interview.duration}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            
                                            {/* Hover add indicator */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-brightTeal/10 rounded-xl">
                                                <span className="text-brightTeal text-xs">+ Schedule</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Month View - Upcoming Interviews List */}
            {viewMode === 'month' && (
                <div className="space-y-4">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-white/5 rounded-xl p-3">
                            <p className="text-white/50 text-xs">Total</p>
                            <p className="text-white text-xl font-bold">24</p>
                            <p className="text-white/30 text-xs">this month</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3">
                            <p className="text-white/50 text-xs">Completed</p>
                            <p className="text-green-400 text-xl font-bold">12</p>
                            <p className="text-white/30 text-xs">50% rate</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3">
                            <p className="text-white/50 text-xs">Pending</p>
                            <p className="text-yellow-400 text-xl font-bold">8</p>
                            <p className="text-white/30 text-xs">need action</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3">
                            <p className="text-white/50 text-xs">Avg. Score</p>
                            <p className="text-brightTeal text-xl font-bold">87%</p>
                            <p className="text-white/30 text-xs">+5% vs last</p>
                        </div>
                    </div>

                    {/* Today's Schedule */}
                    <div className="bg-gradient-to-r from-royalBlue/20 to-brightTeal/20 rounded-xl p-4">
                        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Today's Schedule
                        </h3>
                        <div className="space-y-3">
                            {interviews.filter(i => i.date === formatDateKey(new Date())).map(interview => (
                                <div key={interview.id} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${interview.avatarColor} flex items-center justify-center text-white font-bold text-sm`}>
                                        {interview.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="text-white font-medium">{interview.candidate}</p>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                                                interview.status === 'in-progress' 
                                                ? 'bg-green-500/20 text-green-400' 
                                                : 'bg-blue-500/20 text-blue-400'
                                            }`}>
                                                {interview.status}
                                            </span>
                                        </div>
                                        <p className="text-white/50 text-xs">{interview.role}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-white/30 text-xs">⏰ {interview.time}</span>
                                            <span className="text-white/30 text-xs">⏱️ {interview.duration}</span>
                                            <span className="text-white/30 text-xs">🎯 {interview.type}</span>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1 bg-brightTeal text-white rounded-lg text-xs hover:bg-brightTeal/80 transition-all">
                                        Join
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Interviews List */}
                    <h3 className="text-white font-semibold mt-6 mb-3">Upcoming Interviews</h3>
                    <div className="space-y-2">
                        {interviews.map(interview => (
                            <div key={interview.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${interview.avatarColor} flex items-center justify-center text-white font-bold text-sm`}>
                                    {interview.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                                        <div>
                                            <p className="text-white font-medium truncate">{interview.candidate}</p>
                                            <p className="text-white/50 text-xs truncate">{interview.role}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="text-white/30">📅 {interview.date}</span>
                                            <span className="text-white/30">⏰ {interview.time}</span>
                                            <span className="text-white/30">⏱️ {interview.duration}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${getStatusColor(interview.status)}`}></span>
                                    <button className="text-brightTeal text-sm hover:underline hidden sm:block">
                                        Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Schedule Modal */}
            {showScheduleModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-2xl border border-white/10 p-6 w-full max-w-md">
                        <h3 className="text-white text-xl font-bold mb-4">Schedule New Interview</h3>
                        
                        <form className="space-y-4">
                            <div>
                                <label className="block text-white/70 text-sm mb-2">Candidate Name</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brightTeal"
                                    placeholder="Enter candidate name"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-white/70 text-sm mb-2">Position</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brightTeal"
                                    placeholder="e.g., Senior React Developer"
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white/70 text-sm mb-2">Date</label>
                                    <input 
                                        type="date" 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brightTeal"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/70 text-sm mb-2">Time</label>
                                    <input 
                                        type="time" 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brightTeal"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-white/70 text-sm mb-2">Interview Type</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brightTeal">
                                    <option className="bg-gray-900">Technical</option>
                                    <option className="bg-gray-900">System Design</option>
                                    <option className="bg-gray-900">Behavioral</option>
                                    <option className="bg-gray-900">HR Round</option>
                                </select>
                            </div>
                            
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowScheduleModal(false)}
                                    className="flex-1 bg-white/10 text-white py-3 rounded-xl hover:bg-white/20 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-royalBlue to-brightTeal text-white py-3 rounded-xl hover:shadow-lg transition-all"
                                >
                                    Schedule
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Mini Calendar for quick view */}
            <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white/70 text-sm font-medium">Quick Calendar</h4>
                    <div className="flex gap-2">
                        <button className="text-white/30 hover:text-white">←</button>
                        <button className="text-white/30 hover:text-white">→</button>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                        <div key={day} className="text-white/30 text-xs">{day}</div>
                    ))}
                    {[...Array(31)].map((_, i) => (
                        <button
                            key={i}
                            className={`text-xs p-1 rounded-lg hover:bg-white/10 transition-all ${
                                i + 1 === new Date().getDate() 
                                ? 'bg-brightTeal text-white' 
                                : 'text-white/70'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InterviewScheduler;