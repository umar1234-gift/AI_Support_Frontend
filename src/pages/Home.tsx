import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
	Bot,
	Sparkles,
	Shield,
	Zap,
	Upload,
	MessageSquare,
	BarChart3,
	ArrowRight,
	Check,
	Play,
	Menu,
	X,
} from "lucide-react";
import { useState } from "react";

const Home = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
			{/* Navbar */}
			<nav className="max-w-7xl mx-auto flex justify-between items-center py-6 px-6">
				<div className="flex items-center gap-2">
					<Bot className="w-8 h-8 text-blue-500" />
					<span className="text-xl font-bold">AI Support</span>
				</div>
				<div className="hidden md:flex items-center gap-6">
					<a
						href="#features"
						className="text-slate-300 hover:text-white transition-colors"
					>
						Features
					</a>
					<a
						href="#how"
						className="text-slate-300 hover:text-white transition-colors"
					>
						How it works
					</a>
					<a
						href="#pricing"
						className="text-slate-300 hover:text-white transition-colors"
					>
						Pricing
					</a>
				</div>
				<div className="hidden md:flex items-center gap-3">
					<Link
						to="/login"
						className="px-4 py-2 rounded-xl font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
					>
						Login
					</Link>
					<Link
						to="/signup"
						className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
					>
						Get Started Free
					</Link>
				</div>
				<button
					className="md:hidden"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				>
					{mobileMenuOpen ? (
						<X className="w-6 h-6" />
					) : (
						<Menu className="w-6 h-6" />
					)}
				</button>
			</nav>

			{/* Mobile menu */}
			{mobileMenuOpen && (
				<div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-4 space-y-3">
					<a href="#features" className="block text-slate-300">
						Features
					</a>
					<a href="#how" className="block text-slate-300">
						How it works
					</a>
					<a href="#pricing" className="block text-slate-300">
						Pricing
					</a>
					<Link to="/login" className="block text-slate-300">
						Login
					</Link>
					<Link
						to="/signup"
						className="block bg-blue-600 text-white px-4 py-2 rounded-xl text-center font-medium"
					>
						Get Started Free
					</Link>
				</div>
			)}

			{/* Hero Section */}
			<section className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center relative">
				{/* Glow orbs */}
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
				<div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="relative z-10"
				>
					<div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-500/20">
						<Sparkles size={16} />
						AI Customer Support for Small Businesses
					</div>
					<h1 className="text-6xl md:text-8xl font-extrabold leading-[1.05] tracking-tight">
						Your Business's
						<span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
							AI Support Agent
						</span>
					</h1>
					<p className="mt-8 text-xl text-slate-400 max-w-3xl mx-auto">
						Upload your knowledge, create your AI assistant, and let customers
						get answers 24/7. No code required.
					</p>
					<div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
						<Link
							to="/signup"
							className="group inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
						>
							Create Your AI Assistant
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</Link>
						<button className="inline-flex items-center gap-2 bg-slate-800 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-slate-700 transition-all border border-slate-700">
							<Play className="w-5 h-5 text-blue-400" />
							Watch Demo
						</button>
					</div>

					{/* Product mockup */}
					<div className="mt-16 max-w-5xl mx-auto">
						<div className="bg-slate-900 rounded-3xl p-3 shadow-2xl border border-slate-800">
							<div className="flex items-center gap-2 px-4 py-2">
								<div className="w-3 h-3 bg-red-500 rounded-full"></div>
								<div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
								<div className="w-3 h-3 bg-green-500 rounded-full"></div>
								<span className="ml-4 text-slate-500 text-sm">
									yourbusiness.com/chat
								</span>
							</div>
							<div className="bg-slate-800 rounded-2xl p-6 flex items-center gap-4">
								<div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
									<Bot className="text-blue-400 w-8 h-8" />
								</div>
								<div className="text-left flex-1">
									<p className="font-bold text-white">AI Assistant</p>
									<p className="text-slate-400 text-sm">Online</p>
									<div className="mt-2 bg-slate-700 rounded-2xl p-4">
										<p className="text-slate-200">
											Hello! Welcome to our store. How can I help you today?
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</section>

			{/* Social proof */}
			<section className="max-w-7xl mx-auto px-6 pb-24">
				<p className="text-center text-slate-500 mb-8">
					Trusted by 500+ small businesses
				</p>
				<div className="flex flex-wrap justify-center gap-12">
					{[
						"Shopify",
						"Local Bakery",
						"Dental Clinic",
						"Law Firm",
						"Gym",
						"Real Estate",
					].map((name) => (
						<span key={name} className="text-xl font-bold text-slate-700">
							{name}
						</span>
					))}
				</div>
			</section>

			{/* Features */}
			<section id="features" className="max-w-7xl mx-auto px-6 py-24">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold">Everything you need</h2>
					<p className="text-slate-400 mt-4">
						Powerful features to automate your customer support.
					</p>
				</div>
				<div className="grid md:grid-cols-3 gap-8">
					{[
						{
							icon: Upload,
							title: "Upload Knowledge",
							desc: "PDFs, FAQs, policies – your AI learns instantly.",
						},
						{
							icon: MessageSquare,
							title: "24/7 Chat",
							desc: "Customers get instant, accurate answers any time.",
						},
						{
							icon: BarChart3,
							title: "Smart Analytics",
							desc: "Track conversations and understand customer needs.",
						},
						{
							icon: Shield,
							title: "Private & Secure",
							desc: "Complete isolation between businesses.",
						},
						{
							icon: Bot,
							title: "RAG-Powered",
							desc: "Answers grounded in your real business data.",
						},
						{
							icon: Zap,
							title: "Streaming Responses",
							desc: "Human-like real-time chat experience.",
						},
					].map((feature, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.1 }}
							className="bg-slate-800/50 rounded-3xl p-8 border border-slate-700 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all"
						>
							<div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
								<feature.icon className="w-7 h-7 text-blue-400" />
							</div>
							<h3 className="text-xl font-bold mb-3">{feature.title}</h3>
							<p className="text-slate-400">{feature.desc}</p>
						</motion.div>
					))}
				</div>
			</section>

			{/* How it works */}
			<section id="how" className="bg-slate-900 py-24">
				<div className="max-w-5xl mx-auto px-6">
					<h2 className="text-4xl font-bold text-center mb-16">How it works</h2>
					<div className="grid md:grid-cols-3 gap-12">
						{[
							{
								step: "01",
								title: "Create Account",
								desc: "Sign up and create your business profile.",
							},
							{
								step: "02",
								title: "Upload Knowledge",
								desc: "Add PDFs, FAQs, and policies.",
							},
							{
								step: "03",
								title: "Share & Serve",
								desc: "Get your public chat link or embed widget.",
							},
						].map((item, idx) => (
							<div key={idx} className="text-center">
								<div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg shadow-blue-600/20">
									{item.step}
								</div>
								<h3 className="text-2xl font-bold mb-3">{item.title}</h3>
								<p className="text-slate-400">{item.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="max-w-7xl mx-auto px-6 py-24">
				<h2 className="text-4xl font-bold text-center mb-16">
					What our customers say
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					{[
						{
							name: "Ahmed Raza",
							role: "Owner, Karachi Bakery",
							quote:
								"Our customers love the instant responses. We save hours every day.",
						},
						{
							name: "Sana Khan",
							role: "Dental Clinic Manager",
							quote:
								"Setup took 10 minutes. Now patients get answers even after hours.",
						},
						{
							name: "Ali Hassan",
							role: "E-commerce Store",
							quote:
								"The AI answers product questions accurately. Sales have increased!",
						},
					].map((testimonial, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.1 }}
							className="bg-slate-800/50 rounded-3xl p-8 border border-slate-700"
						>
							<div className="flex gap-1 mb-4">
								{[...Array(5)].map((_, i) => (
									<span key={i} className="text-yellow-400">
										★
									</span>
								))}
							</div>
							<p className="text-slate-300 mb-6">"{testimonial.quote}"</p>
							<div>
								<p className="font-semibold">{testimonial.name}</p>
								<p className="text-sm text-slate-500">{testimonial.role}</p>
							</div>
						</motion.div>
					))}
				</div>
			</section>

			{/* Pricing */}
			<section id="pricing" className="bg-slate-900 py-24 px-6">
				<div className="max-w-6xl mx-auto text-center">
					<h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
					<p className="text-slate-400 mb-12">
						Start free. Upgrade as you grow.
					</p>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-slate-800/50 rounded-3xl p-8 border border-slate-700">
							<h3 className="text-lg font-bold">TEST</h3>
							<p className="text-4xl font-bold mt-4">Free</p>
							<ul className="mt-6 space-y-3 text-sm text-slate-400 text-left">
								<li className="flex items-center gap-2">
									<Check className="text-green-400" size={16} /> 100 AI
									messages/month
								</li>
								<li className="flex items-center gap-2">
									<Check className="text-green-400" size={16} /> 5 documents
								</li>
								<li className="flex items-center gap-2">
									<Check className="text-green-400" size={16} /> 1 chat widget
								</li>
							</ul>
							<Link
								to="/signup"
								className="mt-8 block w-full bg-slate-700 text-white py-3 rounded-xl font-medium hover:bg-slate-600 transition-all"
							>
								Start Free
							</Link>
						</div>
						<div className="bg-blue-600 rounded-3xl p-8 shadow-xl shadow-blue-600/20 scale-105 border border-blue-500">
							<h3 className="text-lg font-bold">BASIC</h3>
							<p className="text-4xl font-bold mt-4">$29/mo</p>
							<ul className="mt-6 space-y-3 text-sm text-blue-100 text-left">
								<li className="flex items-center gap-2">
									<Check className="text-white" size={16} /> 2,000 AI
									messages/month
								</li>
								<li className="flex items-center gap-2">
									<Check className="text-white" size={16} /> 50 documents
								</li>
								<li className="flex items-center gap-2">
									<Check className="text-white" size={16} /> Custom widget
								</li>
								<li className="flex items-center gap-2">
									<Check className="text-white" size={16} /> Basic analytics
								</li>
							</ul>
							<Link
								to="/signup"
								className="mt-8 block w-full bg-white text-blue-600 py-3 rounded-xl font-medium hover:bg-slate-100 transition-all"
							>
								Start Trial
							</Link>
						</div>
						<div className="bg-slate-800/50 rounded-3xl p-8 border border-slate-700">
							<h3 className="text-lg font-bold">PRO</h3>
							<p className="text-4xl font-bold mt-4">$99/mo</p>
							<ul className="mt-6 space-y-3 text-sm text-slate-400 text-left">
								<li className="flex items-center gap-2">
									<Check className="text-green-400" size={16} /> Unlimited
									messages
								</li>
								<li className="flex items-center gap-2">
									<Check className="text-green-400" size={16} /> Unlimited
									documents
								</li>
								<li className="flex items-center gap-2">
									<Check className="text-green-400" size={16} /> Advanced
									analytics
								</li>
								<li className="flex items-center gap-2">
									<Check className="text-green-400" size={16} /> Priority
									support
								</li>
							</ul>
							<Link
								to="/signup"
								className="mt-8 block w-full bg-slate-700 text-white py-3 rounded-xl font-medium hover:bg-slate-600 transition-all"
							>
								Contact Sales
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="bg-slate-950 py-24 text-center px-6">
				<h3 className="text-4xl font-bold">Ready to automate support?</h3>
				<p className="mt-4 text-slate-400 text-lg">
					Start free – no credit card required.
				</p>
				<Link
					to="/signup"
					className="mt-8 inline-block bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
				>
					Get Started
				</Link>
			</section>

			{/* Footer */}
			<footer className="bg-slate-950 py-8 text-center text-slate-600 border-t border-slate-800">
				<p>© 2026 AI Support SaaS. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default Home;