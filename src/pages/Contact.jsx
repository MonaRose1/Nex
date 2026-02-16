import React from 'react';
import PageHeader from '../components/PageHeader';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
    return (
        <div className="min-h-screen pb-20">
            <PageHeader
                title="Get in Touch"
                subtitle="Ready to start your autonomous hiring journey? We're here to help."
            />

            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="glass p-8 rounded-3xl flex items-start gap-6">
                        <div className="p-3 bg-white/10 rounded-full text-brightTeal">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold font-sora mb-1">Email Us</h3>
                            <p className="text-slate-400">hello@nex-hiring.com</p>
                            <p className="text-slate-400">support@nex-hiring.com</p>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-3xl flex items-start gap-6">
                        <div className="p-3 bg-white/10 rounded-full text-brightTeal">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold font-sora mb-1">Call Us</h3>
                            <p className="text-slate-400">+1 (888) NEX-AI-HR</p>
                            <p className="text-slate-400">Mon-Fri, 9am - 6pm PST</p>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-3xl flex items-start gap-6">
                        <div className="p-3 bg-white/10 rounded-full text-brightTeal">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold font-sora mb-1">Visit Us</h3>
                            <p className="text-slate-400">101 Innovation Dr</p>
                            <p className="text-slate-400">San Francisco, CA 94107</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="glass p-10 rounded-3xl h-fit">
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-slate-300">Name</label>
                                <input type="text" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brightTeal focus:ring-1 focus:ring-brightTeal transition-all" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-slate-300">Company</label>
                                <input type="text" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brightTeal focus:ring-1 focus:ring-brightTeal transition-all" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-300">Email</label>
                            <input type="email" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brightTeal focus:ring-1 focus:ring-brightTeal transition-all" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-300">Message</label>
                            <textarea rows="4" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brightTeal focus:ring-1 focus:ring-brightTeal transition-all"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r from-royalBlue to-brightTeal text-white font-bold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(60,178,184,0.4)] transition-all transform hover:scale-[1.02]">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
