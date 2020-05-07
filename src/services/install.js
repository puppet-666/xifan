/* 实例化接口的列表，用于在main.js注册*/
import apiList from './apiList'

const install = function (Vue) {
    // 假若已经注册
    if (install.installed) {
        return
    }
    
    install.installed = true
    // 注册原型
    Object.defineProperties(Vue.prototype, {
        $api: {
            get() {
                // 返回接口的列表以供全局注册
                return apiList
            }
        }
    })
}
export default {
    install
}