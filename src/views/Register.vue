<template>
  <div class="container">
    <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="$router.back(-1);" />
    <div class="card">
      <van-cell-group>
        <van-field
          style=" border-bottom:3px solid;"
          v-model="name"
          clearable
          label="用户名"
          left-icon="manager"
          placeholder="请输入用户名"
        />
        <van-field
          style=" border-bottom:3px solid;"
          v-model="password"
          clearable
          type="password"
          left-icon="browsing-history"
          label="密码"
          placeholder="请输入密码"
        />
        <van-field
          style=" border-bottom:3px solid;"
          v-model="phone"
          clearable
          left-icon="phone"
          label="电话号码"
          placeholder="请输入电话号码"
        />
      </van-cell-group>
      <van-button
        round
        style="margin-top:80px;width:150px"
        color="black"
        @click="userReg(name,password,phone)"
      >注册</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Image,
  Icon,
  CellGroup,
  Cell,
  Button,
  Field,
  NavBar,
  Toast,

} from "vant";

Vue.use(Image)
  .use(Icon)
  .use(CellGroup)
  .use(Cell)
  .use(Button)
  .use(Field)
  .use(NavBar);
export default {
  name: "Login",
  data() {
    return {
      name: "",
      password: "",
      phone: "",
    };
  },
  methods: {
    // 注册
    async userReg(name, password, phone) {
      try {
        // 尝试登录
        if (phone != "" && name != "" && password != "") {
          if (!/^1[34578]\d{9}$/.test(phone)) {
            Toast.fail("您输入的手机号不符合规格");
          } else {
            let res = await this.$api.users.userReg(name, password, phone);
            Toast.success(res.message);
            this.$router.push({
              path: "/login"
            });
          }
        } else {
          Toast.fail("注册信息填写不全");
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/index.scss";

.card {
  text-align: center;
  margin-top: 40%;
  margin-left: 15px;
  margin-right: 15px;
}
</style>