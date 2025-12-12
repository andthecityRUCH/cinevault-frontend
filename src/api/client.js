import axios from 'axios';
const BASE = import.meta.env.VITE_API_BASE || '';
const api = axios.create({ baseURL: BASE + '/api', timeout: 12000 });
api.interceptors.request.use(conf => {
  const t = localStorage.getItem('mr_token');
  if (t) conf.headers.Authorization = `Bearer ${t}`;
  return conf;
});
export default api;
export const fetchMovies = (params) => api.get('/movies', { params }).then(r=>r.data);
export const fetchMovie = (id) => api.get(`/movies/${id}`).then(r=>r.data);
export const fetchSimilar = (id) => api.get(`/movies/${id}/similar`).then(r=>r.data);
export const register = (data) => api.post('/auth/register', data).then(r=>r.data);
export const login = (data) => api.post('/auth/login', data).then(r=>r.data);
export const fetchReviews = (movieId) => api.get(`/movies/${movieId}/reviews`).then(r=>r.data);
export const postReview = (movieId, body) => api.post(`/movies/${movieId}/reviews`, body).then(r=>r.data);
export const addToList = (movieId) => api.post('/list/add', { movieId }).then(r=>r.data);
export const getMyList = () => api.get('/list').then(r=>r.data);
