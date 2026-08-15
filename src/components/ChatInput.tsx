import { Send } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
	onSend: (message: string) => void;
	disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
	const [message, setMessage] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (message.trim() && !disabled) {
			onSend(message.trim());
			setMessage("");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="p-3 md:p-4 border-t border-slate-800 bg-slate-900/90 backdrop-blur-md"
		>
			<div className="flex items-center gap-2 md:gap-3 max-w-3xl mx-auto">
				<input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Type your message..."
					className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-blue-500 focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all text-white placeholder-slate-500 text-sm md:text-base"
					disabled={disabled}
					enterKeyHint="send"
				/>
				<button
					type="submit"
					disabled={disabled || !message.trim()}
					className="p-3 rounded-xl bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
				>
					<Send size={18} />
				</button>
			</div>
		</form>
	);
};

export default ChatInput;