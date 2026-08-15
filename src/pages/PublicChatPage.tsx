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

	useEffect(() => {
		const fetchConfig = async () => {
			try {
				const res = await fetch(`/api/widget/${slug}/config`);
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
			const response = await fetch(`/api/chat/public/${slug}/stream`, {
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
						if (data === "[DONE]") {
							break;
						}
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
		<div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
			<div className="w-full max-w-3xl h-[90vh] md:h-[85vh] rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col bg-slate-900/80 backdrop-blur-xl">
				{/* Header */}
				<div
					className="px-6 py-5 text-white flex items-center gap-4"
					style={{ background: config.primaryColor }}
				>
					<div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
						{config.logoUrl ? (
							<img
								src={config.logoUrl}
								alt="logo"
								className="w-full h-full object-cover rounded-full"
							/>
						) : (
							<Bot size={24} />
						)}
					</div>
					<div>
						<h1 className="text-xl font-bold">{config.businessName}</h1>
						<p className="text-sm opacity-90 flex items-center gap-1">
							<span className="w-2 h-2 bg-emerald-400 rounded-full inline-block"></span>
							{config.assistantName} · Online
						</p>
					</div>
				</div>

				{/* Messages */}
				<div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
					<div className="flex flex-col space-y-4">
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
				<ChatInput onSend={handleSend} disabled={isTyping} />
			</div>
		</div>
	);
};

export default PublicChatPage;