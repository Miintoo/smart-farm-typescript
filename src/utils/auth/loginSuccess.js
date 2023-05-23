import axios from 'axios';

export default function loginSuccess(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
