<template>
<div class="wrap">
  <van-nav-bar
    title="登录"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <img src="./images/logo.png" alt="logo">
  <!-- 账号密码登录 -->
  <div v-show="isShow === 0">
    <van-form>
      <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
      />
      <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
      />
      <div class="login" style="margin: 10px;">
          <van-button @click="login" round block type="info" native-type="submit">登录</van-button>
      </div>
      <div style="margin: 10px;">
          <van-button @click="register" plain round block type="info" native-type="submit">注册</van-button>
      </div>
      <p class="change-login-way"><span @click="toggle">短信验证码登录</span></p>
    </van-form>
  </div>
  <!-- 验证码登录 -->
  <div v-show="isShow === 1">
    <van-form>
      <van-field
        v-model="phone"
        required
        label="手机号"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="code"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button @click="sendCode" plain style="height: 100%;border: none;display: flex" size="small" type="info">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 10px;">
          <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
      <div style="margin: 10px;">
          <van-button plain round block type="info" native-type="submit">注册</van-button>
      </div>
      <p class="change-login-way"><span @click="toggle">账号密码登录</span></p>
    </van-form>
  </div>
  <div class="quick-login">
    <h4>其他登录方式</h4>
    <div class="quick-type">
      <a href="##"><img src="./images/QQ.png" alt="QQ"><p>QQ</p></a>
      <a href="##"><img src="./images/wechat.png" alt="wechat"><p>微信</p></a>
      <a href="##"><img src="./images/apple.png" alt="apple"><p>Apple</p></a>
    </div>
    <p v-show="isShow === 0">登录即代表您已同意<a href="##">文迪隐私政策</a></p>
    <p v-show="isShow === 1">未注册的手机号验证后将自动创建京东账号, 登录即代表您已同意<a href="##">文迪隐私政策</a></p>
  </div>
</div>
</template>

<script>
import {login, register} from '@/utils/api'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      id: '',
      phone: '',
      code: '',
      isShow: 0,
      countDown: 10
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    toggle() {
      this.isShow = this.isShow ? 0 : 1
    },
    sendCode(event) {
      this.Toast('验证码已发送')
      event.target.innerText = '重新获取(10s)'
      event.target.disabled = true
      this.timer = setInterval(() => {
        if(this.countDown > 0) {
          event.target.innerText = '重新获取(' + --this.countDown + 's)'
        } else {
          clearInterval(this.timer)
          this.countDown = 10
          event.target.innerText = '发送验证码'
          event.target.disabled = false
        }
      }, 1000)
    },
    async login(event) {
      event.target.disabled = true;
      let {username, password, id} = this
      this.username = username = this.$reg.reg_s(username)
      this.password = password = this.$reg.reg_s(password)

      if(!username) {
        this.Toast('请输入用户名和密码')
      } else if(!password) {
        this.Toast('请输入密码')
      }
      if(username && password) {
        try {
          const data = await login(username, password);
          const {status, id} = data
          if(status == 200) {
            this.Toast('登录成功');
            localStorage.setItem('user', JSON.stringify({username, password, id}))
            localStorage.setItem('token', id)
            this.$store.commit('SETNAME', username)
            this.$store.commit('SETID', id)
            setTimeout(() => {
              this.$router.replace('/home')
            }, 1000)
          } else if(status == 404) {
            this.Toast('用户名或密码错误')
          }
        } catch (error) {
          this.Toast('服务器繁忙，请稍候重试！')
        }
      }
      event.target.disabled = false;
    },
    async register(event) {
      event.target.disabled = true;
      let {username, password} = this
      this.username = username = this.$reg.reg_s(username)
      this.password = password = this.$reg.reg_s(password)

      if(!username) {
        this.Toast('请输入用户名和密码')
      } else if(!password) {
        this.Toast('请输入密码')
      }
      if(username && password) {
        try {
          // 发送 ajax 请求，获取成功后的数据
          const data = await register(username, password, this.uuid())
          // 解构返回数据的状态码
          const {status} = data
          // 注册成功的反馈
          if(status == 200) {
            this.Toast('注册成功, 请重新登录');
            this.username = ''
            this.password = ''
          } 
          // 注册失败的反馈
          else if(status == 404) {
            this.Toast('用户名已存在')
          }
        } catch (error) {
          this.Toast('服务器繁忙，请稍候重试！')
        }
      }
      event.target.disabled = false;
    },
    getStorage() {
      const str = localStorage.getItem('user');
      if(str) {
        const user = JSON.parse(str);
        this.username = user.username
        this.password = user.password
      }
    }
  },
  mounted(){
    this.getStorage();
  }
}
</script>

<style lang="less" scoped>
  .wrap {
    text-align: center;
    > img {
      margin: auto;
      transform: scale(1.5);
      width: 100px;
      height: 100px;
    }
    .van-form {
      padding: 0 20px;
      .change-login-way {
        margin-top: 20px;
        margin-bottom: 20px;
        height: 20px ;
        padding-left: 10px;
        > span {
          line-height: 20px; 
          float: left; 
          font-size: 14px; 
          color: #C8C9CC;
        }
      }   
    }
    .quick-login {
      > h4 {
        font-size: 13px;
        color: #CCCCCC;
        position: relative;
        top: 20px;
        &::before {
          content: '';
          position: absolute;
          width: 100px;
          height: 1px;
          background-color: #ccc;
          left: 30px;
          top: 12px;
        }
        &::after {
          content: '';
          position: absolute;
          width: 100px;
          height: 1px;
          background-color: #ccc;
          right: 30px;
          top: 12px;
        }
      }
      .quick-type {
        margin-top: 40px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        a {
          font-size: 12px;
          img {
            width: 50px;
            height: 50px;
            margin: 0 15px;
          }
          p {
            margin: 0;
          }
        }
      }
      p {
        font-size: 12px;
        color: #C8C9CC;
        padding: 0 25px 0 25px;
        > a {
          color: #1989FA;
        }
      }
    }
  }
</style>