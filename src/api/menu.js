import request from '../utils/request'

export const findmenu=() =>{
    return request({
        url:"/menu/findmenu",
        method: 'get'
    })
}
