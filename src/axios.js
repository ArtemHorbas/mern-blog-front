import axios from 'axios'

export const myAxios = axios.create({
	baseURL: 'https://mern-blog-4-portfolio.herokuapp.com'
})

myAxios.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem('token')
	return config
})
