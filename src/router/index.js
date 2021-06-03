import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store'

// 引入路由组件对象文件
import routes from "@/router/routes";

Vue.use(VueRouter);

const push_copy = VueRouter.prototype.push;
const replace_copy = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, resolved, rejected) {
  return resolved && rejected
    ? push_copy.call(this, location, resolved, rejected).catch(() => {})
    : push_copy.call(this, location).catch(() => {});
};
VueRouter.prototype.replace = function(location, resolved, rejected) {
  return resolved && rejected
    ? replace_copy.call(this, location, resolved, rejected).catch(() => {})
    : replace_copy.call(this, location).catch(() => {});
};

const router = new VueRouter({
  mode: "history",
  routes,
  // 切换路由时, 回到顶端
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});

// router.beforeEach(async (to, from, next) => {
//   let token = store.state.user.id;
//   let userInfo = store.state.user.userInfo;

//   if(token) {
//     if(to.path === '/login') {
//       next('/');
//     } else {
//       if(userInfo.username) {
//         next()
//       } else {
//         try {
//           await store.dispatch('getUserInfo', token)
//         } catch (error) {
//           store.dispatch('resetToken');
//           next('/login')
//         } 
//       }
//     }
//   } else {
//     next()
//   }
// })

export default router;