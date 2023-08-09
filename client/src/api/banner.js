import request from "./request";

// 获取首页标语
export function getBanners() { 
    return request({
        url:"/api/banner",
        method:"get",
    })
}

export function setBanners(data){
    return request({
        url:"/api/banner",
        method:"get",
        data
    })
}
