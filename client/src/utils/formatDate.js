// 此文件专门用于将时间戳转化为有格式的时间

export default function (timetamp,showDetailTime=false) {
    // 这里+的作用是将timetamp转化为数字格式（隐式转换）
    const date = new Date(+timetamp);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = (date.getDate()).toString().padStart(2, "0");
    let str = `${date.getFullYear()}年-${month}月-${day}日`;
    // 显示精确的时间（时分秒）
    if(showDetailTime){
        const hour = date.getHours().toString().padStart(2,"0");
        const minute = date.getMinutes().toString().padStart(2,"0");
        const second = date.getSeconds().toString().padStart(2,"0");
        str += `${hour}:${minute}:${second}`;
    }
    return str;
}