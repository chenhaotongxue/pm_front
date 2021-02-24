import request from '../router/axios.js';
//登录
export const login = (username,password) => {
    return request({
      url: '/pm/user/login',
      method: 'get',
      params:{
          username:username,
          password:password
      }
    })
  }

//查询是否登录
export const isLogin = () => {
return request({
    url: '/pm/user/isLogin',
    method: 'get',
})
}

//退出登录
export const logout = () => {
    return request({
        url: '/pm/user/logout',
        method: 'get'
    })
}

//修改密码
export const alterPassword = (oldPassword,newPassword) => {
    return request({
        url: '/pm/user/alterPassword',
        method: 'get',
        params:{
            oldPassword:oldPassword,
            newPassword:newPassword,
        }
    })
}