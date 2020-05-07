<template>
  <div class="container">
    <van-nav-bar title="登陆" left-text="返回" left-arrow @click-left="$router.back(-1);" />
    <div class="card">
      <van-cell-group>
        <van-field
          style=" border-bottom:3px solid;"
          v-model="phone"
          clearable
          label="手机号"
          left-icon="manager"
          placeholder="请输入手机号"
        />
        <van-field
          style=" border-bottom:3px solid;"
          v-model="password"
          clearable
          type="password"
          left-icon="browsing-history"
          label="密码"
          placeholder="请输入密码"
          right-icon="question"
        />
      </van-cell-group>
      <van-button round style="margin-top:80px;width:150px" color="black" @click="userLogin()">登陆</van-button>
    </div>
    <van-popup v-model="show">
        <van-notice-bar
        text="忘记密码请添加以下微信重置"
        left-icon="volume-o"
      />
      <img
        width="250px"
        height="350px"
        src="../assets/img/connect.jpg"
      />
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import store from "store";
import {
  Image,
  Icon,
  CellGroup,
  Cell,
  Button,
  Field,
  NavBar,
  Toast,
  Popup,
  NoticeBar 
} from "vant";

Vue.use(Image)
  .use(Icon)
  .use(CellGroup)
  .use(Cell)
  .use(Button)
  .use(Field)
  .use(NavBar)
  .use(Popup)
  .use(NoticeBar);
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      phone: "",
      password: "",
      show:false
    };
  },
  methods: {
    // 登录
    async userLogin() {
      try {
        // 尝试登录
        if(this.password !="" && this.phone!=""){
          let res = await this.$api.users.userLogin(this.phone, this.password);
          if (res.status == 0) {
            // 使用localstorage保存相关信息
            store.set("user", {
              phone: this.phone
            });
            store.set("active", 0);
            this.$router.push({
              path: "/user/index"
            });
          } else if (res.status == 1) {
            Toast.fail(res.msg);
          } else {
            Toast.fail(res.msg);
          }
        }
        else{
          Toast.fail("请输入手机和密码")
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    showPopup() {
      this.show = true;
    }
    // userLogin(){
    //     let data = {"phone":this.username,"password":this.password};
    //     axios.post(`http://localhost:3000/api/login`,data)
    //     .then(res=>{
    //         Toast(res)
    //     })
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/index.scss";
.card {
  text-align: center;
  margin-top: 50%;
  margin-left: 15px;
  margin-right: 15px;
}
</style>