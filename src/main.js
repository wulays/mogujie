import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
    Swipe,
    SwipeItem,
    Grid,
    GridItem,
    Image,
    Divider,
    Tab,
    Tabs,
    Tabbar,
    TabbarItem,
    Icon,
    Sticky,
    NavBar,
    PullRefresh,
    List,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    Col,
    Row,
    SubmitBar,
    Sku,
    Card,
    SwipeCell,
    Button,
    Sidebar,
    SidebarItem,
    Cell,
    CellGroup,
    Tag,
    Loading 
} from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Image);
Vue.use(Divider);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
Vue.use(Sticky);
Vue.use(NavBar);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(GoodsAction);
Vue.use(GoodsActionIcon);
Vue.use(GoodsActionButton);
Vue.use(Col);
Vue.use(Row);
Vue.use(SubmitBar);
Vue.use(Sku);
Vue.use(Card);
Vue.use(SwipeCell);
Vue.use(Button);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Tag);
Vue.use(Loading);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
