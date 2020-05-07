import api from '../index'
import urls from './urls'

export default{
    getCollect(phone){
        return api.get(urls.getCollect+'/'+phone);
    },
    isCollect(phone,foodname){
        return api.get(urls.isCollect+'/'+phone+'/'+foodname)
    },
    delCollect(phone,foodname){
        return api.post(urls.delCollect,{phone,foodname})
    },
    addCollect(phone,foodname,date){
        return api.post(urls.addcollect,{phone,foodname,date})
    }
}