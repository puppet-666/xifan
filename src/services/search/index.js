import urls from './urls'
import api from '../index'

export default {
   searchOne(id){
       return api.get(urls.searchOne+'/one/'+id)
   },
   getClass(tag){
        return api.get(urls.getClass+tag)
   },
   getMore(){
       return api.get(urls.getMore)
   },
   search(content){
       return api.get(urls.search+content)
   },
   searchArray(){
       return api.get(urls.searchArray)
   }
}