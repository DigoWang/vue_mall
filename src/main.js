import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import { v4 } from 'uuid'
import { Empty, SwipeCell, SubmitBar, Checkbox, Tag, Card, GoodsAction, GoodsActionIcon, GoodsActionButton, Switch, Cell, DropdownMenu, DropdownItem, Col, Row, Lazyload , Swipe, SwipeItem, Search, Cascader, AddressEdit, ContactCard, Icon, PullRefresh, Tabbar, TabbarItem, Button, Form, Field, Image, NavBar, Toast} from 'vant';

import router from '@/router'
import store from '@/store'
import '@/utils/rem'
import reg from '@/utils/reg'
import Goods from '@/components/Goods'
import * as API from '@/utils/api'

Vue.use(Button);
Vue.use(Form);
Vue.use(Field);
Vue.use(Image);
Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(PullRefresh);
Vue.use(Icon);
Vue.use(ContactCard);
Vue.use(AddressEdit);
Vue.use(Cascader);
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Col);
Vue.use(Row);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Cell);
Vue.use(Switch);
Vue.use(GoodsAction);
Vue.use(GoodsActionIcon);
Vue.use(GoodsActionButton);
Vue.use(Card);
Vue.use(Tag);
Vue.use(Checkbox);
Vue.use(SubmitBar);
Vue.use(SwipeCell);
Vue.use(Empty);

Vue.component(Goods.name, Goods)

Vue.config.productionTip = false

new Vue({
  beforeCreate() {
    Vue.prototype.Toast = Toast;
    Vue.prototype.$ajax = axios;
    Vue.prototype.$reg = reg;
    Vue.prototype.uuid = v4;
    Vue.prototype.$API = API;
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')