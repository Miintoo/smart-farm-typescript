/* eslint-disable no-param-reassign */
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://reactjs.kr/api'
});

instance.interceptors.request.use(async (config) => {
  try {
    const response = await axios.post('/silent-refresh');
    config.headers.Authorization = `Bearer ${response.data.accessToken}`;
  } catch (error) {
    throw new Error('토큰이 만료 되었습니다.');
  }
  return config;
});

export default instance;
