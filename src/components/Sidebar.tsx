import { NavLink, useNavigate } from "react-router-dom";
import {
	LayoutDashboard,
	Bot,
	Database,
	MessageSquare,
	BarChart3,
	Code2,
	Settings,
	LogOut,
	X,
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

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
	const navigate = useNavigate();

	return (
		<>
			{/* Overlay for mobile */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 md:hidden"
					onClick={onClose}
				></div>
			)}

			{/* Sidebar */}
			<aside
				className={`fixed inset-y-0 left-0 w-72 bg-slate-950 text-white flex flex-col border-r border-slate-800 z-50 transform transition-transform duration-300 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} md:translate-x-0 md:static md:h-screen`}
			>
				<div className="p-6 border-b border-slate-800 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
							<Bot size={24} />
						</div>
						<div>
							<h2 className="text-lg font-bold">AI Support</h2>
							<p className="text-xs text-slate-400">Customer Support SaaS</p>
						</div>
					</div>
					<button
						className="md:hidden text-slate-400 hover:text-white"
						onClick={onClose}
					>
						<X size={24} />
					</button>
				</div>

				<nav className="flex-1 px-4 py-6 space-y-1">
					{navItems.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							onClick={onClose}
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
		</>
	);
};

export default Sidebar;