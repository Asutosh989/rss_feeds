import { BASE_URL, FEEDLY_URL } from '@/config';
import axios from 'axios';

const login = (data) => {
  return axios.post(`${BASE_URL}/auth/login`, data);
}

const populate = () => {
  return axios.get(`${BASE_URL}/auth/populate`);
}

const fetchData = (data) => {
  return axios.get(`${BASE_URL}/auth/feeds`, { params: data });
}

const searchFeeds = (query) => {
  const AUTHORIZATION = {
    headers: {
      Authorization: `Bearer ${process.env.VUE_APP_FEEDLY_KEY}`,
    },
  };

  return axios.get(`${FEEDLY_URL}/search/feeds?query=${query}&count=100&locale=en`,
    AUTHORIZATION,
  )
}

export default {
  login,
  populate,
  fetchData,
  searchFeeds,
}