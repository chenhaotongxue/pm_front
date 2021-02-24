import request from '../router/axios.js';

export const getAllPhoneType = () => {
    return request({
      url: '/pm/type/getAll',
      method: 'get'
    })
  }