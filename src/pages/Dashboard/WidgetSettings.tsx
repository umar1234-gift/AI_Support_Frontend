import { useEffect, useState } from "react";
import { getCurrentBusiness } from "../../api/business";
import { getWidgetConfig, updateWidgetConfig } from "../../api/widget";
import { Code2, Copy, Check, ExternalLink } from "lucide-react";

const WidgetSettings = () => {
	const [businessId, setBusinessId] = useState("");
	const [config, setConfig] = useState<any>(null);
	const [primaryColor, setPrimaryColor] = useState("#3B82F6");
	const [position, setPosition] = useState("bottom-right");
	const [enabled, setEnabled] = useState(true);
	const [copied, setCopied] = useState(false);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		const load = async () => {
			try {
				const biz = await getCurrentBusiness();
				setBusinessId(biz.id);
				const widget = await getWidgetConfig(biz.id);
				setConfig(widget);
				setPrimaryColor(widget.primaryColor || "#3B82F6");
				setPosition(widget.position || "bottom-right");
				setEnabled(widget.enabled ?? true);
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
			await updateWidgetConfig(businessId, { primaryColor, position, enabled });
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		} catch (err) {
			console.error(err);
		} finally {
			setSaving(false);
		}
	};

	const backendUrl = window.location.origin;
	const embedCode = `<script src="${backendUrl}/api/widget/script.js" data-business-key="${config?.widgetKey}"></script>`;

	const copyCode = () => {
		navigator.clipboard.writeText(embedCode);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	if (loading) return <WidgetSkeleton />;

	return (
		<div className="max-w-4xl">
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-white flex items-center gap-2">
					<Code2 className="text-blue-400" /> Website Widget
				</h1>
				<p className="text-slate-400 mt-1">
					Add AI chat to your website in minutes.
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="bg-slate-800/80 rounded-2xl shadow-sm border border-slate-700 p-6 space-y-6">
					<h2 className="text-lg font-semibold text-white">Customization</h2>
					<div>
						<label className="block text-sm font-medium text-slate-300 mb-2">
							Primary Color
						</label>
						<div className="flex items-center gap-3">
							<input
								type="color"
								value={primaryColor}
								onChange={(e) => setPrimaryColor(e.target.value)}
								className="w-16 h-10 rounded-lg border border-slate-700 cursor-pointer"
							/>
							<input
								type="text"
								value={primaryColor}
								onChange={(e) => setPrimaryColor(e.target.value)}
								className="px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-800 text-white w-28"
							/>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-slate-300 mb-2">
							Position
						</label>
						<select
							value={position}
							onChange={(e) => setPosition(e.target.value)}
							className="w-full px-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-800 text-white"
						>
							<option value="bottom-right">Bottom Right</option>
							<option value="bottom-left">Bottom Left</option>
						</select>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium text-slate-300">Enabled</span>
						<label className="relative inline-flex items-center cursor-pointer">
							<input
								type="checkbox"
								checked={enabled}
								onChange={(e) => setEnabled(e.target.checked)}
								className="sr-only peer"
							/>
							<div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-600 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
						</label>
					</div>
					<button
						onClick={handleSave}
						disabled={saving}
						className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
					>
						{saving ? (
							<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
						) : saved ? (
							<Check size={18} />
						) : null}
						{saved ? "Saved!" : "Save Settings"}
					</button>
				</div>

				<div className="bg-slate-800/80 rounded-2xl shadow-sm border border-slate-700 p-6">
					<h2 className="text-lg font-semibold text-white mb-4">Embed Code</h2>
					<p className="text-sm text-slate-400 mb-4">
						Copy and paste this snippet before the closing{" "}
						<code>&lt;/body&gt;</code> tag on your website.
					</p>
					<div className="bg-slate-900 text-white p-4 rounded-xl overflow-x-auto relative">
						<pre className="text-sm whitespace-pre-wrap break-all">
							{embedCode}
						</pre>
						<button
							onClick={copyCode}
							className="absolute top-3 right-3 bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors"
						>
							{copied ? <Check size={18} /> : <Copy size={18} />}
						</button>
					</div>
					<a
						href={`${backendUrl}/api/widget/script.js`}
						target="_blank"
						className="mt-4 inline-flex items-center gap-2 text-blue-400 hover:underline text-sm"
					>
						<ExternalLink size={16} /> Preview Widget Script
					</a>
				</div>
			</div>
		</div>
	);
};

function WidgetSkeleton() {
	return (
		<div className="max-w-4xl space-y-6">
			<div className="h-8 w-64 bg-slate-800 animate-shimmer rounded"></div>
			<div className="grid grid-cols-2 gap-8">
				<div className="h-80 bg-slate-800 animate-shimmer rounded-2xl"></div>
				<div className="h-80 bg-slate-800 animate-shimmer rounded-2xl"></div>
			</div>
		</div>
	);
}

export default WidgetSettings;