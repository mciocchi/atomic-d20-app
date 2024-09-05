import superagent from 'superagent';

const API_BASE_URL = 'http://localhost:3000/api'; // Adjust the port if your Express API uses a different one

export const apiClient = {
    get: (path: string) => superagent.get(`${API_BASE_URL}${path}`).then(res => res.body),
    post: (path: string, body: any) => superagent.post(`${API_BASE_URL}${path}`).send(body).then(res => res.body),
    put: (path: string, body: any) => superagent.put(`${API_BASE_URL}${path}`).send(body).then(res => res.body),
    delete: (path: string) => superagent.delete(`${API_BASE_URL}${path}`).then(res => res.body),
};

