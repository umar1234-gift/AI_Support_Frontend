import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { verifyOtp } from "../api/auth";
import { ShieldCheck, XCircle, Loader2 } from "lucide-react";

const VerifyOtp = () => {
	const [searchParams] = useSearchParams();
	const email = searchParams.get("email") || "";
	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const data = await verifyOtp(email, otp);
			if (data.success) {
				setSuccess(true);
				setTimeout(() => navigate("/login"), 2000);
			}
		} catch (err: any) {
			setError(err.response?.data?.message || "Verification failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
					<div className="text-center mb-8">
						<div className="inline-flex p-3 bg-indigo-600/20 rounded-2xl mb-4">
							<ShieldCheck className="text-indigo-400" size={28} />
						</div>
						<h1 className="text-3xl font-bold text-white mb-2">Verify OTP</h1>
						<p className="text-slate-300 text-sm">
							Enter the 6-digit code sent to{" "}
							<span className="font-semibold text-white">{email}</span>
						</p>
					</div>

					{success ? (
						<div className="text-center space-y-4">
							<Loader2 className="mx-auto text-emerald-400" size={40} />
							<p className="text-emerald-300">
								Email verified successfully! Redirecting to login...
							</p>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<input
									type="text"
									value={otp}
									onChange={(e) =>
										setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
									}
									className="w-full bg-white/5 border border-white/20 rounded-xl py-3 px-4 text-center text-white text-2xl tracking-widest placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
									placeholder="••••••"
									maxLength={6}
									required
								/>
							</div>
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
									"Verify OTP"
								)}
							</button>
						</form>
					)}

					<p className="text-center text-slate-400 text-sm mt-6">
						Didn't receive code?{" "}
						<Link to="/signup" className="text-indigo-400 hover:underline">
							Resend / Go Back
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default VerifyOtp;