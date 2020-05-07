<template>
    <div style="margin-top:20px">
        <div class="swipper-container">
            <van-swipe :autoplay="4000"  show-indicators touchable indicator-color="#000000" :height="300" :width="width" > 
                <van-swipe-item style="text-align:center" v-for="(item,index) of resData" :key="index" @click="info(item.id)">
                    <div style="text-align:center;position:relative">
                    <van-image radius="20" width="320" height="230" :src="item.url"/>
                    <span class="pic-font" style="position:absolute;z-index:2;margin-left:-280px;margin-top:25px;color:white">{{item.name}}</span>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem,Lazyload, Toast,Icon,Image } from 'vant';

Vue.use(Swipe)
.use(SwipeItem)
.use(Lazyload)
.use(Toast)
.use(Icon)
.use(Image);
export default {
    name:"Swipper",
    data () {
        return {
            resData:[
                {'name':'清蒸银鳕鱼','url':'http://i2.chuimg.com/3f671776eefd425d85e341ea57bf852b_1920w_1920h.jpg?imageView2/1/w/600/h/600/q/90/format/jpg','id':2245},
                {'name':'玫瑰花抱蛋虾饺','url':'http://i2.chuimg.com/ea888af5a3cd469ba9db9738b602d341_1920w_1920h.jpg?imageView2/1/w/600/h/600/q/90/format/jpg','id':1594},
                {'name':'红烧日本豆腐','url':'http://i2.chuimg.com/85be101b303f477e8e23b863c19fdb05_1920w_1920h.jpg?imageView2/1/w/600/h/600/q/90/format/jpg','id':1668},
                {'name':'葱爆蛤蜊','url':'http://i2.chuimg.com/4794b26504154942b79c151d439fc27a_1920w_1920h.jpg?imageView2/1/w/600/h/600/q/90/format/jpg','id':1821},
                {'name':'莴笋木耳炒肉','url':'http://i2.chuimg.com/b623256e83f14f65acc4b3a22743a2a2_1920w_1920h.jpg?imageView2/1/w/600/h/600/q/90/format/jpg','id':1872},
            ],
            width:0,
            name:"like-o"
        }
    },
    methods :{
        changeIcon(){
            this.name = this.name == "like-o" ? "like" : "like-o"
        },
        info(menu_id){
            this.$router.push({
                name: 'food',
                params: {
                    id: menu_id
                }
            })
        },
    },
    mounted(){
        this.width = document.body.clientWidth
    }
}
</script>

<style lang="scss" scoped>
.pic-font{
font-size:30px;
font-family:"Microsoft JhengHei";
font-weight: 550;
}
.icon{
float: right;
margin-right:10px;
margin-top: -5px
}
</style>