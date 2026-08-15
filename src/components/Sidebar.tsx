import { NavLink } from "react-router-dom";
import {
	LayoutDashboard,
	Bot,
	Database,
	MessageSquare,
	BarChart3,
	Code2,
	Settings,
	LogOut,
} from "lucide-react";

const navItems = [
	{ to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
	{ to: "/dashboard/ai-settings", icon: Bot, label: "AI Assistant" },
	{ to: "/dashboard/knowledge", icon: Database, label: "Knowledge Base" },
	{
		to: "/dashboard/conversations",
		icon: MessageSquare,
		label: "Conversations",
	},
	{ to: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
	{ to: "/dashboard/widget", icon: Code2, label: "Widget" },
	{ to: "/dashboard/settings", icon: Settings, label: "Settings" },
];

const Sidebar = () => {
	return (
		<aside className="w-72 bg-slate-950 text-white flex flex-col fixed h-full border-r border-slate-800">
			<div className="p-6 border-b border-slate-800">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
						<Bot size={24} />
					</div>
					<div>
						<h2 className="text-lg font-bold">AI Support</h2>
						<p className="text-xs text-slate-400">Customer Support SaaS</p>
					</div>
				</div>
			</div>

			<nav className="flex-1 px-4 py-6 space-y-1">
				{navItems.map((item) => (
					<NavLink
						key={item.to}
						to={item.to}
						className={({ isActive }) =>
							`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
								isActive
									? "bg-blue-600 text-white shadow-lg"
									: "text-slate-400 hover:bg-slate-800 hover:text-white"
							}`
						}
					>
						<item.icon size={20} />
						<span className="text-sm font-medium">{item.label}</span>
					</NavLink>
				))}
			</nav>

			<div className="p-4 border-t border-slate-800">
				<button
					onClick={() => {
						localStorage.removeItem("token");
						window.location.href = "/login";
					}}
					className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm text-slate-300 transition-colors"
				>
					<LogOut size={18} />
					Logout
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;