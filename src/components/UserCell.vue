<template>
  <div>
    <van-cell-group>
      <van-cell is-link size="large" @click="changePassWord()" v-track:updatePassword.click="handleClick">
        <template slot="title">
          <van-icon size="16px" class-prefix="my-icon" name="shezhi" />
          <span class="cell-title">账号相关</span>
        </template>
      </van-cell>
      <van-cell is-link size="large" @click="changeRate()">
        <template slot="title">
          <van-icon size="16px" class-prefix="my-icon" name="shoucang1" />
          <span class="cell-title">给嘻饭评个分</span>
        </template>
      </van-cell>
      <van-cell is-link size="large" @click="changeConnect()">
        <template slot="title">
          <van-icon size="16px" class-prefix="my-icon" name="mes" @click="changeConnect()" />
          <span class="cell-title">意见反馈</span>
        </template>
      </van-cell>
      <van-cell is-link size="large" @click="changeAboutUs()">
        <template slot="title">
          <van-icon size="16px" class-prefix="my-icon" name="xinxi" />
          <span class="cell-title">关于我们</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-dialog
      v-model="showAboutUs"
      title="关于我们"
      show-cancel-button
      :beforeClose="beforeCloseAboutUs"
      class="font"
    >
      <div style="text-align: center;margin-top:20px;margin-bottom:20px">
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574174907&di=d7649f4a63eb27a0c97c0fa95a3a3091&imgtype=jpg&er=1&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20171230%2F777723df865a4b6d8db9a17a78516742.jpeg"
          width="160px"
          height="120px"
        />
        <p>
          <van-icon class-prefix="my-icon" name="yanjingnanzi" />前端小庞
        </p>
        <p>
          <van-icon class-prefix="my-icon" name="yanjingnanzi" />后端小朱
        </p>
      </div>
    </van-dialog>
    <van-dialog
      v-model="showPassword"
      title="账号相关"
      show-cancel-button
      :beforeClose="beforeClose"
      class="font"
    >
      <van-tabs v-model="active" @change="change">
        <van-tab title="修改密码">
          <div style="height:150px">
            <van-field type="password" placeholder="旧密码" left-icon="edit" v-model="oldPassword" />
            <van-field type="password" placeholder="新密码" left-icon="edit" v-model="newPassword" />
            <van-field
              type="password"
              placeholder="确认密码"
              left-icon="edit"
              v-model="confrimPassword"
            />
          </div>
        </van-tab>
        <van-tab title="更改用户名">
          <div style="height:150px;">
            <van-field type="text" placeholder="新用户名" left-icon="edit" v-model="newusername" />
          </div>
        </van-tab>
      </van-tabs>
    </van-dialog>
    <van-dialog
      v-model="showConnect"
      title="意见反馈"
      show-cancel-button
      :beforeClose="beforeCloseConnect"
      class="font"
    >
      <div style="text-align: center;margin-top:20px;margin-bottom:20px">
        <van-field
          size="large"
          placeholder="请输入反馈信息"
          type="textarea"
          row="3"
          autosize
          v-model="feedback"
        />
      </div>
    </van-dialog>
    <van-dialog
      v-model="showRate"
      title="评分"
      show-cancel-button
      :beforeClose="beforeCloseRate"
      class="font"
    >
      <div style="text-align:center;">
        <van-rate
          style="height:50px;margin-top:15px"
          v-model="value"
          allow-half
          void-icon="star"
          void-color="#eee"
        />
      </div>
    </van-dialog>
  </div>
</template>

<script>
import {
  Cell,
  CellGroup,
  Icon,
  Dialog,
  Field,
  Toast,
  Rate,
  Tab,
  Tabs
} from "vant";
import Vue from "vue";
import store from "store";
Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Dialog)
  .use(Field)
  .use(Toast)
  .use(Rate)
  .use(Tab)
  .use(Tabs);
