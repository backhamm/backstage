import Vue from 'vue'
import Axios from 'axios'
import {notification} from "../utils/notification";

// 创建 axios 实例
const service = Axios.create({
    baseURL: '/api' // api base_url
    // timeout: 6000 // 请求超时时间
});

const err = (error) => {
    return Promise.reject(error)
};

// request interceptor
service.interceptors.request.use(config => {
    const token = Vue.ls.get('TOKEN');
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    config.headers['T-Token'] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
    return config
}, err);

service.interceptors.response.use((response) => {
    if (response.config.responseType === 'arraybuffer') {
        return response
    } else if (response.data.status !== 10000) {
        notification({
            title: response.data.message
            // message: `错误码：${response.data.status}`
        });
        if (response.data.status === 24000) {
            Vue.ls.remove('TOKEN');
            window.location.reload()
        }
    } else {
        const oldToken = Vue.ls.get('TOKEN');
        const token = response.headers['t-token'];
        if (oldToken !== token && token) {
            Vue.ls.set('TOKEN', token)
        }
    }
    return response.data
});

export { service as axios };
