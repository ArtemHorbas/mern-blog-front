import axios from 'axios'

export const myAxios = axios.create({
	baseURL: 'http://localhost:3333'
})

myAxios.interceptors.request.use(config => {
	config.headers.Authorization = window.localStorage.getItem('token')
	return config
})