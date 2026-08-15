import api from './axios';

export const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
};

export const signup = async (name: string, email: string, password: string) => {
    const { data } = await api.post('/auth/signup', { name, email, password });
    return data;
};

export const verifyEmail = async (token: string) => {
    const { data } = await api.get(`/auth/verify-email?token=${token}`);
    return data;
};
export const verifyOtp = async (email: string, otp: string) => {
    const { data } = await api.post('/auth/verify-otp', { email, otp });
    return data;
};
export const getMe = async () => {
    const { data } = await api.get('/auth/me');
    return data;
};