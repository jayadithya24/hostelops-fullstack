import { Link } from "react-router-dom";
import {
  MessageSquare,
  Activity,
  LayoutDashboard,
  BarChart3,
  ClipboardList,
  Eye,
  CheckCircle,
  Zap,
  Smile,
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-brand-yellow/10 text-brand-dark min-h-screen">

      {/* NAVBAR */}

      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur border-b border-brand-yellow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-brand-dark">
            Hostel<span className="text-brand-orange">Ops</span>
          </h1>
          <div className="hidden md:flex gap-8 text-brand-dark/70">
            <a href="#home" className="hover:text-brand-orange transition">Home</a>
            <a href="#features" className="hover:text-brand-orange transition">Features</a>
            <a href="#process" className="hover:text-brand-orange transition">How It Works</a>
            <a href="#benefits" className="hover:text-brand-orange transition">Benefits</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}

      <section
        id="home"
        className="pt-40 pb-28 text-center px-6 relative overflow-hidden bg-white"
      >

        {/* subtle yellow/orange gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/30 via-white to-brand-orange/20 blur-2xl opacity-60"></div>

        <div className="relative z-10">

          <p className="inline-block px-4 py-1 bg-brand-yellow/30 text-brand-orange rounded-full mb-6 font-semibold">
            🚀 Hostel Management Reimagined
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold max-w-4xl mx-auto leading-tight">
            <span className="text-brand-dark">Smart Hostel </span>
            <span className="bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-yellow bg-clip-text text-transparent">
              Complaint Management
            </span>
          </h1>

          <p className="text-brand-dark/70 mt-6 max-w-2xl mx-auto">
            Streamline hostel maintenance with transparent complaint tracking,
            real-time updates and powerful admin tools.
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              to="/login"
              className="px-8 py-3 rounded-xl font-semibold bg-brand-orange hover:bg-brand-yellow text-white shadow-lg hover:scale-105 transition"
            >
              Get Started →
            </Link>
          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <p className="text-brand-orange text-center font-semibold">Features</p>
        <h2 className="text-4xl font-bold text-center mt-2">
          Everything you need
        </h2>
        <p className="text-brand-dark/70 text-center mt-3">
          Powerful tools for students and administrators.
        </p>
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          <FeatureCard
            icon={<MessageSquare />}
            title="Easy Complaint Submission"
            text="Students quickly submit complaints with category and description."
          />
          <FeatureCard
            icon={<Activity />}
            title="Real-Time Status Tracking"
            text="Track complaint progress instantly."
          />
          <FeatureCard
            icon={<LayoutDashboard />}
            title="Admin Control Dashboard"
            text="Admins manage and resolve complaints efficiently."
          />
          <FeatureCard
            icon={<BarChart3 />}
            title="Analytics & Insights"
            text="Charts help admins monitor issues and trends."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section id="process" className="bg-brand-yellow/20 py-24">
        <h2 className="text-4xl font-bold text-center mb-16 text-brand-dark">
          Simple 3-step process
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6 text-center">
          <Step
            icon={<ClipboardList />}
            title="Submit Complaint"
            text="Students submit issues with category and description."
          />
          <Step
            icon={<Eye />}
            title="Admin Reviews"
            text="Admin reviews and updates complaint status."
          />
          <Step
            icon={<CheckCircle />}
            title="Issue Resolved"
            text="Maintenance team fixes the issue and updates student."
          />
        </div>
      </section>

      {/* BENEFITS */}

      <section id="benefits" className="max-w-7xl mx-auto px-6 py-24">
        <p className="text-brand-orange text-center font-semibold">Benefits</p>
        <h2 className="text-4xl font-bold text-center mt-2">
          Why choose HostelOps?
        </h2>
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          <Benefit
            icon={<Zap />}
            title="Faster Resolution"
            text="Reduce response time significantly."
          />
          <Benefit
            icon={<Eye />}
            title="Transparent Tracking"
            text="Students see complaint status anytime."
          />
          <Benefit
            icon={<LayoutDashboard />}
            title="Organized Management"
            text="Structured system for hostel operations."
          />
          <Benefit
            icon={<Smile />}
            title="Student Satisfaction"
            text="Better communication and faster fixes."
          />
        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-brand-yellow py-8 text-center text-brand-dark/60 bg-white">
        © 2026 HostelOps — Smart Hostel Complaint System
      </footer>

    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-white border border-brand-yellow/40 p-6 rounded-xl hover:border-brand-orange hover:shadow-lg hover:-translate-y-2 transition duration-300">
      <div className="text-brand-orange mb-4">{icon}</div>
      <h3 className="font-semibold text-lg text-brand-dark">{title}</h3>
      <p className="text-brand-dark/60 mt-2 text-sm">{text}</p>
    </div>
  );
}

function Step({ icon, title, text }) {
  return (
    <div>
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-yellow/40 text-brand-dark mx-auto mb-4 border border-brand-yellow/80">
        {icon}
      </div>
      <h3 className="font-semibold text-lg text-brand-dark">{title}</h3>
      <p className="text-brand-dark/70 mt-2">{text}</p>
    </div>
  );
}

function Benefit({ icon, title, text }) {
  return (
    <div className="bg-white border border-brand-yellow/40 p-6 rounded-xl text-center hover:border-brand-orange hover:shadow-lg hover:-translate-y-2 transition duration-300">
      <div className="text-brand-orange mb-4">{icon}</div>
      <h3 className="font-semibold text-lg text-brand-dark">{title}</h3>
      <p className="text-brand-dark/60 mt-2 text-sm">{text}</p>
    </div>
  );
}