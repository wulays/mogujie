<template>
    <div id="app">
        <keep-alive exclude="Detail,GoodList">
            <router-view></router-view>
        </keep-alive>
        <van-tabbar route active-color="#f9496f">
            <van-tabbar-item name="home" to="/home" icon="home-o"
                >首页</van-tabbar-item
            >
            <van-tabbar-item name="category" to="/category" icon="apps-o"
                >分类</van-tabbar-item
            >
            <van-tabbar-item name="cart" to="/cart" icon="shopping-cart-o"
                >购物车</van-tabbar-item
            >
            <van-tabbar-item name="profile" to="/profile" icon="contact"
                >我的</van-tabbar-item
            >
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    }
    // 不好使，重新刷新首页就出问题了
    // created() {
    //     // 由于vant的route模式，我不知道怎么匹配动态路由
    //     // 所以这里使用正则来匹配路由，让匹配到的项高亮
    //     // this.active = /[a-z]+/.exec(this.$route.path)
    //     //     ? /[a-z]+/.exec(this.$route.path)[0]
    //     //     : 'category'
    // }
}
</script>

<style lang="less">
@import '~@/assets/css/reset.css';
html {
    font-size: 100vw / 750 * 40;
}
.van-nav-bar {
    background-color: #f9496f;
    .van-nav-bar__title,
    .van-nav-bar__text,
    .van-icon {
        color: #fff;
    }
}
.van-tab-bar {
    .router-link-active {
        color: #f9496f;
    }
}
.van-loading{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
