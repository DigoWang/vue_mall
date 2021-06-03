import axios from 'axios';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css'
import router from '@/router'

const service = axios.create({
    baseURL: '/api',
    timeout: 1000
})

service.interceptors.request.use(config => {
    const token = localStorage.getItem('token').replace(/"*/g, '')
    if(!token) {
        router.replace('/login');
    }
    Nprogress.start()
    config.headers.token = token;
    return config;
})

service.interceptors.response.use(
    response => {
        Nprogress.done()
        return response.data;
    },
    error => {
        Nprogress.done()
        return new Promise(() => {}); // 中断Promise链, 后面不再处理错误
        // return Promise.reject(error)
    }
)

export default service;