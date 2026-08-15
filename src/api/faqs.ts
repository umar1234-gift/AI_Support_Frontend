import api from './axios';

export const getFaqs = async (businessId: string) => {
    const { data } = await api.get(`/faqs?businessId=${businessId}`);
    return data;
};

export const createFaq = async (businessId: string, question: string, answer: string) => {
    const { data } = await api.post('/faqs', { businessId, question, answer });
    return data;
};

export const updateFaq = async (businessId: string, faqId: string, body: any) => {
    const { data } = await api.patch(`/faqs/${faqId}?businessId=${businessId}`, body);
    return data;
};

export const deleteFaq = async (businessId: string, faqId: string) => {
    const { data } = await api.delete(`/faqs/${faqId}?businessId=${businessId}`);
    return data;
};