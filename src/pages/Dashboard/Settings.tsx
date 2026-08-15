import { useState } from "react";
import { getCurrentBusiness, updateBusiness } from "../../api/business";
import { useEffect } from "react";
import {
	Settings as SettingsIcon,
	Save,
	CheckCircle2,
	Store,
	Globe,
	Mail,
	Phone,
	Clock,
} from "lucide-react";

const Settings = () => {
	const [business, setBusiness] = useState<any>(null);
	const [name, setName] = useState("");
	const [slug, setSlug] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [contactEmail, setContactEmail] = useState("");
	const [contactPhone, setContactPhone] = useState("");
	const [timezone, setTimezone] = useState("UTC");
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		const load = async () => {
			try {
				const biz = await getCurrentBusiness();
				setBusiness(biz);
				setName(biz.name || "");
				setSlug(biz.slug || "");
				setDescription(biz.description || "");
				setCategory(biz.category || "");
				setContactEmail(biz.contactEmail || "");
				setContactPhone(biz.contactPhone || "");
				setTimezone(biz.timezone || "UTC");
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	const handleSave = async () => {
		setSaving(true);
		try {
			await updateBusiness(business.id, {
				name,
				slug,
				description,
				category,
				contactEmail,
				contactPhone,
				timezone,
			});
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		} catch (err) {
			console.error(err);
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<div className="h-64 bg-slate-800 animate-shimmer rounded-2xl"></div>
		);
	}

	return (
		<div className="max-w-3xl">
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-white flex items-center gap-2">
					<SettingsIcon className="text-blue-400" /> Business Settings
				</h1>
				<p className="text-slate-400 mt-1">
					Manage your business profile and contact details.
				</p>
			</div>

			<div className="bg-slate-800/80 rounded-2xl shadow-sm border border-slate-700 p-6 space-y-6">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-slate-300 mb-1">
							Business Name
						</label>
						<div className="relative">
							<Store
								className="absolute left-3 top-3 text-slate-500"
								size={18}
							/>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-900 text-white"
							/>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-slate-300 mb-1">
							Slug
						</label>
						<div className="relative">
							<Globe
								className="absolute left-3 top-3 text-slate-500"
								size={18}
							/>
							<input
								type="text"
								value={slug}
								onChange={(e) =>
									setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))
								}
								className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-900 text-white"
							/>
						</div>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-slate-300 mb-1">
						Description
					</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						rows={3}
						className="w-full px-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-900 text-white"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-slate-300 mb-1">
						Category
					</label>
					<input
						type="text"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className="w-full px-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-900 text-white"
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-slate-300 mb-1">
							Contact Email
						</label>
						<div className="relative">
							<Mail
								className="absolute left-3 top-3 text-slate-500"
								size={18}
							/>
							<input
								type="email"
								value={contactEmail}
								onChange={(e) => setContactEmail(e.target.value)}
								className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-900 text-white"
							/>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-slate-300 mb-1">
							Contact Phone
						</label>
						<div className="relative">
							<Phone
								className="absolute left-3 top-3 text-slate-500"
								size={18}
							/>
							<input
								type="text"
								value={contactPhone}
								onChange={(e) => setContactPhone(e.target.value)}
								className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-900 text-white"
							/>
						</div>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-slate-300 mb-1">
						Timezone
					</label>
					<div className="relative">
						<Clock className="absolute left-3 top-3 text-slate-500" size={18} />
						<input
							type="text"
							value={timezone}
							onChange={(e) => setTimezone(e.target.value)}
							className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-900 text-white"
						/>
					</div>
				</div>

				<div className="flex items-center gap-3 pt-2">
					<button
						onClick={handleSave}
						disabled={saving}
						className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
					>
						{saving ? (
							<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
						) : (
							<Save size={18} />
						)}
						{saved ? "Saved!" : "Save Settings"}
					</button>
					{saved && <CheckCircle2 className="text-emerald-400" size={24} />}
				</div>
			</div>
		</div>
	);
};

export default Settings;