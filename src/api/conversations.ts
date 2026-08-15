import api from './axios';

export const getConversations = async (businessId: string) => {
    const { data } = await api.get(`/conversations?businessId=${businessId}`);
    return data;
};

export const getConversation = async (businessId: string, conversationId: string) => {
    const { data } = await api.get(`/conversations/${conversationId}?businessId=${businessId}`);
    return data;
};

export const updateConversationStatus = async (
    businessId: string,
    conversationId: string,
    status: string,
) => {
    const { data } = await api.patch(
        `/conversations/${conversationId}/status?businessId=${businessId}`,
        { status },
    );
    return data;
};