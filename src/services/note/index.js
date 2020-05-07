import urls from './urls'
import api from '../index'

export default {
    getNote(phone,date){
        return api.get(urls.getNote+'/'+phone+'/'+date)
    },
    delNote(phone,date,title){
        return api.post(urls.delNote,{phone,date,title})
    },
    addNote(phone,title,content,date){
        return api.post(urls.addNote,{phone,title,content,date})
    },
    updateNote(content,phone,date,title){
        return api.post(urls.updateNote,{content,phone,date,title})
    },
    noteDate(phone){
        return api.get(urls.noteDate,{phone})
    }
}