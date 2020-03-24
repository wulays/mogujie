import request from '../request'

function loadHomeData () {
    return request({
        url: '/api/vip/home/multidata'
    })
}

function loadTabControl (type, page=1) {
    return request({
        url: 'http://123.207.32.32:8000/api/vip/home/data',
        params: {
            type,
            page
        }
    })
}

export default {
    loadHomeData,
    loadTabControl
}