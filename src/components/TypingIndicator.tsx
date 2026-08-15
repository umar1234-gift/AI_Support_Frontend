const TypingIndicator = () => (
	<div className="flex items-center space-x-2 px-3 py-2 max-w-[80%] mr-auto">
		<div className="bg-slate-700 rounded-2xl px-4 py-3 shadow-sm border border-slate-600">
			<div className="flex space-x-1.5">
				<span
					className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
					style={{ animationDelay: "0ms" }}
				/>
				<span
					className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
					style={{ animationDelay: "150ms" }}
				/>
				<span
					className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
					style={{ animationDelay: "300ms" }}
				/>
			</div>
		</div>
	</div>
);

export default TypingIndicator;