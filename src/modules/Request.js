import axios from 'axios';

async function request(method, url, headers, data) {
  const HEADERS = headers;
  if (!url.includes('login') && !url.includes('signup')) {
    HEADERS.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  try {
    const response = await axios({
      method,
      url,
      data,
      headers
    });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      window.location = '/';
    } else {
      return error.response;
    }
  }
}

export default request;
