import api from './axios';

export const getAnalyticsOverview = async (businessId: string) => {
    const { data } = await api.get(`/analytics/overview?businessId=${businessId}`);
    return data;
};