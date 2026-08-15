import axios from 'axios';

const API_BASE = '/api'; // Vite proxy to localhost:3000

export interface ChatResponse {
    sessionId: string;
    response: string;
    sources?: {
        text_preview: string;
        document_id?: string;
        filename?: string;
        relevance_score: number;
    }[];
}

export interface PublicChatPayload {
    message: string;
    sessionId?: string;
    customerName?: string;
    customerEmail?: string;
}

export const sendPublicMessage = async (
    businessKey: string,
    payload: PublicChatPayload,
): Promise<ChatResponse> => {
    const { data } = await axios.post(
        `${API_BASE}/chat/public/${businessKey}`,
        payload,
    );
    return data;
};

