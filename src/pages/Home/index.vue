<template>
  <div>
    <div>
      <keep-alive>
        <router-view v-show="!$route.meta.isShow"></router-view>
      </keep-alive>
    </div>
    <div class="tabbar_wrap clearfix"> 
      <van-tabbar v-show="!$route.meta.isShow" v-model="active">
        <van-tabbar-item @click="toggleTabbar" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item @click="toggleTabbar" icon="chat-o">消息</van-tabbar-item>
        <van-tabbar-item @click="toggleTabbar" icon="shopping-cart-o">购物车</van-tabbar-item>
        <van-tabbar-item @click="toggleTabbar" icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import {login} from '@/utils/api'
export default {
  name: 'Home',
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    toggleTabbar() { 
      switch (this.active) {
        case 0:
          this.$router.push('/home/homepage');
          break;
        case 1:
          this.$router.push('/home/message');
          break;
        case 2:
          this.$router.push('/home/cart');
          break;
        case 3:
          this.$router.push('/home/mine');
          break;
        default:
          this.$router.push('/home/homepage')
      }
    },
    // 检查本地是否有账号登录记录， 有则自动登录跳往主页， 没有则跳转到登录页面
    async autoLogin() {
      let str = localStorage.getItem('user');
      if(!str) this.$router.replace('/login')
      const {username, password} = JSON.parse(str);
      if(username && password) {
        try {
          const data = await login(username, password);
          const {status, id} = data
          if(status == 200) {
            this.$store.commit('SETID', id)
            this.$store.commit('SETNAME', username)
          } else if(status == 404) {
            this.$router.replace('/login')
          }
        } catch (error) {
          this.$router.replace('/login')
        }
      }
    }
  },
  // 挂载之前检查是否登录, 防止页面跳动
  beforeMount() {
    // 根据 localStorage 做自动登录检查
    this.autoLogin()
  },
  mounted() {
    // 给 Tabbar 的高亮做初始化设置
    this.active = this.$route.meta.active
  }
}
</script>

<style lang="less" scoped>
.tabbar_wrap {
  height: 50px;
}
.van-tabbar{
  box-shadow: 0 -1px 5px #E2DFDF;
  .van-tabbar-item--active {
    animation: scale .3s ease;
  }

  @keyframes scale {
    0% {
      transform: scale(1);
    }
    // 10% {
    //   transform: scale(1.1);
    // }
    50% {
      transform: scale(.5);
    }
    // 90% {
    //   transform: scale(1.1);
    // }
    100% {
      transform: scale(1);
    }
  }
}
.clearfix {
  content: '';
  display: block;
  clear: both;
} 
</style>