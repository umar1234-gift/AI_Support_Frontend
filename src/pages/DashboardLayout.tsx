import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getCurrentBusiness } from "../api/business";
import { Bell, Search, Menu } from "lucide-react";

const DashboardLayout = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [businessName, setBusinessName] = useState("");
	const [sidebarOpen, setSidebarOpen] = useState(false);

	useEffect(() => {
		const checkBusiness = async () => {
			try {
				const business = await getCurrentBusiness();
				if (!business) {
					navigate("/dashboard/new-business");
				} else {
					setBusinessName(business.name);
				}
			} catch (error) {
				navigate("/login");
			} finally {
				setLoading(false);
			}
		};
		checkBusiness();
	}, [navigate]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-slate-900">
				<div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen bg-slate-900">
			<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
			<div className="flex-1 flex flex-col min-w-0">
				{/* Topbar */}
				<header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4 px-4 md:px-8 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<button
							className="md:hidden text-slate-400 hover:text-white"
							onClick={() => setSidebarOpen(true)}
						>
							<Menu size={24} />
						</button>
						<h1 className="text-xl md:text-2xl font-bold text-white truncate">
							{businessName}
						</h1>
					</div>
					<div className="flex items-center gap-2 md:gap-4">
						<div className="relative hidden sm:block">
							<Search
								className="absolute left-3 top-2.5 text-slate-500"
								size={18}
							/>
							<input
								type="text"
								placeholder="Search..."
								className="pl-10 pr-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-800 text-white placeholder-slate-500 w-48 md:w-64"
							/>
						</div>
						<button className="p-2 hover:bg-slate-800 rounded-xl relative">
							<Bell size={20} className="text-slate-400" />
							<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
						</button>
					</div>
				</header>
				<main className="flex-1 p-4 md:p-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;