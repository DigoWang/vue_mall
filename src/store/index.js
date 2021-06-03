import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import home from '@/store/modules/home'
import goodDetail from '@/store/modules/goodDetail'
import cart from '@/store/modules/cart'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        home,
        goodDetail,
        cart
    }
});

export default store