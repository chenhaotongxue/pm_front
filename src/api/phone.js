import request from '../router/axios.js';
//分页查询全部电话
export const getAllPhone = (pageNum, pageSize) => {
    return request({
      url: '/pm/phone/getAll',
      method: 'get',
      params:{
        'pageNum':pageNum,
        'pageSize': pageSize
      }
    })
  }
//根据类型获取电话
  export const getPhoneByType = (type) => {
    return request({
      url: '/pm/phone/getPhoneByType',
      method: 'get',
      params:{
        'type':type
      }
    })
  }

  export const updatePhone = (data) => {
    return request({
      url: '/pm/phone/update',
      method: 'post',
      data,
    })
  }

  export const insertPhone = (data) => {
    return request({
      url: '/pm/phone/insert',
      method: 'post',
      data,
    })
  }

  export const deletePhone = (id) => {
    return request({
      url: '/pm/phone/delete',
      method: 'get',
      params:{
        id: id
      }
    })
  }