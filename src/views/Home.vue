<template>
    <div class="container">
        <img style="width:100px;height:60px;margin-top:15px" src="../assets/img/xifan-logo.png"/>
        <img style="width:100px;height:30px;margin-top:15px" src="../assets/img/title1.png"/>
        <img style="width:100px;height:30px;" src="../assets/img/title2.png"/>
        <div class="btn-container">
            <van-button  round color="black" style="width:100px" @click="showLogin()">登陆</van-button>
            <van-button  round color="black" style="margin-left:20px;width:100px" @click="showRegister()">注册</van-button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { 
    Image, 
    Row,
    Col,
    Icon,
    CellGroup,
    Cell,
    Button,
    Field,
    RadioGroup,
    Radio
} from 'vant';

Vue.use(Image)
  .use(Row)
  .use(Col)
  .use(Icon)
  .use(CellGroup)
  .use(Cell)
  .use(Button)
  .use(Field)
  .use(Radio)
  .use(RadioGroup);
export default {
    name:'Home',
    data(){
        return{
            loading:false,
        }
    },
    methods:{
      showLogin(){
        this.$router.push({
          path:'/login'
        })
      },
      showRegister(){
        this.$router.push({
          path:'/register'
        })
      }
    }
}
</script>

<style lang="scss" scoped>
.container{
    width: 375px;
    height: 667px;
    background: #FEF56F;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.btn-container{
    margin-top: 70%
}
</style>