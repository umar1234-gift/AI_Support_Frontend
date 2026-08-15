import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ChatMessage from "../components/ChatMessage";
import TypingIndicator from "../components/TypingIndicator";
import ChatInput from "../components/ChatInput";
import { Bot } from "lucide-react";

interface Message {
	role: "USER" | "ASSISTANT";
	content: string;
	timestamp: string;
}

interface BusinessConfig {
	businessName: string;
	assistantName: string;
	welcomeMessage: string;
	logoUrl?: string;
	primaryColor: string;
}

const PublicChatPage = () => {
	const { slug } = useParams<{ slug: string }>();
	const [messages, setMessages] = useState<Message[]>([]);
	const [sessionId, setSessionId] = useState<string | null>(() =>
		localStorage.getItem("chat_session_id"),
	);
	const [isTyping, setIsTyping] = useState(false);
	const [config, setConfig] = useState<BusinessConfig | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const API_BASE = import.meta.env.VITE_API_URL || "";

	useEffect(() => {
		const fetchConfig = async () => {
			try {
				const res = await fetch(`${API_BASE}/widget/${slug}/config`);
				if (res.ok) {
					const data = await res.json();
					setConfig(data);
					setMessages([
						{
							role: "ASSISTANT",
							content: data.welcomeMessage || "Hi! How can I help you?",
							timestamp: new Date().toISOString(),
						},
					]);
				} else {
					setFallbackConfig();
				}
			} catch (err) {
				console.error("Failed to load business info", err);
				setFallbackConfig();
			}
		};

		const setFallbackConfig = () => {
			setConfig({
				businessName: "Business",
				assistantName: "AI Assistant",
				welcomeMessage: "Hi! How can I help you today?",
				primaryColor: "#3B82F6",
			});
			setMessages([
				{
					role: "ASSISTANT",
					content: "Hi! How can I help you today?",
					timestamp: new Date().toISOString(),
				},
			]);
		};

		if (slug) fetchConfig();
	}, [slug]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isTyping]);

	const handleSend = async (content: string) => {
		if (!slug || !config) return;

		const userMessage: Message = {
			role: "USER",
			content,
			timestamp: new Date().toISOString(),
		};
		setMessages((prev) => [...prev, userMessage]);
		setIsTyping(true);

		const assistantMessage: Message = {
			role: "ASSISTANT",
			content: "",
			timestamp: new Date().toISOString(),
		};
		setMessages((prev) => [...prev, assistantMessage]);

		let fullResponse = "";
		const controller = new AbortController();

		try {
			const response = await fetch(`${API_BASE}/chat/public/${slug}/stream`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					message: content,
					sessionId: sessionId || undefined,
				}),
				signal: controller.signal,
			});

			if (!response.ok || !response.body)
				throw new Error("Network response was not ok");

			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let buffer = "";

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				buffer += decoder.decode(value, { stream: true });
				const lines = buffer.split("\n");
				buffer = lines.pop() || "";

				for (const line of lines) {
					if (line.startsWith("data: ")) {
						const data = line.slice(6);
						if (data === "[DONE]") break;
						try {
							const parsed = JSON.parse(data);
							if (parsed.sessionId) {
								setSessionId(parsed.sessionId);
								localStorage.setItem("chat_session_id", parsed.sessionId);
							}
							if (parsed.token) {
								fullResponse += parsed.token;
								setMessages((prev) => {
									const newMessages = [...prev];
									const last = newMessages[newMessages.length - 1];
									if (last.role === "ASSISTANT") {
										last.content = fullResponse;
									}
									return newMessages;
								});
							}
						} catch (e) {}
					}
				}
			}

			setMessages((prev) => {
				const newMessages = [...prev];
				const last = newMessages[newMessages.length - 1];
				if (last.role === "ASSISTANT") {
					last.content = fullResponse;
					last.timestamp = new Date().toISOString();
				}
				return newMessages;
			});
		} catch (error: any) {
			if (error.name === "AbortError") return;
			console.error("Stream error:", error);
			setMessages((prev) => {
				const newMessages = [...prev];
				const last = newMessages[newMessages.length - 1];
				if (last.role === "ASSISTANT") {
					last.content = "Sorry, something went wrong. Please try again later.";
				}
				return newMessages;
			});
		} finally {
			setIsTyping(false);
		}
	};

	if (!config) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
				Loading...
			</div>
		);
	}

	return (
		<div className="h-screen w-full bg-slate-950 md:flex md:items-center md:justify-center md:p-4">
			<div className="flex flex-col h-full w-full md:max-w-3xl md:h-[85vh] md:rounded-3xl md:shadow-2xl md:border md:border-slate-800 overflow-hidden bg-slate-900/80 backdrop-blur-xl">
				{/* Header */}
				<div
					className="px-4 py-3 md:px-6 md:py-5 text-white flex items-center gap-3 md:gap-4 shrink-0"
					style={{ background: config.primaryColor }}
				>
					<div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
						{config.logoUrl ? (
							<img
								src={config.logoUrl}
								alt="logo"
								className="w-full h-full object-cover rounded-full"
							/>
						) : (
							<Bot size={22} />
						)}
					</div>
					<div className="min-w-0">
						<h1 className="text-lg md:text-xl font-bold truncate">
							{config.businessName}
						</h1>
						<p className="text-xs md:text-sm opacity-90 flex items-center gap-1">
							<span className="w-2 h-2 bg-emerald-400 rounded-full inline-block"></span>
							<span className="truncate">{config.assistantName} · Online</span>
						</p>
					</div>
				</div>

				{/* Messages */}
				<div className="flex-1 overflow-y-auto px-3 py-4 md:px-4 md:py-6">
					<div className="flex flex-col space-y-3 md:space-y-4">
						{messages.map((msg, idx) => (
							<ChatMessage
								key={idx}
								role={msg.role}
								content={msg.content}
								timestamp={msg.timestamp}
							/>
						))}
						{isTyping && <TypingIndicator />}
						<div ref={messagesEndRef} />
					</div>
				</div>

				{/* Input */}
				<div className="shrink-0 pb-safe">
					<ChatInput onSend={handleSend} disabled={isTyping} />
				</div>
			</div>
		</div>
	);
};

export default PublicChatPage;