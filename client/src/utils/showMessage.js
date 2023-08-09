// 此文件专门用于弹出消息

import getComponentRootDom from "./getComponentRootDom";
import Icon from "@/components/Icon";
import styles from "./showMessage.module.less";

/*
    content    消息内容
    type       消息类型   info  error  success  warn
    duration   多久后消失
*/
export default function (options) {
    const content = options.content || ""; 
    const type = options.type || "info";
    const duration = options.duration || 1500;

    const div = document.createElement("div");
    const iconDom = getComponentRootDom(Icon, {
        type
    })
    div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`

    // 设置div的样式
    const typeClassName = styles[`message-${type}`]; //类型样式名
    div.className = `${styles.message} ${typeClassName}`;
    // 将div加到页面正中
    document.body.appendChild(div)

    // 使页面reflow，浏览器强行渲染
    div.clientHeight;
    div.style.opacity = 1;
    div.style.transform = `translate(-50%,-50%) `;

    // 等待一会，消失
    setTimeout(() => { 
        div.style.opacity = 0;
        div.style.transform = `translate(-50%,-50%) translateY(-15px)`;
        div.addEventListener("transitionend", () => { 
            div.remove();
            // 如果传了回调函数，则运行
            options.callback && options.callback();
        }, {once:true})
    },duration)
    console.log("showMessage")
}