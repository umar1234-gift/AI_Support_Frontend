import api from './axios';

export const getCurrentBusiness = async () => {
    const { data } = await api.get('/businesses/current');
    return data;
};

export const createBusiness = async (data: any) => {
    const { data: response } = await api.post('/businesses', data);
    return response;
};

export const updateBusiness = async (businessId: string, body: any) => {
    const { data } = await api.patch(`/businesses/${businessId}`, body);
    return data;
};