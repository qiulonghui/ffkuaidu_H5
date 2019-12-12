import axios from 'axios';
import { Toast } from 'vant';

let baseURL = process.env.VUE_APP_BASEURL || '/';
console.log(baseURL)
// 创建axios实例
const http = axios.create({
	baseURL,
	timeout: 8000, // 请求超时时间
})

// request拦截器
http.interceptors.request.use(
	config => {
		// Toast.loading({
		// 	message: '加载中...',
		// 	forbidClick: true
		// });
		return config
	},
	error => {
		// Do something with request error
		console.log(error) // for debug
		Promise.reject(error)
	}
)

// respone拦截器
http.interceptors.response.use(
	response => {
		// Toast.clear();
		const { data, status } = response;
		if (status === 200 && data.code !== 0) {
			Toast.fail(data.message)
		}
		return data
	},
	error => {
		// Toast.clear();
		console.log(error.response) // for debug
		if (error.response.status === 401) {
			Toast.fail('无权限')
		} else if (error.response.status === 500) {
			Toast.fail('服务器或网络错误')
		}
		return Promise.reject(error)
	}
)

export default http
