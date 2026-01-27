import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Download,
  Eye,
  Globe2,
  LayoutDashboard,
  ShieldCheck,
  TrendingUp,
  Zap,
  Bell,
  BarChart2,
  ArrowDownLeft,
} from "lucide-react";

const assets = {
  heroPhone: "/payble/Payble.173_010400.jpg",
  heroCard: "/payble/Payble.115.jpg",
  reader: "/payble/Payble.121_063143.png",
  device: "/payble/Payble.151_090935.jpg",
  cardStack: "/payble/Payble.179_010451.jpg",
  homeVideo: "/payble/Payble_081411.mp4",
};

export const PaybleV21 = () => {
  return (
    <div style={{ all: "initial" } as React.CSSProperties}>
      <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-blue-200 selection:text-blue-900 font-sans">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          .font-sans { font-family: 'Inter', sans-serif; }
          .glass {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }
          .hero-gradient {
            background: linear-gradient(135deg, #2563eb 0%, #60a5fa 40%, #93c5fd 100%);
          }
          .mesh-gradient {
            background-color: #000000;
            background-image: radial-gradient(at 80% 0%, #1e3a8a 0px, transparent 50%),
                              radial-gradient(at 0% 50%, #3b82f6 0px, transparent 50%),
                              radial-gradient(at 80% 50%, #1d4ed8 0px, transparent 50%);
          }
          .animate-blob {
            animation: blob 10s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          @keyframes blob {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -20px) scale(1.05); }
            66% { transform: translate(-20px, 20px) scale(0.95); }
          }
          .perspective-1000 { perspective: 1000px; }
          .card-tilt {
            transform-style: preserve-3d;
            transition: transform 0.5s ease;
          }
          .group:hover .card-tilt {
            transform: rotateX(12deg) translateY(-16px);
          }
        `}</style>

        <nav className="fixed top-0 w-full z-50 transition-all duration-300 pt-6 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between p-1 px-2">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-2xl tracking-tighter">Payble</span>
            </div>
            <div className="hidden md:flex items-center gap-8 glass rounded-full px-8 py-3">
              <a href="#" className="text-white font-medium text-sm hover:text-white/80 transition-colors">Personal</a>
              <a href="#" className="text-white font-medium text-sm hover:text-white/80 transition-colors">Business</a>
              <a href="#" className="text-white font-medium text-sm hover:text-white/80 transition-colors">Company</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white font-medium text-sm hidden sm:block">Log in</a>
              <a href="#" className="bg-white text-blue-600 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-blue-50 transition-all">Get started</a>
            </div>
          </div>
        </nav>

        <header className="relative min-h-[110vh] flex flex-col items-start justify-start pt-40 px-6 overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src={assets.homeVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          </div>
          <div className="relative z-10 max-w-4xl w-full mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/20 text-white text-xs font-medium mb-6 backdrop-blur-sm">
              <span>No Green. Go Cashless with Payble</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-semibold text-white tracking-tight leading-[0.95] mb-8 text-left">
              CHANGE THE WAY<br />YOU MONEY
            </h1>
            <p className="text-xl md:text-2xl text-blue-50 font-medium max-w-2xl leading-relaxed mb-10 text-left">
              All your money. One powerful app. Send, receive, track, and manage personal and business payments with ease.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow-lg shadow-blue-900/20">
                Get started
              </button>
              <button className="glass text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download the app
              </button>
            </div>
          </div>

          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          </div>
        </header>

        <section className="py-32 px-6 bg-white relative z-20 rounded-t-[3rem] -mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-6">
                Your Personal and Business Daily Driver
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                Payble brings your personal and business finances together in one simple, secure experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group p-8 rounded-3xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight mb-3">Move money faster</h3>
                <p className="text-lg text-slate-500">Send and receive payments instantly across borders with zero latency.</p>
              </div>
              <div className="group p-8 rounded-3xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight mb-3">See everything clearly</h3>
                <p className="text-lg text-slate-500">Real-time analytics and categorization for every single transaction.</p>
              </div>
              <div className="group p-8 rounded-3xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight mb-3">Stay in control</h3>
                <p className="text-lg text-slate-500">Advanced security features that put you in the driver's seat of your data.</p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-800 transition-colors">
                Get started
              </button>
            </div>
          </div>
        </section>

        <section className="py-24 bg-slate-950 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              Built for <span className="text-blue-400">Local Hustle</span>. <br className="hidden md:block" />
              Ready for <span className="text-indigo-400">Global Growth</span>.
            </h2>
            <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto">
              Payble is designed for individuals and businesses who want to grow beyond limits.
            </p>
          </div>
        </section>

        <section className="py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-6">
                  Smart Banking for Life and Business
                </h2>
                <p className="text-xl text-slate-500 font-medium">
                  Everything you need to manage money without friction.
                </p>
              </div>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors shrink-0">
                Start using Payble
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-50 rounded-[2.5rem] p-10 relative overflow-hidden min-h-[400px] flex flex-col justify-between group">
                <div className="relative z-10">
                  <h3 className="text-3xl font-semibold tracking-tight mb-4">Manage both sides</h3>
                  <p className="text-lg text-slate-500 max-w-md">Manage personal and business accounts side by side in one unified dashboard.</p>
                </div>
                <div className="absolute right-0 bottom-0 w-3/4 translate-x-12 translate-y-12 shadow-2xl rounded-tl-2xl overflow-hidden border border-slate-200">
                  <div className="bg-white p-6">
                    <div className="flex gap-4 mb-4 border-b pb-4">
                      <div className="px-4 py-1 bg-slate-900 text-white rounded-full text-xs font-semibold">Business</div>
                      <div className="px-4 py-1 text-slate-400 text-xs font-semibold">Personal</div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-8 bg-slate-100 rounded w-full"></div>
                      <div className="h-8 bg-slate-50 rounded w-full"></div>
                      <div className="h-8 bg-slate-50 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-3xl font-semibold tracking-tight mb-4">Invoicing</h3>
                  <p className="text-lg text-blue-100">Create and send professional invoices in seconds.</p>
                </div>
                <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-blue-100">Invoice #004</span>
                    <span className="text-xs bg-green-400 text-green-900 px-2 py-0.5 rounded">Paid</span>
                  </div>
                  <div className="text-2xl font-bold">₦150,000.00</div>
                </div>
              </div>

              <div className="lg:col-span-3 bg-slate-50 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl font-semibold tracking-tight mb-4">Real-time Tracking</h3>
                  <p className="text-lg text-slate-500 mb-6">Track transactions as they happen. No more waiting for end-of-day reports.</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="text-blue-600 w-5 h-5" /> Send and receive instantly
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="text-blue-600 w-5 h-5" /> Automated categorization
                    </li>
                  </ul>
                </div>
                <div className="flex-1 w-full flex justify-end">
                  <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 w-full max-w-sm">
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-semibold text-slate-900">Recent Activity</span>
                      <BarChart2 className="text-slate-400 w-5 h-5" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center"><ArrowUpRight className="w-5 h-5" /></div>
                          <span className="text-sm font-medium">Transfer sent</span>
                        </div>
                        <span className="text-sm font-semibold">- ₦50,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center"><ArrowDownLeft className="w-5 h-5" /></div>
                          <span className="text-sm font-medium">Payment received</span>
                        </div>
                        <span className="text-sm font-semibold">+ ₦20,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 order-2 lg:order-1 relative flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src={assets.reader}
                  alt="Payble card reader"
                  className="w-full rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-10 -right-8 w-48 h-72 rounded-[2rem] bg-white shadow-xl rotate-[10deg] overflow-hidden border border-slate-200">
                  <img
                    src={assets.device}
                    alt="Payble device"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 order-1 lg:order-2">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-6">
                Card Readers That Work Anywhere
              </h2>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-700">Smart</span>
                <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-700">NFC Enabled</span>
                <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-700">Portable</span>
              </div>
              <p className="text-xl text-slate-500 font-medium mb-10 leading-relaxed">
                Turn your smartphone or tablet into a powerful point of sale and accept payments on the go.
              </p>
              <button className="bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
                Shop card readers
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        <section className="py-32 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-6">
              The Payble Business Suite
            </h2>
            <p className="text-xl text-slate-500 font-medium mb-12 max-w-2xl mx-auto">
              Powerful tools to manage your business and accept payments from anyone anywhere at any time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <Globe2 className="w-8 h-8 text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2">Accept payments</h4>
                <p className="text-slate-500">Local and international payments handled seamlessly.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <LayoutDashboard className="w-8 h-8 text-indigo-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2">One dashboard</h4>
                <p className="text-slate-500">Run your entire operations from a single view.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <TrendingUp className="w-8 h-8 text-purple-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2">Scale confidently</h4>
                <p className="text-slate-500">Business and ERP tools that grow with you.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-800 transition-colors">
                Be the first to know
              </button>
              <button className="text-slate-600 px-8 py-4 rounded-full font-semibold text-lg hover:text-slate-900 transition-colors">
                Join the waitlist
              </button>
            </div>
          </div>
        </section>

        <section className="py-40 px-6 mesh-gradient relative overflow-hidden text-center">
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-8">
              UNLOCK YOUR<br />TRUE POTENTIAL
            </h2>
            <p className="text-2xl text-blue-200 font-medium mb-16">
              Money should move you forward not hold you back.
            </p>
            <div className="space-y-4 max-w-md mx-auto mb-16">
              <div className="glass-card p-4 rounded-2xl flex items-center gap-4 transform translate-x-4 opacity-80 scale-95">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
                  <Bell className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-500 font-semibold uppercase">Notification</p>
                  <p className="text-sm font-semibold text-slate-900">Received ₦5,000 into NGN account</p>
                </div>
              </div>
              <div className="glass-card p-4 rounded-2xl flex items-center gap-4 transform -translate-x-4 opacity-90 scale-95">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
                  <Bell className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-500 font-semibold uppercase">Notification</p>
                  <p className="text-sm font-semibold text-slate-900">Received ₦2,000,000 into NGN account</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-2xl flex items-center gap-4 transform scale-105 border border-blue-100">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-green-200">
                  <Check className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-500 font-semibold uppercase">Success</p>
                  <p className="text-base font-bold text-slate-900">Received ₦350,000 into NGN account</p>
                </div>
              </div>
            </div>
            <p className="text-xl text-white/80 font-medium mb-10">
              Build wealth. Reach your goals. Create new possibilities with Payble.
            </p>
            <button className="bg-white text-blue-900 px-10 py-5 rounded-full font-bold text-xl hover:bg-blue-50 transition-transform hover:scale-105 shadow-xl shadow-blue-900/50">
              Join Payble today
            </button>
          </div>
        </section>

        <section className="py-32 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-[1.586] mb-12 group perspective-1000">
              <div className="absolute inset-0 rounded-3xl shadow-2xl card-tilt overflow-hidden border border-slate-200">
                <img
                  src={assets.cardStack}
                  alt="Payble cards"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-blue-500 blur-[80px] opacity-20 -z-10"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-6 text-center">
              Cards You Can Trust
            </h2>
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Status: Coming soon
              </span>
            </div>
            <p className="text-xl text-slate-500 font-medium mb-10 text-center max-w-xl">
              Use your Payble card globally for in-store, online and ATM transactions with confidence.
            </p>
            <button className="text-blue-600 font-semibold text-lg hover:text-blue-700 transition-colors flex items-center gap-2">
              Learn more
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        <footer className="bg-white border-t border-slate-100 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-slate-900 font-bold text-2xl tracking-tighter">Payble</span>
            <div className="flex gap-8 text-sm text-slate-500 font-medium">
              <a href="#" className="hover:text-slate-900">Privacy</a>
              <a href="#" className="hover:text-slate-900">Terms</a>
              <a href="#" className="hover:text-slate-900">Contact</a>
            </div>
            <div className="text-sm text-slate-400">© 2023 Payble Inc.</div>
          </div>
        </footer>
      </div>
    </div>
  );
};
