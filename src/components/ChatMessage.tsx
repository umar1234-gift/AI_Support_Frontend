import { User, Bot } from "lucide-react";

interface ChatMessageProps {
	role: "USER" | "ASSISTANT";
	content: string;
	timestamp?: string;
}

const ChatMessage = ({ role, content, timestamp }: ChatMessageProps) => {
	const isUser = role === "USER";
	return (
		<div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
			<div
				className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} items-start gap-3 max-w-[85%] md:max-w-[70%]`}
			>
				<div
					className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
						isUser ? "bg-blue-600 text-white" : "bg-slate-700 text-white"
					} shadow-lg`}
				>
					{isUser ? <User size={18} /> : <Bot size={18} />}
				</div>
				<div
					className={`relative px-4 py-3 rounded-2xl shadow-sm ${
						isUser
							? "bg-blue-600 text-white rounded-tr-none"
							: "bg-slate-700 text-slate-200 border border-slate-600 rounded-tl-none"
					}`}
				>
					<p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
						{content}
					</p>
					{timestamp && (
						<span
							className={`block mt-1 text-xs ${isUser ? "text-blue-200" : "text-slate-400"}`}
						>
							{new Date(timestamp).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							})}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default ChatMessage;