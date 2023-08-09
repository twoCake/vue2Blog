import request from '@/utils/request'

// 获取关于我页面的url
export function getAbout(){
    return request({
        url:"/api/about",
        method:"get",
    })
}

// 设置关于我页面的url
export function setAbout(data){
    return request({
        url:"/api/about",
        method:"post",
        data
    })
}