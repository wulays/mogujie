import request from '../request'

export function loadSideBar() {
    return request({
        url: '/api/vip/category'
    })
}

export function loadCategory(maitKey) {
    return request({
        url: '/api/vip/subcategory',
        params: {
            maitKey
        }
    })
}