export default {
  name: "UserCell",
  data() {
    return {
      showAboutUs: false,
      showPassword: false,
      showConnect: false,
      showRate: false,
      oldPassword: "",
      newPassword: "",
      confrimPassword: "",
      newusername: "",
      feedback: "",
      value: 2.5,
      active: 0
    };
  },
  methods: {
    handleClick(){
      
    },
    changeAboutUs() {
      this.showAboutUs = true;
    },
    changePassWord() {
      this.showPassword = true;
    },
    changeConnect() {
      this.showConnect = true;
    },
    changeRate() {
      if(store.get("score")){
        this.showRate = false;
        Toast.fail("您已进行评分")
      }
      else{
        this.showRate = true;
      }
    },
    beforeCloseRate(action, done) {
      if (action === "cancel") {
        //取消按钮
        done();
      } else if (action === "confirm") {
        //确定按钮
        store.set("score",this.value);
        Toast.success("感谢您的评分");
        done();
      }
    },
    beforeCloseConnect(action, done) {
      if (action === "cancel") {
        //取消按钮
        done();
      } else if (action === "confirm") {
        //确定按钮
        let phone = store.get("user").phone;
        if(this.feedback==""){
          Toast.fail("反馈信息不能为空");
          done(false);
        }
        else{
          this.sendFeedback(phone, this.feedback);
        }
        // if(res.status==1){
        //   Toast.fail(res.msg);
        // }
        // else{
        //   Toast.success(res.msg);
        // }
        this.feedback = "";
        done();
      }
    },
    beforeCloseAboutUs(action, done) {
      if (action === "cancel") {
        //取消按钮
        done();
      } else if (action === "confirm") {
        //确定按钮
        done();
      }
    },
    beforeClose(action, done) {
      let phone = store.get("user").phone;
      if (action === "cancel") {
        //取消按钮
        this.oldPassword = "";
        this.newPassword = "";
        this.confrimPassword = "";
        this.newusername = "";
        done();
      } else if (action === "confirm") {
        switch (this.active) {
          case 0:
            if (this.newPassword == "") {
              Toast.fail("密码不能为空");
              done(false);
            } else if (this.oldPassword == this.newPassword) {
              Toast.fail("密码不能与原来一致");
              done(false);
            } else if (this.newPassword != this.confrimPassword) {
              Toast.fail("新密码不一致");
              done(false);
            } else {
              this.changePassword(this.newPassword,phone,this.oldPassword);
              this.oldPassword = "";
              this.newPassword = "";
              this.confrimPassword = "";
              done();
            }
            break;
          case 1:
            this.changeName(this.newusername, phone);
            this.newusername="";
            done();
            break;
        }
      }
    },
    //添加反馈留言
     async sendFeedback(phone, content) {
      try {
        // 发送留言
        let res =  await this.$api.feedback.sendFeedback(phone, content);
        if(res.status==1){
            Toast.fail(res.message);
        }
        else{
          Toast.success(res.message);
        }
        
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    //修改用户名
    async changeName(name, phone) {
      try {
        let res = await this.$api.users.changeName(name, phone);
        if (res.status == 0) {
           this.$emit('sendChildData',res.status);
          Toast.success(res.msg);
        } else {
          Toast.fail(res.msg);
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    //修改密码
    async changePassword(npassword, phone, opassword) {
      try {
        let res = await this.$api.users.changePassword(
          npassword,
          phone,
          opassword
        );
        if (res.status == 0) {
          Toast.success(res.msg);
          this.$router.push({
            path: "/login"
          });
        } else {
          Toast.fail(res.msg);
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
      }
    },
    change() {
      this.oldPassword = "";
      this.newPassword = "";
      this.confrimPassword = "";
      this.newusername = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.font {
  font-family: "Microsoft JhengHei";
  font-weight: 550;
}
.cell-title {
  font-size: 15px;
  font-family: "Microsoft JhengHei";
  font-weight: 600;
  padding-left: 10px;
}
</style>