import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBusiness } from "../../api/business";
import { PlusCircle, Store, Link2, FileText } from "lucide-react";

const CreateBusiness = () => {
	const [name, setName] = useState("");
	const [slug, setSlug] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			await createBusiness({ name, slug, description, category });
			navigate("/dashboard");
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to create business");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto">
			<div className="text-center mb-8">
				<div className="inline-flex p-3 bg-blue-500/10 rounded-2xl mb-4">
					<PlusCircle className="text-blue-400" size={32} />
				</div>
				<h1 className="text-3xl font-bold text-white">Create Your Business</h1>
				<p className="text-slate-400 mt-2">
					Set up your AI assistant workspace
				</p>
			</div>

			<form
				onSubmit={handleSubmit}
				className="bg-slate-800/80 rounded-3xl shadow-sm border border-slate-700 p-8 space-y-6"
			>
				<div>
					<label className="block text-sm font-medium text-slate-300 mb-1">
						Business Name
					</label>
					<div className="relative">
						<Store className="absolute left-3 top-3 text-slate-500" size={18} />
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-900 text-white"
							placeholder="My Awesome Shop"
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-slate-300 mb-1">
						Slug (URL)
					</label>
					<div className="relative">
						<Link2 className="absolute left-3 top-3 text-slate-500" size={18} />
						<input
							type="text"
							value={slug}
							onChange={(e) =>
								setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))
							}
							required
							pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
							className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-900 text-white"
							placeholder="my-awesome-shop"
						/>
					</div>
					<p className="text-xs text-slate-500 mt-1">
						Your public chat URL will be: /chat/{slug || "..."}
					</p>
				</div>

				<div>
					<label className="block text-sm font-medium text-slate-300 mb-1">
						Description
					</label>
					<div className="relative">
						<FileText
							className="absolute left-3 top-3 text-slate-500"
							size={18}
						/>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							rows={3}
							className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-900 text-white"
							placeholder="Tell customers what you do"
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-slate-300 mb-1">
						Category
					</label>
					<input
						type="text"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-900 text-white"
						placeholder="Retail, Services, Healthcare..."
					/>
				</div>

				{error && (
					<div className="bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-2 rounded-xl text-sm">
						{error}
					</div>
				)}

				<button
					type="submit"
					disabled={loading}
					className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
				>
					{loading ? (
						<span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
					) : (
						"Create Business"
					)}
				</button>
			</form>
		</div>
	);
};

export default CreateBusiness;