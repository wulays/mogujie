import request from '../request'

export function loadGoodList(miniWallkey, type){
    return request({
        url: `/api/vip/subcategory/detail`,
        params: {
            miniWallkey,
            type
        }
    })
}