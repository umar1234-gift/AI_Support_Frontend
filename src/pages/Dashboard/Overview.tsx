import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentBusiness } from "../../api/business";
import { getAnalyticsOverview } from "../../api/analytics";
import {
	MessageSquare,
	Database,
	Bot,
	Users,
	Copy,
	ExternalLink,
	TrendingUp,
	Plus,
} from "lucide-react";
import { motion } from "framer-motion";

const Overview = () => {
	const [data, setData] = useState<any>(null);
	const [business, setBusiness] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const biz = await getCurrentBusiness();
				setBusiness(biz);
				if (biz) {
					const analytics = await getAnalyticsOverview(biz.id);
					setData(analytics);
				}
			} catch (error) {
				console.error("Failed to load overview", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const chatUrl = business
		? `${window.location.origin}/chat/${business.slug}`
		: "";

	const copyChatUrl = () => {
		navigator.clipboard.writeText(chatUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	if (loading) {
		return <OverviewSkeleton />;
	}

	if (!business)
		return (
			<div className="text-center py-20 text-slate-400">No business found.</div>
		);

	const stats = [
		{
			label: "Total Conversations",
			value: data?.totalConversations || 0,
			icon: MessageSquare,
			color: "bg-blue-500/10",
			iconColor: "text-blue-400",
			trend: "+12%",
		},
		{
			label: "Total Messages",
			value: data?.totalMessages || 0,
			icon: MessageSquare,
			color: "bg-emerald-500/10",
			iconColor: "text-emerald-400",
			trend: "+8%",
		},
		{
			label: "Documents",
			value: data?.totalDocuments || 0,
			icon: Database,
			color: "bg-purple-500/10",
			iconColor: "text-purple-400",
			trend: "+5%",
		},
		{
			label: "FAQs",
			value: data?.totalFaqs || 0,
			icon: Bot,
			color: "bg-orange-500/10",
			iconColor: "text-orange-400",
			trend: "+3%",
		},
	];

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-white">
						Welcome back, {business.name}
					</h1>
					<p className="text-slate-400 mt-1">
						Here's what's happening with your AI assistant.
					</p>
				</div>
				<Link
					to="/dashboard/knowledge"
					className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
				>
					<Plus size={18} />
					Add Knowledge
				</Link>
			</div>

			{/* Chat URL Banner */}
			<div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-600/20">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
					<div>
						<h2 className="text-lg font-semibold">Your Public Chat Link</h2>
						<p className="text-sm text-blue-100 mt-1">
							Share this link with customers to chat with your AI assistant.
						</p>
					</div>
					<div className="flex items-center gap-3">
						<input
							type="text"
							value={chatUrl}
							readOnly
							className="flex-1 md:flex-none md:w-96 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none"
						/>
						<button
							onClick={copyChatUrl}
							className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors"
						>
							<Copy size={18} />
							{copied ? "Copied!" : "Copy"}
						</button>
						<a
							href={chatUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 bg-blue-700/50 text-white px-4 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
						>
							<ExternalLink size={18} />
							Open
						</a>
					</div>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, idx) => (
					<motion.div
						key={idx}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: idx * 0.1 }}
						className="bg-slate-800/80 rounded-3xl p-6 shadow-sm border border-slate-700 hover:border-slate-600 transition-colors"
					>
						<div className="flex items-center justify-between mb-4">
							<div className={`p-3 ${stat.color} rounded-2xl`}>
								<stat.icon className={stat.iconColor} size={24} />
							</div>
							<span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
								<TrendingUp size={14} />
								{stat.trend}
							</span>
						</div>
						<p className="text-sm text-slate-400">{stat.label}</p>
						<p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
					</motion.div>
				))}
			</div>

			{/* Recent Conversations + Quick Actions */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 bg-slate-800/80 rounded-3xl shadow-sm border border-slate-700 p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-lg font-semibold text-white">
							Recent Conversations
						</h2>
						<Link
							to="/dashboard/conversations"
							className="text-sm text-blue-400 hover:underline"
						>
							View all
						</Link>
					</div>
					{data?.recentConversations?.length ? (
						<div className="space-y-4">
							{data.recentConversations.map((conv: any) => (
								<div
									key={conv.id}
									className="flex items-center justify-between p-4 hover:bg-slate-700/50 rounded-2xl transition-colors"
								>
									<div className="flex items-center gap-4">
										<div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
											<Users className="text-slate-400" size={18} />
										</div>
										<div>
											<p className="text-sm font-medium text-white">
												{conv.customerName || "Anonymous"}
											</p>
											<p className="text-xs text-slate-400">
												{conv.messages[0]?.content?.substring(0, 50)}...
											</p>
										</div>
									</div>
									<span
										className={`px-3 py-1 text-xs rounded-full ${
											conv.status === "OPEN"
												? "bg-emerald-500/10 text-emerald-400"
												: "bg-slate-700 text-slate-300"
										}`}
									>
										{conv.status}
									</span>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-12">
							<MessageSquare
								className="mx-auto text-slate-600 mb-3"
								size={48}
							/>
							<p className="text-slate-400">No conversations yet.</p>
						</div>
					)}
				</div>

				{/* Quick Actions */}
				<div className="bg-slate-800/80 rounded-3xl shadow-sm border border-slate-700 p-6 space-y-4">
					<h2 className="text-lg font-semibold text-white">Quick Actions</h2>
					<Link
						to="/dashboard/knowledge"
						className="block p-4 bg-slate-700/50 hover:bg-slate-700 rounded-2xl transition-colors"
					>
						<div className="flex items-center gap-3">
							<Database className="text-blue-400" size={20} />
							<span className="font-medium text-white">Upload Documents</span>
						</div>
					</Link>
					<Link
						to="/dashboard/ai-settings"
						className="block p-4 bg-slate-700/50 hover:bg-slate-700 rounded-2xl transition-colors"
					>
						<div className="flex items-center gap-3">
							<Bot className="text-indigo-400" size={20} />
							<span className="font-medium text-white">
								Configure AI Assistant
							</span>
						</div>
					</Link>
					<Link
						to="/dashboard/widget"
						className="block p-4 bg-slate-700/50 hover:bg-slate-700 rounded-2xl transition-colors"
					>
						<div className="flex items-center gap-3">
							<ExternalLink className="text-emerald-400" size={20} />
							<span className="font-medium text-white">Get Widget Code</span>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

function OverviewSkeleton() {
	return (
		<div className="space-y-8">
			<div className="h-10 w-64 bg-slate-800 animate-shimmer rounded"></div>
			<div className="h-24 bg-slate-800 animate-shimmer rounded-3xl"></div>
			<div className="grid grid-cols-4 gap-6">
				{[...Array(4)].map((_, i) => (
					<div
						key={i}
						className="h-32 bg-slate-800 animate-shimmer rounded-3xl"
					></div>
				))}
			</div>
			<div className="grid grid-cols-3 gap-6">
				<div className="col-span-2 h-96 bg-slate-800 animate-shimmer rounded-3xl"></div>
				<div className="h-96 bg-slate-800 animate-shimmer rounded-3xl"></div>
			</div>
		</div>
	);
}

export default Overview;