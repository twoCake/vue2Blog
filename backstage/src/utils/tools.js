// 工具函数库

// 专门处理时间戳的函数
export function formatDate(timestamp){
    let date = new Date(parseInt(timestamp));
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let weekArr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
    let week = weekArr[date.getDay()]

    // 需要给一位数前面+0
    if(month >=1 && month <=9){
        month = "0"+month
    }
    if(day >=1 && day <=9){
        day = "0"+day
    }
    if(hour >=0 && hour <=9){
        hour = "0"+hour
    }
    if(minute >=0 && minute <=9){
        minute = "0"+minute
    }
    if(second >=0 && second <=9){
        second = "0"+second
    }

    // 拼接
    let fullTime = year+"-"+month+"-"+day+"__"+hour+":"+minute+":"+second+"__"+week
    return fullTime
}