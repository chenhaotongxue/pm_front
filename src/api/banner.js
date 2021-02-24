import request from '../router/axios.js';
//查询全部banner
export const selectAll = () => {
    return request({
      url: '/pm/banner/selectAll',
      method: 'get'
    })
  }

  export const deleteById = (id) => {
    return request({
      url: '/pm/banner/deleteById',
      method: 'get',
      params:{
          id:id,
      }
    })
  }

  export const update = (data) => {
    return request({
      url: '/pm/banner/update',
      method: 'post',
      data,
    })
  }

  export const selectByStatus = (status) => {
    return request({
      url: '/pm/banner/selectByStatus',
      method: 'get',
      params:{
          status:status,
      },
    })
  }

  export const add = (data) => {
    return request({
      url: '/pm/banner/add',
      method: 'post',
      data,
    })
  }

  /**修改声明内容 */
  export const updateNotice = (content) => {
    return request({
      url: '/pm/banner/updateNotice',
      method: 'get',
      params:{
          content:content,
      },
    })
  }

  /**根据标题来查询 */
  export const selectStatement = (content) => {
    return request({
      url: '/pm/banner/selectNoticeByTitle',
      method: 'get',
      params: {
        title: content
      }
    })
  }