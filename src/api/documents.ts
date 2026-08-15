import api from './axios';

export const getDocuments = async (businessId: string) => {
    const { data } = await api.get(`/documents?businessId=${businessId}`);
    return data;
};

export const uploadDocument = async (businessId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('businessId', businessId);
    const { data } = await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
};

export const deleteDocument = async (businessId: string, docId: string) => {
    const { data } = await api.delete(`/documents/${docId}?businessId=${businessId}`);
    return data;
};