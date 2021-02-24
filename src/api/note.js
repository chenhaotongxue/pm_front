import request from '../router/axios.js';

export const getAllNote = (pageNum, size) => {
  return request({
    url: '/pm/note/selectAll?pageNum=' + pageNum + "&size=" + size,
    method: 'get'
  })
}

export const updateNote = (data) => {
  return request({
    url: '/pm/note/updateNote',
    method: 'post',
    data
  })
}

export const queryToday = () => {
  return request({
    url: '/pm/note/queryToday',
    method: 'get'
  })
}