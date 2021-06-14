import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://bimito.com/bimito/',
});

export default instance;
