<template>
    <div class="home">
        <van-loading v-if="loading" color="#ff7294" size="50" />
        <!-- <BScroll ref="BScroll" @scroll="contentScroll"> -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-nav-bar title="首页" />
            <van-swipe
                class="my-swipe"
                :autoplay="3000"
                indicator-color="white"
            >
                <van-swipe-item
                    v-for="(item, index) in bannerList"
                    :key="index"
                >
                    <van-image :src="item.image" />
                </van-swipe-item>
            </van-swipe>
            <div class="recommend">
                <van-grid>
                    <van-grid-item
                        v-for="(item, index) in recommendList"
                        :key="index"
                    >
                        <van-image :src="item.image" />
                        <span>{{ item.title }}</span>
                    </van-grid-item>
                </van-grid>
            </div>

            <div class="feature">
                <van-divider content-position="center">本周流行</van-divider>
                <van-grid clickable>
                    <van-grid-item
                        v-for="(item, index) in keywordList"
                        :key="index"
                        icon="photo-o"
                        :text="item.words"
                    />
                </van-grid>
            </div>
            <div class="goods">
                <van-tabs v-model="active" sticky swipeable animated>
                    <van-tab title="流行">
                        <van-grid :border="false" :column-num="2">
                            <van-grid-item
                                @click="gotoDetail(item.iid)"
                                v-for="(item, i) in goods.pop.list"
                                :key="i"
                            >
                                <van-image :src="item.show.img" />
                                <div class="title">{{ item.title }}</div>
                                <div class="pic">
                                    <span>{{ item.price }}</span>
                                    <van-icon name="star-o" />
                                    {{ item.cfav }}
                                </div>
                            </van-grid-item>
                        </van-grid>
                    </van-tab>
                    <van-tab title="新款">
                        <van-grid :border="false" :column-num="2">
                            <van-grid-item
                                @click="gotoDetail(item.iid)"
                                v-for="(item, i) in goods.sell.list"
                                :key="i"
                            >
                                <van-image :src="item.show.img" />
                                <div class="title">{{ item.title }}</div>
                                <div class="pic">
                                    <span>{{ item.price }}</span>
                                    <van-icon name="star-o" />
                                    {{ item.cfav }}
                                </div>
                            </van-grid-item>
                        </van-grid>
                    </van-tab>
                    <van-tab title="精选">
                        <van-grid :border="false" :column-num="2">
                            <van-grid-item
                                @click="gotoDetail(item.iid)"
                                v-for="(item, i) in goods.new.list"
                                :key="i"
                            >
                                <van-image :src="item.show.img" />
                                <div class="title">{{ item.title }}</div>
                                <div class="pic">
                                    <span>{{ item.price }}</span>
                                    <van-icon name="star-o" />
                                    {{ item.cfav }}
                                </div>
                            </van-grid-item>
                        </van-grid>
                    </van-tab>
                </van-tabs>
            </div>
        </van-pull-refresh>
        <!-- </BScroll> -->
        <!-- 返回顶部按钮 -->
        <!-- <div class="banktop" @click="bankTop">
            <van-icon name="share" color="#fff" size="30px" v-show="isBankTop" />
        </div>-->
        <!-- <van-tabbar>
            <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
            <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
            <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
        </van-tabbar>-->
    </div>
</template>

<script>
import request from '@/network/home'
import { Toast } from 'vant'

import BScroll from '@/components/common/BScroll/BScroll'

