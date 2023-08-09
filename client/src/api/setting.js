import request from "./request";

export function getSetting(){
    return request({
        url:"/api/setting",
        method:"get"
    });
}