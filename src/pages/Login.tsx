import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Eye, EyeOff, LogIn } from "lucide-react";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const data = await login(email, password);
			localStorage.setItem("token", data.token);
			navigate("/dashboard");
		} catch (err: any) {
			setError(err.response?.data?.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-4">
			<Card className="w-full max-w-md bg-slate-900/80 border-slate-800 backdrop-blur-xl">
				<CardHeader className="text-center space-y-2">
					<div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/20">
						<LogIn className="w-6 h-6 text-blue-400" />
					</div>
					<CardTitle className="text-2xl font-bold text-white">
						Welcome Back
					</CardTitle>
					<CardDescription className="text-slate-400">
						Sign in to your dashboard
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-5">
						<div className="space-y-2">
							<label className="text-sm font-medium text-slate-300">
								Email
							</label>
							<Input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:ring-blue-500"
								placeholder="Email address"
								required
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-slate-300">
								Password
							</label>
							<div className="relative">
								<Input
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:ring-blue-500 pr-10"
									placeholder="Password"
									required
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-2.5 text-slate-400 hover:text-white transition-colors"
								>
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
						</div>
						{error && (
							<div className="bg-red-500/20 border border-red-500/50 text-red-300 px-3 py-2 rounded-lg text-sm">
								{error}
							</div>
						)}
						<Button
							type="submit"
							disabled={loading}
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
						>
							{loading ? "Signing in..." : "Sign In"}
						</Button>
					</form>
					<p className="text-center text-slate-400 text-sm mt-4">
						Don't have an account?{" "}
						<Link to="/signup" className="text-blue-400 hover:underline">
							Sign Up
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default Login;