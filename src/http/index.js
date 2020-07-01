import { axios } from './http'
import store from '../store'
import {notification} from "../utils/notification";

export const post = (url , data = {}, showMsg = false) => axios.post(url, data).then(res => {
    store.dispatch('setState', ['isRequest', false]);
    showMsg && res.status === 10000 && notification({
        title: res.message
    });
    return res
});

// 处理后端图片
export const exportImg = (data) => axios.post('/admin/getCaptcha', data, { responseType: 'arraybuffer' }).then(res => {
    return 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
});
