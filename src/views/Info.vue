<template>
  <div class="user">
    <div class="user-info">
      <div class="user-info__background"></div>
      <div class="user-info__card">
        <div class="user-info__card__btn-group">
          <van-button
            class="user-info__card__btn-group__btn"
            type="primary"
            size="mini"
            plain
            round
            hairline
            color="#3d3c3c"
            @click="checkLogin"
          >
            <van-icon class-prefix="my-icon" name="tuichu" />
          </van-button>
        </div>
        <van-row type="flex" justify="space-around">
          <div class="user-info__card-wrap">
            <van-image
              round
              width="50px"
              height="50px"
              fit="cover"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <span class="user-info__card__title">{{username}}</span>
          </div>
        </van-row>

        <div style="width:100%">
          <simple-info />
        </div>
      </div>
    </div>
    <user-cell @sendChildData="getChildData" />
  </div>
</template>

<script>
import SimpleInfo from "@/components/SimpleInfo.vue";
import UserCell from "@/components/UserCell.vue";
import { Tag, Button, Icon, Row, Col, Image } from "vant";
import Vue from "vue";
import store from "store";
Vue.use(Tag)
  .use(Button)
  .use(Icon)
  .use(Row)
  .use(Col)
  .use(Image);
export default {
  name: "Info",
  methods: {
    checkLogin() {
      localStorage.clear();
      // store.remove("user");
      // store.remove("search");
      // store.remove("active");
      this.$router.push({
        path: "/"
      });
    },
    getChildData() {
      let phone = store.get("user").phone;
      this.searchName(phone);
    },
    async searchName(phone) {
      try {
        let res = await this.$api.users.searchName(phone);
        this.username = res[0].user_name;
        // store.set("username", res[0].user_name);
      } catch (e) {
        // eslint-disable-next-line
        console.log("​catch -> e", e);
        store.set("username", "测试用户");
      }
    }
  },
  data() {
    return {
      username: "测试用户"
    };
  },
  components: {
    "simple-info": SimpleInfo,
    "user-cell": UserCell
  },
  mounted: function() {
    this.username = store.get("username");
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/index.scss";
.username {
  font-size: 30px;
  font-weight: 500;
}
.user {
  &-info {
    width: 100%;
    height: 220px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__background {
      width: 100%;
      height: 144px;
      background: #3d3c3c;
      color: white;
      &-title {
        padding-left: 10%;
        font-size: 180%;
        color: wheat;
        font-size: bold;
      }
    }
    &__card {
      width: 90%;
      height: 144px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-top: -77px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      &-wrap {
        width: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 6px 0;
      }
      &__btn-group {
        width: 100%;
        margin-top: 5px;
        display: inline-flex;
        align-items: flex-end;
        justify-content: flex-end;
        &__btn {
          margin-right: 5px;
          background: white;
        }
      }
      &__title {
        margin: 10px;
        margin-left: 20px;
        font-weight: 900;
        font-family: Microsoft JhengHei;
        color: #3d3c3c;
        &__tag {
          padding: 3px;
          font-size: 80%;
        }
      }
    }
  }
  &-grid {
    margin-bottom: 20px;
  }
}
</style>