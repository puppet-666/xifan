import urls from './urls'
import api from '../index'
import md5 from 'js-md5';

export default {
    userLogin(phone,password){
        password = md5(password)
        return api.post(urls.userLogin,{phone,password})
    },
    userReg(name,password,phone){
        password = md5(password)
        return api.post(urls.userReg,{name,password,phone})
    },
    changeName(name,phone){
        return api.post(urls.changeName,{name,phone})
    },
    changePassword(npassword,phone,opassword){
        opassword = md5(opassword)
        npassword = md5(npassword)
        return api.post(urls.changePassword,{npassword,phone,opassword})
    },
    searchName(phone){
        return api.get(urls.searchName + phone)
    }
}