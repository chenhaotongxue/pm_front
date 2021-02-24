/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */

import axios from 'axios'
// import store from '@/store/';
import router from '../router/index'
import {serialize} from '../util/util'
import {getToken,getUsername} from '../util/auth'
import {Message} from 'element-ui'
// import website from '@/config/website';
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import {Base64} from 'js-base64';
 
axios.defaults.timeout = 50000;
//返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// NProgress Configuration
// NProgress.configure({
//   showSpinner: false
// });
//HTTPrequest拦截
axios.interceptors.request.use(config => {
//   NProgress.start() // start progress bar
  const meta = (config.meta || {});
  const isToken = meta.isToken === false;
//   config.headers['Authorization'] = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
  if (getToken()) {
    config.headers['token'] = getToken() // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
    config.headers['username'] = getUsername() 
  }
  //headers中配置serialize为true开启序列化
  if (config.method === 'post' && meta.isSerialize === true) {
    config.data = serialize(config.data);
  }
  return config
}, error => {
  return Promise.reject(error)
});
//HTTPresponse拦截
axios.interceptors.response.use(res => {
//   NProgress.done();
  const status = res.data.code || 200
//   const statusWhiteList = website.statusWhiteList || [];
  const message = res.data.msg || '未知错误';
  //如果在白名单里则自行catch逻辑处理
//   if (statusWhiteList.includes(status)) return Promise.reject(res);
  //如果是401则跳转到登录页面
//   if (status === 401) store.dispatch('FedLogOut').then(() => router.push({path: '/login'}));
  // 如果请求为非200否者默认统一处理
  if (status !== 200) {
    Message({
      message: message,
      type: 'error'
    })
    if(status == 900000){
      router.push('/login')
    }
    return Promise.reject(new Error(message))
  }
  return res;
}, error => {
//   NProgress.done();
  return Promise.reject(new Error(error));
})

export function open (url, params = {}) {
  const token = getToken();
  let str = `${url}?token=${token}&`;
  Object.keys(params).forEach((key) => {
    // eslint-disable-next-line eqeqeq
    if (params[key] || params[key] == 0) str += `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}&`;
  });
  window.open(str.slice(0, str.length - 1));
}

export default axios;
