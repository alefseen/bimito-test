import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://bimename.com/bimename/',
});

export default instance;
