import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.github.com',
});

export default client;
