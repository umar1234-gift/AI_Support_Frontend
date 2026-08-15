import { useEffect, useState } from "react";
import { getCurrentBusiness } from "../../api/business";
import { getAnalyticsOverview } from "../../api/analytics";
import { BarChart3, TrendingUp, MessageSquare, Database } from "lucide-react";

const Analytics = () => {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			try {
				const biz = await getCurrentBusiness();
				const analytics = await getAnalyticsOverview(biz.id);
				setData(analytics);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	if (loading) return <AnalyticsSkeleton />;

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-white flex items-center gap-2">
					<BarChart3 className="text-blue-400" /> Analytics
				</h1>
				<p className="text-slate-400 mt-1">
					Track your AI assistant performance.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<div className="bg-slate-800/80 rounded-2xl p-6 shadow-sm border border-slate-700">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-blue-500/10 rounded-2xl">
							<MessageSquare className="text-blue-400" size={24} />
						</div>
						<div>
							<p className="text-sm text-slate-400">Conversations</p>
							<p className="text-3xl font-bold text-white">
								{data?.totalConversations || 0}
							</p>
						</div>
					</div>
				</div>
				<div className="bg-slate-800/80 rounded-2xl p-6 shadow-sm border border-slate-700">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-emerald-500/10 rounded-2xl">
							<MessageSquare className="text-emerald-400" size={24} />
						</div>
						<div>
							<p className="text-sm text-slate-400">Total Messages</p>
							<p className="text-3xl font-bold text-white">
								{data?.totalMessages || 0}
							</p>
						</div>
					</div>
				</div>
				<div className="bg-slate-800/80 rounded-2xl p-6 shadow-sm border border-slate-700">
					<div className="flex items-center gap-4">
						<div className="p-3 bg-purple-500/10 rounded-2xl">
							<Database className="text-purple-400" size={24} />
						</div>
						<div>
							<p className="text-sm text-slate-400">Documents</p>
							<p className="text-3xl font-bold text-white">
								{data?.totalDocuments || 0}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-slate-800/80 rounded-2xl shadow-sm border border-slate-700 p-8 text-center">
				<TrendingUp className="mx-auto text-slate-600 mb-3" size={48} />
				<p className="text-slate-400">Detailed analytics coming soon.</p>
				<p className="text-sm text-slate-500 mt-1">
					Track message trends, popular questions, and more.
				</p>
			</div>
		</div>
	);
};

function AnalyticsSkeleton() {
	return (
		<div className="space-y-6">
			<div className="h-8 w-64 bg-slate-800 animate-shimmer rounded"></div>
			<div className="grid grid-cols-3 gap-6">
				{[...Array(3)].map((_, i) => (
					<div
						key={i}
						className="h-32 bg-slate-800 animate-shimmer rounded-2xl"
					></div>
				))}
			</div>
			<div className="h-64 bg-slate-800 animate-shimmer rounded-2xl"></div>
		</div>
	);
}

export default Analytics;