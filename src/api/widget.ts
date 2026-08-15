import api from './axios';

export const getWidgetConfig = async (businessId: string) => {
    const { data } = await api.get(`/widget-config/${businessId}`);
    return data;
};

export const updateWidgetConfig = async (businessId: string, body: any) => {
    const { data } = await api.patch(`/widget-config/${businessId}`, body);
    return data;
};