import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import DashboardLayout from "./pages/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Overview from "./pages/Dashboard/Overview";
import KnowledgeBase from "./pages/Dashboard/KnowledgeBase";
import Conversations from "./pages/Dashboard/Conversations";
import AISettings from "./pages/Dashboard/AISettings";
import WidgetSettings from "./pages/Dashboard/WidgetSettings";
import Analytics from "./pages/Dashboard/Analytics";
import CreateBusiness from "./pages/Dashboard/CreateBusiness";
import PublicChatPage from "./pages/PublicChatPage";
import VerifyOtp from "./pages/VerifyOtp";
import Settings from "./pages/Dashboard/Settings";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/verify-email" element={<VerifyEmail />} />
				<Route path="/verify-otp" element={<VerifyOtp />} />
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<DashboardLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Overview />} />
					<Route path="knowledge" element={<KnowledgeBase />} />
					<Route path="conversations" element={<Conversations />} />
					<Route path="ai-settings" element={<AISettings />} />
					<Route path="settings" element={<Settings />} />
					<Route path="widget" element={<WidgetSettings />} />
					<Route path="analytics" element={<Analytics />} />
					<Route path="new-business" element={<CreateBusiness />} />
				</Route>
				<Route path="/chat/:slug" element={<PublicChatPage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;