export default {
    data() {
        return {
            loading: true,
            active: 0,
            bannerList: [],
            recommendList: [],
            keywordList: [],
            goods: {
                pop: {
                    page: 1,
                    list: []
                },
                sell: {
                    page: 1,
                    list: []
                },
                new: {
                    page: 1,
                    list: []
                }
            },
            isBankTop: false,
            count: 0,
            isLoading: false
        }
    },
    components: {
        BScroll
    },
    //  初始化加载数据
    created() {
        this.loadHomeData()
        this.loadGoodData('pop', 1)
        this.loadGoodData('sell', 1)
        this.loadGoodData('new', 1)
    },
    methods: {
        loadHomeData() {
            request
                .loadHomeData()
                .then(
                    ({
                        data: {
                            data: { banner, recommend, keywords }
                        }
                    }) => {
                        ;(this.bannerList = banner.list),
                            (this.recommendList = recommend.list),
                            (this.keywordList = keywords.list)
                    }
                )
                .catch(err => {
                    setTimeout(() => {
                        this.loadHomeData()
                        Toast('首页加载失败，正在重试~')
                        this.isLoading = false
                        this.loading = false
                        // this.count++
                    }, 1000)
                })
        },
        loadGoodData(type, page) {
            request
                .loadTabControl(type, page)
                .then(
                    ({
                        data: {
                            data: { list }
                        }
                    }) => {
                        this.goods[type].list = this.goods[type].list.concat(
                            list
                        )
                        this.goods[type].page++
                    }
                )
                .catch(err => {
                    setTimeout(() => {
                        this.loadGoodData(type, page)
                        Toast('商品加载失败，正在重试~')
                        this.isLoading = false
                        // this.count++
                    }, 1000)
                })
        },
        // 下拉刷新
        onRefresh() {
            if (
                this.bannerList.length == 0 ||
                this.recommendList.length == 0 ||
                this.keywordList.length == 0
            ) {
                this.loadHomeData()
            } else {
                setTimeout(() => {
                    Toast('加载完成')
                    this.loading = false
                    this.isLoading = false
                    this.count++
                }, 1000)
            }
            Object.keys(this.goods).forEach(item => {
                if (this.goods[item].list.length == 0) {
                    this.loadGoodData(item)
                } else {
                    setTimeout(() => {
                        Toast('加载完成')
                        this.isLoading = false
                        this.loading = false
                        this.count++
                    }, 1000)
                }
            })
        },
        gotoDetail(iid) {
            this.$router.push(`/detail/${iid}`)
        }
        // // 返回顶部，需要BS从roll
        // bankTop() {
        //     // console.log('Bank Top', pos.y)
        //     this.$refs.BScroll.scrollTo();
        // },
        // // 获取BScroll的滑动位置
        // contentScroll(ops) {
        //     if (-ops.y > 800) {
        //         this.isBankTop = true;
        //         return;
        //     }
        //     this.isBankTop = false;
        // }
    }
}
</script>

<style lang="less" scoped>
.home {
    // 如果使用BScroll需要将这几个注释打开
    // height: 100vh;
    // box-sizing: border-box;
    // overflow: hidden;
    .van-nav-bar {
        background-color: #f9496f;
        .van-nav-bar__title {
            color: #fff;
        }
    }
    padding-bottom: 50px;
    .van-swipe {
        .van-swipe-item {
            img {
                width: 100%;
            }
        }
    }
    .recommend {
        .van-grid {
            padding: 10px 0;
            .van-grid-item {
                span {
                    font-size: 14px;
                    margin-top: 10px;
                }
            }
        }
    }
    .feature {
        padding-top: 10px;
        .van-divider {
            background-color: #fff;
            margin: 0;
            padding: 10px 0;
            font-size: 16px;
            color: #000;
        }
        background-color: #ededed;
    }
    .goods {
        .van-grid {
            margin-top: 10px;
        }
        .title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
            width: 45vw;
            padding: 2px 0;
        }
        .pic {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
            text-align: center;
            padding: 2px 0;
            span {
                color: red;
                font-size: 12px;
                padding: 0 15px;
            }
        }
    }
    // .banktop {
    //     position: fixed;
    //     bottom: 80px;
    //     right: 30px;
    //     z-index: 9;
    //     background-color: #f9496f;
    //     border-radius: 25%;
    //     transform: rotateZ(-90deg);
    //     opacity: 0.9;
    // }
}
</style>

<style lang="less">
.goods,
.recommend {
    .van-grid-item {
        .van-grid-item__content {
            padding: 0 8px;
        }
        .van-image {
            img {
                border-radius: 5px;
            }
        }
    }
}
</style>
