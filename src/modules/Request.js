import axios from 'axios';

async function request(url, options = { method: 'GET'}) {
    const OPTIONS = options;
    if (!url.includes('login') || !url.includes('signup')) {
        OPTIONS.headers = { 'authorization': `Bearer ${localStorage.getItem('token')}` }
    }
    const response = await axios({url, options});
    console.log(response);
}

export default request;
