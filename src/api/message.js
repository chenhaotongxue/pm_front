import request from '../router/axios.js';

export const addMessage = (data) => {
    return request({
        url: '/pm/message/insert',
        method: 'post',
        data,
    })
}

export const updateMessage = (data) => {
    return request({
        url: '/pm/message/update',
        method: 'post',
        data,
    })
}

export const selectByPage = (num,size) => {
    return request({
        url: '/pm/message/selectByPage',
        method: 'get',
        params:{
            pageNum:num,
            pageSize:size,
        }
    })
}

export const selectByNickName = (nickName) => {
    return request({
        url: '/pm/message/selectByName',
        method: 'get',
        params:{
            name:nickName,
        }
    })
}

export const deleteById = (id) => {
    return request({
        url:'/pm/message/deleteById',
        method: 'get',
        params:{
            id: id,
        }
    })
}