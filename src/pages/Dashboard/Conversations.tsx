import { useEffect, useState } from "react";
import { getCurrentBusiness } from "../../api/business";
import {
	getConversations,
	getConversation,
	updateConversationStatus,
} from "../../api/conversations";
import { MessageSquare, User, Search } from "lucide-react";


const Conversations = () => {
	const [businessId, setBusinessId] = useState("");
	const [conversations, setConversations] = useState<any[]>([]);
	const [selectedConversation, setSelectedConversation] = useState<any>(null);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			try {
				const biz = await getCurrentBusiness();
				setBusinessId(biz.id);
				const convos = await getConversations(biz.id);
				setConversations(convos);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	const filtered = conversations.filter((c) =>
		(c.customerName || "Anonymous")
			.toLowerCase()
			.includes(search.toLowerCase()),
	);

	const openConversation = async (id: string) => {
		const conv = await getConversation(businessId, id);
		setSelectedConversation(conv);
	};

	const changeStatus = async (convId: string, status: string) => {
		await updateConversationStatus(businessId, convId, status);
		setConversations((prev) =>
			prev.map((c) => (c.id === convId ? { ...c, status } : c)),
		);
		if (selectedConversation?.id === convId) {
			setSelectedConversation((prev: any) => ({ ...prev, status }));
		}
	};

	if (loading) {
		return <ConversationsSkeleton />;
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-white">Conversations</h1>
				<p className="text-slate-400 mt-1">
					View and manage customer interactions.
				</p>
			</div>

			<div className="relative max-w-md">
				<Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
				<input
					type="text"
					placeholder="Search conversations..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="pl-10 pr-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-800 text-white placeholder-slate-500 w-full"
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* List */}
				<div className="bg-slate-800/80 rounded-2xl shadow-sm border border-slate-700 overflow-hidden">
					<div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
						<h2 className="font-semibold text-white">All Conversations</h2>
						<span className="text-sm text-slate-400">{filtered.length}</span>
					</div>
					<div className="divide-y divide-slate-700 max-h-[600px] overflow-y-auto">
						{filtered.length === 0 ? (
							<div className="px-6 py-12 text-center">
								<MessageSquare
									className="mx-auto text-slate-600 mb-3"
									size={40}
								/>
								<p className="text-slate-400">No conversations yet.</p>
							</div>
						) : (
							filtered.map((conv) => (
								<div
									key={conv.id}
									onClick={() => openConversation(conv.id)}
									className={`px-6 py-4 cursor-pointer transition-colors hover:bg-slate-700/50 ${
										selectedConversation?.id === conv.id ? "bg-blue-600/10" : ""
									}`}
								>
									<div className="flex items-center justify-between mb-1">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
												<User className="text-slate-400" size={16} />
											</div>
											<p className="font-medium text-white">
												{conv.customerName || "Anonymous"}
											</p>
										</div>
										<span
											className={`px-2 py-1 text-xs rounded-full ${
												conv.status === "OPEN"
													? "bg-emerald-500/10 text-emerald-400"
													: "bg-slate-700 text-slate-300"
											}`}
										>
											{conv.status}
										</span>
									</div>
									<p className="text-sm text-slate-400 truncate">
										{conv.messages[0]?.content?.substring(0, 80)}...
									</p>
								</div>
							))
						)}
					</div>
				</div>

				{/* Detail */}
				<div className="bg-slate-800/80 rounded-2xl shadow-sm border border-slate-700 flex flex-col">
					{selectedConversation ? (
						<>
							<div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
								<h2 className="font-semibold text-white">
									Conversation Detail
								</h2>
								<select
									value={selectedConversation.status}
									onChange={(e) =>
										changeStatus(selectedConversation.id, e.target.value)
									}
									className="px-2 py-1 border border-slate-700 rounded-lg text-sm bg-slate-800 text-white"
								>
									<option value="OPEN">OPEN</option>
									<option value="RESOLVED">RESOLVED</option>
									<option value="CLOSED">CLOSED</option>
								</select>
							</div>
							<div className="flex-1 overflow-y-auto p-6 space-y-4">
								{selectedConversation.messages.map((msg: any) => (
									<div
										key={msg.id}
										className={`flex ${msg.role === "USER" ? "justify-end" : "justify-start"}`}
									>
										<div
											className={`max-w-[80%] px-4 py-2 rounded-2xl ${
												msg.role === "USER"
													? "bg-blue-600 text-white"
													: "bg-slate-700 text-slate-200"
											}`}
										>
											<p className="text-sm">{msg.content}</p>
											<span className="text-xs opacity-70">
												{new Date(msg.createdAt).toLocaleTimeString()}
											</span>
										</div>
									</div>
								))}
							</div>
						</>
					) : (
						<div className="flex-1 flex items-center justify-center p-8">
							<div className="text-center">
								<MessageSquare
									className="mx-auto text-slate-600 mb-3"
									size={48}
								/>
								<p className="text-slate-400">
									Select a conversation to view messages.
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

function ConversationsSkeleton() {
	return (
		<div className="space-y-6">
			<div className="h-8 w-64 bg-slate-800 animate-shimmer rounded"></div>
			<div className="h-10 w-72 bg-slate-800 animate-shimmer rounded-xl"></div>
			<div className="grid grid-cols-2 gap-6">
				<div className="h-96 bg-slate-800 animate-shimmer rounded-2xl"></div>
				<div className="h-96 bg-slate-800 animate-shimmer rounded-2xl"></div>
			</div>
		</div>
	);
}

export default Conversations;