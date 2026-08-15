import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { verifyEmail } from "../api/auth";
import { MailCheck, XCircle, Loader2 } from "lucide-react";

const VerifyEmail = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");
	const [status, setStatus] = useState<"loading" | "success" | "error">(
		"loading",
	);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const verify = async () => {
			if (!token) {
				setStatus("error");
				setMessage("Verification token missing.");
				return;
			}
			try {
				const response = await verifyEmail(token);
				if (response.success === true) {
					setStatus("success");
					setMessage(response.message || "Email verified successfully!");
				} else {
					setStatus("error");
					setMessage(response.message || "Verification failed.");
				}
			} catch (err: any) {
				setStatus("error");
				setMessage(
					err.response?.data?.message ||
						"Verification failed. Token may be invalid or expired.",
				);
			}
		};
		verify();
	}, [token]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
			<div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 max-w-md w-full text-center">
				{status === "loading" && (
					<div className="space-y-4">
						<Loader2 className="mx-auto text-blue-400 animate-spin" size={48} />
						<p className="text-white">Verifying email...</p>
					</div>
				)}
				{status === "success" && (
					<div className="space-y-4">
						<MailCheck className="mx-auto text-emerald-400" size={48} />
						<h1 className="text-2xl font-bold text-white">Email Verified!</h1>
						<p className="text-slate-300">{message}</p>
						<Link
							to="/login"
							className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
						>
							Go to Login
						</Link>
					</div>
				)}
				{status === "error" && (
					<div className="space-y-4">
						<XCircle className="mx-auto text-red-400" size={48} />
						<h1 className="text-2xl font-bold text-white">
							Verification Failed
						</h1>
						<p className="text-slate-300">{message}</p>
						<Link
							to="/signup"
							className="inline-block bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-600 transition-colors"
						>
							Back to Signup
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default VerifyEmail;