import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../api/auth";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState(0);
	const navigate = useNavigate();

	const calculateStrength = (pwd: string) => {
		let score = 0;
		if (pwd.length >= 6) score++;
		if (pwd.length >= 10) score++;
		if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
		if (/\d/.test(pwd)) score++;
		if (/[^A-Za-z0-9]/.test(pwd)) score++;
		setPasswordStrength(score);
	};

	const strengthLabel =
		["Very Weak", "Weak", "Fair", "Good", "Strong"][passwordStrength] || "";
	const strengthColor =
		[
			"bg-red-500",
			"bg-orange-500",
			"bg-yellow-500",
			"bg-emerald-500",
			"bg-green-500",
		][passwordStrength] || "";

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const data = await signup(name, email, password);
			localStorage.setItem("token", data.token);
			navigate("/dashboard");
		} catch (err: any) {
			setError(err.response?.data?.message || "Signup failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
			<div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl"></div>
			<div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl"></div>

			<div className="w-full max-w-md relative z-10">
				<div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
					<div className="text-center mb-8">
						<div className="inline-flex p-3 bg-indigo-600/20 rounded-2xl mb-4">
							<UserPlus className="text-indigo-400" size={28} />
						</div>
						<h1 className="text-3xl font-bold text-white mb-2">
							Create Account
						</h1>
						<p className="text-slate-300 text-sm">
							Start your AI assistant journey
						</p>
					</div>
					<form onSubmit={handleSubmit} className="space-y-5">
						<div className="relative group">
							<User
								className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-indigo-400 transition-colors"
								size={20}
							/>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full bg-white/5 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
								placeholder="Full name"
								required
							/>
						</div>
						<div className="relative group">
							<Mail
								className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-indigo-400 transition-colors"
								size={20}
							/>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full bg-white/5 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
								placeholder="Email address"
								required
							/>
						</div>
						<div className="relative group">
							<Lock
								className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-indigo-400 transition-colors"
								size={20}
							/>
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									calculateStrength(e.target.value);
								}}
								className="w-full bg-white/5 border border-white/20 rounded-xl py-3 pl-10 pr-12 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
								placeholder="Password (min 6 characters)"
								minLength={6}
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-3 text-slate-400 hover:text-white transition-colors"
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
						{password && (
							<div className="mt-2">
								<div className="flex space-x-1 mb-1">
									{[1, 2, 3, 4, 5].map((i) => (
										<div
											key={i}
											className={`h-1 flex-1 rounded-full ${i <= passwordStrength ? strengthColor : "bg-slate-600"}`}
										/>
									))}
								</div>
								<span className="text-xs text-slate-400">
									{strengthLabel && `Password strength: ${strengthLabel}`}
								</span>
							</div>
						)}
						{error && (
							<div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-2 rounded-xl text-sm">
								{error}
							</div>
						)}
						<button
							type="submit"
							disabled={loading}
							className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
						>
							{loading ? (
								<span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
							) : (
								"Sign Up"
							)}
						</button>
					</form>
					<p className="text-center text-slate-400 text-sm mt-6">
						Already have an account?{" "}
						<Link to="/login" className="text-indigo-400 hover:underline">
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Signup;