import urls from './urls'
import api from '../index'

export default {
    sendFeedback (phone,content){
        return api.post(urls.sendFeedback,{phone,content})
    }
}