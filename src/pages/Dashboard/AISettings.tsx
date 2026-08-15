import { useEffect, useState } from "react";
import { getCurrentBusiness } from "../../api/business";
import { getWidgetConfig, updateWidgetConfig } from "../../api/widget";
import { Bot, Save, CheckCircle2 } from "lucide-react";

const AISettings = () => {
	const [businessId, setBusinessId] = useState("");
	const [assistantName, setAssistantName] = useState("");
	const [welcomeMessage, setWelcomeMessage] = useState("");
	const [fallbackMessage, setFallbackMessage] = useState("");
	const [tone, setTone] = useState("friendly");
	const [language, setLanguage] = useState("English");
	const [saved, setSaved] = useState(false);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		const load = async () => {
			try {
				const biz = await getCurrentBusiness();
				setBusinessId(biz.id);
				const config = await getWidgetConfig(biz.id);
				setAssistantName(config.assistantName || "AI Assistant");
				setWelcomeMessage(
					config.welcomeMessage || "Hi! How can I help you today?",
				);
				setFallbackMessage(
					config.fallbackMessage ||
						"I don't have that information in my current knowledge base. Please contact the business directly for confirmation.",
				);
				setTone(config.tone || "friendly");
				setLanguage(config.language || "English");
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
			await updateWidgetConfig(businessId, {
				assistantName,
				welcomeMessage,
				fallbackMessage,
				tone,
				language,
			});
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		} catch (err) {
			console.error(err);
		} finally {
			setSaving(false);
		}
	};

	if (loading) return <AISettingsSkeleton />;

	return (
		<div className="max-w-3xl">
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-white flex items-center gap-2">
					<Bot className="text-blue-400" /> AI Assistant Settings
				</h1>
				<p className="text-slate-400 mt-1">
					Customize how your AI interacts with customers.
				</p>
			</div>

			<div className="bg-slate-800/80 rounded-2xl shadow-sm border border-slate-700 p-6 space-y-6">
				<div>
					<label className="block text-sm font-medium text-slate-300 mb-1">
						Assistant Name
					</label>
					<input
						type="text"
						value={assistantName}
						onChange={(e) => setAssistantName(e.target.value)}
						className="w-full px-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-800 text-white"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-slate-300 mb-1">
						Welcome Message
					</label>
					<textarea
						value={welcomeMessage}
						onChange={(e) => setWelcomeMessage(e.target.value)}
						rows={3}
						className="w-full px-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-800 text-white"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-slate-300 mb-1">
						Fallback Message
					</label>
					<textarea
						value={fallbackMessage}
						onChange={(e) => setFallbackMessage(e.target.value)}
						rows={3}
						className="w-full px-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-800 text-white"
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-slate-300 mb-1">
							Tone
						</label>
						<select
							value={tone}
							onChange={(e) => setTone(e.target.value)}
							className="w-full px-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-800 text-white"
						>
							<option value="professional">Professional</option>
							<option value="friendly">Friendly</option>
							<option value="casual">Casual</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-slate-300 mb-1">
							Language
						</label>
						<input
							type="text"
							value={language}
							onChange={(e) => setLanguage(e.target.value)}
							className="w-full px-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-800 text-white"
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

function AISettingsSkeleton() {
	return (
		<div className="max-w-3xl space-y-6">
			<div className="h-8 w-64 bg-slate-800 animate-shimmer rounded"></div>
			<div className="space-y-4">
				<div className="h-16 bg-slate-800 animate-shimmer rounded-2xl"></div>
				<div className="h-24 bg-slate-800 animate-shimmer rounded-2xl"></div>
				<div className="h-24 bg-slate-800 animate-shimmer rounded-2xl"></div>
			</div>
		</div>
	);
}

export default AISettings;