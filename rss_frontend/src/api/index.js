import { BASE_URL } from '@/config';
import axios from 'axios';

const login = (data) => {
  return axios.post(`${BASE_URL}/auth/login`, data);
}

const populate = () => {
  return axios.get(`${BASE_URL}/auth/populate`);
}

const fetchData = (data) => {
  return axios.get(`${BASE_URL}/auth/feeds`, {params: data});
}

export default {
  login,
  populate,
  fetchData,
}