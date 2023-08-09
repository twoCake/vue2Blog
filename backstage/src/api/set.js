import request from '@/utils/request'

// 获取全局设置
export function getSetting(){
    return request({
        url:"/api/setting",
        method:"get"
    })
}

// 设置全局设置
export function toSetting(data){
    return request({
        url:"/api/setting",
        method:"put",
        data
    })
}