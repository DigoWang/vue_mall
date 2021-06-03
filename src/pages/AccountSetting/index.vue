<template>
  <div class="wrap">
    <van-nav-bar
      title="账户设置"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <van-icon name="ellipsis" size="26" color="#5D5F6A" />
      </template>
    </van-nav-bar>
    <div class="manage">管理我的账户</div>
    <div class="info" style="position: relative">
      <img class="avatar" src="@/assets/avatar.jpg" alt="" />
      <van-contact-card
        type="edit"
        :name="name"
        :tel="currentContact.tel"
        @click="onEdit"
      />
      <div class="cur-login">当前登录</div>
    </div>
    <van-field
      is-link
      readonly
      label="收货地址管理"
      placeholder="管理我的地址"
    />
    <van-field
      is-link
      readonly
      label="账户与安全"
      placeholder="密码/实名认证等管理"
    />
    <van-field is-link readonly label="文迪支付密码" placeholder="已设置" />
    <van-field
      is-link
      readonly
      label="联系客服"
      placeholder="及时解答用户疑难问题"
    />
    <div style="display: flex; justify-content: center">
      <van-button
        @click="quitLogin"
        style="color: #4ea4fb; width: 375px; border: none"
        type="default"
        >退出登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AccountSetting",
  data() {
    return {
      currentContact: {
        tel: "13000000000",
      },
    };
  },
  computed: {
    name() {
      return JSON.parse(localStorage.getItem("user")).username;
    },
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onEdit() {
      this.Toast("编辑");
    },
    quitLogin() {
      this.$router.replace("/login");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  height: 100vh;
  background-color: #f7f7f7;
  position: relative;
  .manage {
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
  }
  .info {
    display: flex;
    align-items: center;
    img.avatar {
      width: 52px;
      display: block;
      position: absolute;
      left: 30px;
      border-radius: 50%;
      z-index: 9999;
    }
    .van-cell {
      height: 100px;
      margin: 0 10px;
      background-color: #d2f1f7;
      padding-left: 50px;
      border-radius: 10px;
      border: 1px solid #4ea4fb;
      box-shadow: 0 1px 3px #ccc;
      &::before {
        display: none;
      }
      .van-cell__value {
        padding-left: 10px;
      }
    }
    .cur-login {
      font-size: 12px;
      position: absolute;
      right: 10px;
      top: 0px;
      height: 20px;
      width: 66px;
      text-align: center;
      background: #85b9ee;
      border-bottom-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
  .van-cell {
    border-radius: 10px;
    margin: 15px 0;
    & /deep/ input {
      margin-left: 80px;
      font-size: 12px;
    }
  }
}
</style>
