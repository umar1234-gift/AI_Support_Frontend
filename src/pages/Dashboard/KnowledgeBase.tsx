import { useState, useEffect, useRef } from "react";
import { getCurrentBusiness } from "../../api/business";
import {
	getDocuments,
	uploadDocument,
	deleteDocument,
} from "../../api/documents";
import { getFaqs, createFaq,  deleteFaq } from "../../api/faqs";
import {
	Upload,
	FileText,
	Trash2,
	Plus,
	Search,
	Database,
	MessageSquare,
} from "lucide-react";

const KnowledgeBase = () => {
	const [businessId, setBusinessId] = useState("");
	const [documents, setDocuments] = useState<any[]>([]);
	const [faqs, setFaqs] = useState<any[]>([]);
	const [uploading, setUploading] = useState(false);
	const [showFaqForm, setShowFaqForm] = useState(false);
	const [faqQuestion, setFaqQuestion] = useState("");
	const [faqAnswer, setFaqAnswer] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const load = async () => {
			try {
				const biz = await getCurrentBusiness();
				setBusinessId(biz.id);
				const [docs, faqList] = await Promise.all([
					getDocuments(biz.id),
					getFaqs(biz.id),
				]);
				setDocuments(docs);
				setFaqs(faqList);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	const filteredFaqs = faqs.filter(
		(f) =>
			f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
			f.answer.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading(true);
		try {
			const newDoc = await uploadDocument(businessId, file);
			setDocuments((prev) => [newDoc, ...prev]);
		} catch (err) {
			console.error(err);
		} finally {
			setUploading(false);
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	};

	const handleAddFaq = async () => {
		if (!faqQuestion.trim() || !faqAnswer.trim()) return;
		const newFaq = await createFaq(businessId, faqQuestion, faqAnswer);
		setFaqs((prev) => [newFaq, ...prev]);
		setFaqQuestion("");
		setFaqAnswer("");
		setShowFaqForm(false);
	};

	const handleDeleteDocument = async (id: string) => {
		if (!confirm("Delete this document?")) return;
		await deleteDocument(businessId, id);
		setDocuments((prev) => prev.filter((d) => d.id !== id));
	};

	const handleDeleteFaq = async (id: string) => {
		if (!confirm("Delete this FAQ?")) return;
		await deleteFaq(businessId, id);
		setFaqs((prev) => prev.filter((f) => f.id !== id));
	};

	if (loading) {
		return <KnowledgeBaseSkeleton />;
	}

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-white">Knowledge Base</h1>
					<p className="text-slate-400 mt-1">
						Manage documents and FAQs for your AI assistant.
					</p>
				</div>
				<div className="flex gap-3">
					<button
						onClick={() => fileInputRef.current?.click()}
						disabled={uploading}
						className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-lg shadow-blue-600/20"
					>
						<Upload size={18} />
						{uploading ? "Uploading..." : "Upload PDF"}
					</button>
					<button
						onClick={() => setShowFaqForm(!showFaqForm)}
						className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
					>
						<Plus size={18} />
						Add FAQ
					</button>
					<input
						type="file"
						ref={fileInputRef}
						className="hidden"
						accept=".pdf"
						onChange={handleFileUpload}
					/>
				</div>
			</div>

			{/* Search */}
			<div className="relative max-w-md">
				<Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
				<input
					type="text"
					placeholder="Search FAQs..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="pl-10 pr-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-800 text-white placeholder-slate-500 w-full"
				/>
			</div>

			{/* Documents Section */}
			<div className="bg-slate-800/80 rounded-2xl shadow-sm border border-slate-700 overflow-hidden">
				<div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
					<h2 className="font-semibold text-white">Documents</h2>
					<Database className="text-slate-500" size={20} />
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead className="bg-slate-900/50 text-slate-400 uppercase text-xs">
							<tr>
								<th className="px-6 py-3 text-left font-medium">File</th>
								<th className="px-6 py-3 text-left font-medium">Status</th>
								<th className="px-6 py-3 text-left font-medium">Chunks</th>
								<th className="px-6 py-3 text-left font-medium">Date</th>
								<th className="px-6 py-3 text-right font-medium">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-700">
							{documents.length === 0 ? (
								<tr>
									<td colSpan={5} className="px-6 py-12 text-center">
										<FileText
											className="mx-auto text-slate-600 mb-3"
											size={40}
										/>
										<p className="text-slate-400">No documents uploaded yet.</p>
										<button
											onClick={() => fileInputRef.current?.click()}
											className="mt-4 text-blue-400 hover:underline text-sm font-medium"
										>
											Upload your first PDF
										</button>
									</td>
								</tr>
							) : (
								documents.map((doc) => (
									<tr
										key={doc.id}
										className="hover:bg-slate-700/50 transition-colors"
									>
										<td className="px-6 py-4 font-medium text-white">
											{doc.filename}
										</td>
										<td className="px-6 py-4">
											<span
												className={`px-2.5 py-1 rounded-full text-xs font-medium ${
													doc.status === "READY"
														? "bg-emerald-500/10 text-emerald-400"
														: doc.status === "FAILED"
															? "bg-red-500/10 text-red-400"
															: "bg-yellow-500/10 text-yellow-400"
												}`}
											>
												{doc.status}
											</span>
										</td>
										<td className="px-6 py-4 text-slate-400">
											{doc.chunkCount}
										</td>
										<td className="px-6 py-4 text-slate-400">
											{new Date(doc.createdAt).toLocaleDateString()}
										</td>
										<td className="px-6 py-4 text-right">
											<button
												onClick={() => handleDeleteDocument(doc.id)}
												className="text-red-400 hover:text-red-300 transition-colors"
											>
												<Trash2 size={18} />
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* FAQ Section */}
			<div className="bg-slate-800/80 rounded-2xl shadow-sm border border-slate-700 overflow-hidden">
				<div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
					<h2 className="font-semibold text-white">FAQs</h2>
					<span className="text-sm text-slate-400">
						{filteredFaqs.length} total
					</span>
				</div>

				{showFaqForm && (
					<div className="p-6 bg-slate-900/50 border-b border-slate-700">
						<div className="space-y-3">
							<input
								type="text"
								placeholder="Question"
								value={faqQuestion}
								onChange={(e) => setFaqQuestion(e.target.value)}
								className="w-full px-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-800 text-white placeholder-slate-500"
							/>
							<textarea
								placeholder="Answer"
								value={faqAnswer}
								onChange={(e) => setFaqAnswer(e.target.value)}
								rows={3}
								className="w-full px-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-800 text-white placeholder-slate-500"
							/>
							<div className="flex gap-2">
								<button
									onClick={handleAddFaq}
									className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
								>
									Save
								</button>
								<button
									onClick={() => setShowFaqForm(false)}
									className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}

				<div className="divide-y divide-slate-700">
					{filteredFaqs.length === 0 ? (
						<div className="px-6 py-12 text-center">
							<MessageSquare
								className="mx-auto text-slate-600 mb-3"
								size={40}
							/>
							<p className="text-slate-400">No FAQs found.</p>
							<button
								onClick={() => setShowFaqForm(true)}
								className="mt-4 text-blue-400 hover:underline text-sm font-medium"
							>
								Add your first FAQ
							</button>
						</div>
					) : (
						filteredFaqs.map((faq) => (
							<div
								key={faq.id}
								className="px-6 py-4 flex items-start justify-between group hover:bg-slate-700/50 transition-colors"
							>
								<div className="flex-1">
									<p className="font-medium text-white">{faq.question}</p>
									<p className="text-sm text-slate-400 mt-1">{faq.answer}</p>
								</div>
								<button
									onClick={() => handleDeleteFaq(faq.id)}
									className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
								>
									<Trash2 size={18} />
								</button>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

function KnowledgeBaseSkeleton() {
	return (
		<div className="space-y-8">
			<div className="h-8 w-64 bg-slate-800 animate-shimmer rounded"></div>
			<div className="h-10 w-72 bg-slate-800 animate-shimmer rounded-xl"></div>
			<div className="space-y-4">
				<div className="h-32 bg-slate-800 animate-shimmer rounded-2xl"></div>
				<div className="h-64 bg-slate-800 animate-shimmer rounded-2xl"></div>
			</div>
		</div>
	);
}

export default KnowledgeBase;