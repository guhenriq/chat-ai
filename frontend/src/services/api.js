import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 30000,
});

export const sendMessageToAI = async (message) => {
    const response = await instance.post('/chat', { message });

    return response.data;
}
