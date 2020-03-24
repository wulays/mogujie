<template>
    <div class="detail">
        <van-loading v-if="loading" color="#ff7294" size="50" />
        <van-tabs v-model="active" sticky swipeable animated>
            <template #nav-left>
                <van-icon @click="goBack" color="#ff7294" name="arrow-left" />
            </template>
            <van-tab title="商品">
                <van-swipe
                    height="250"
                    class="my-swipe"
                    :autoplay="3000"
                    indicator-color="white"
                >
                    <van-swipe-item v-for="(item, i) in bannerList" :key="i">
                        <van-image :src="item"></van-image>
                    </van-swipe-item>
                </van-swipe>
                <div class="detail-info">
                    <div class="detail-title">{{ goods.title }}</div>
                    <div class="detail-pic">
                        {{ goods.newPrice }}
                        <s>{{ goods.oldPrice }}</s>
                        <span>{{ goods.discount }}</span>
                    </div>
                </div>
                <div class="detail-count">
                    <div v-for="item in goods.columns.length - 1" :key="item">
                        {{ goods.columns[item] }}
                    </div>
                    <div>
                        {{ goods.services[goods.services.length - 1].name }}
                    </div>
                </div>
                <div class="services">
                    <div
                        v-for="(item, i) in goods.services.length - 1"
                        :key="i"
                    >
                        <van-icon :name="goods.services[item].icon" />
                        {{ goods.services[item - 1].name }}
                    </div>
                </div>
                <div class="shop">
                    <div class="shop-title">
                        <van-image :src="shop.logo" />
                        {{ shop.name }}
                    </div>
                    <div class="shop-detail">
                        <div class="shop-count">
                            <div>
                                <span>{{ shop.sells | sellCountFilter }}</span>
                                <span>总销量</span>
                            </div>
                            <div>
                                <span>{{ shop.goodsCount }}</span>
                                <span>全部宝贝</span>
                            </div>
                        </div>
                        <div class="shop-score">
                            <div v-for="(item, i) in shop.score" :key="i">
                                {{ item.name }}
                                <span
                                    :class="{ 'high-color': item.isBetter }"
                                    >{{ item.score }}</span
                                >
                                <i
                                    v-if="!item.isBetter"
                                    style="color: #fff; background-color:#81b900;"
                                    >低</i
                                >
                                <i
                                    v-else
                                    style="color: #fff; background-color:#ff7294;"
                                    >高</i
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ditail-wrap">
                    <div class="detail-desc">{{ detailInfo.desc }}</div>
                    <div
                        class="detail-content"
                        v-for="(detail, i) in detailInfo.detailImage"
                        :key="i"
                    >
                        <div class="detail-key">{{ detail.key }}</div>
                        <van-image :src="detail.anchor" />
                        <van-image
                            :src="item"
                            v-for="(item, j) in detail.list"
                            :key="j"
                        />
                    </div>
                </div>
            </van-tab>
            <van-tab title="参数">
                <div class="params-rule" v-if="goodsParams.rule">
                    <div class="rule-title">{{ goodsParams.rule.key }}</div>
                    <van-row
                        type="flex"
                        justify="space-around"
                        v-for="(list, i) in goodsParams.rule.tables[0]"
                        :key="i"
                    >
                        <van-col span="4" v-for="(item, j) in list" :key="j">{{
                            item
                        }}</van-col>
                    </van-row>
                </div>
                <div class="params-info">
                    <div class="info-title">{{ goodsParams.info.key }}</div>
                    <van-row v-for="(item, i) in goodsParams.info.set" :key="i">
                        <van-col span="2">{{ item.key }}</van-col>
                        <van-col span="16" offset="4">{{ item.value }}</van-col>
                    </van-row>
                </div>
            </van-tab>
            <van-tab title="评论">
                <div class="comment-wrap">
                    <div class="comment-title">
                        <div>用户评价</div>
                        <div>更多</div>
                    </div>
                    <div
                        class="comment-content"
                        v-for="(comment, i) in commentList"
                        :key="i"
                    >
                        <div class="comment-user">
                            <van-image :src="comment.user.avatar" />
                            {{ comment.user.uname }}
                        </div>
                        <div class="comment">
                            <div class="comment-text">
                                {{ comment.content }}
                            </div>
                            <div class="comment-info">
                                <span>{{ comment.created }}</span>
                                {{ comment.style }}
                            </div>
                            <van-image
                                :src="item"
                                v-for="(item, j) in comment.images"
                                :key="j"
                            />
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="推荐">
                <div class="recommend">
                    <van-grid :border="false" :column-num="2">
                        <van-grid-item
                            @click="gotoDetail(item.shop_id)"
                            v-for="(item, i) in recommenList"
                            :key="i"
                        >
                            <van-image :src="item.image" />
                            <div class="title">{{ item.title }}</div>
                            <div class="pic">
                                <span>{{ item.price }}</span>
                                <van-icon name="star-o" />
                                {{ item.cfav }}
                            </div>
                        </van-grid-item>
                    </van-grid>
                </div>
            </van-tab>
        </van-tabs>
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" color="#ff7294" />
            <van-goods-action-icon to="/cart" icon="cart-o" text="购物车" />
            <van-goods-action-icon icon="star-o" text="收藏" />
            <van-goods-action-button
                @click="addCart"
                color="#ffd80a"
                text="加入购物车"
            />
            <van-goods-action-button color="#ff7294" text="立即购买" />
        </van-goods-action>
    </div>
</template>

<script>
import { loadDetail, loadRecommend, Goods, Shop } from '@/network/detail'
import { Toast } from 'vant'

export default {
    name: 'Detail',
    data() {
        return {
            loading: true,
            active: 0,
            iid: '',
            bannerList: [],
            goods: {
                columns: ['销量', '收藏'],
                services: ['快递']
            },
            shop: {},
            detailInfo: {},
            goodsParams: {
                info: {
                    key: '',
                    set: []
                },
                rule: {
                    key: '',
                    tables: []
                }
            },
            commentList: [],
            recommenList: []
        }
    },
    created() {
        this.iid = this.$route.params.iid
        this.loadDetailData(this.iid)
        this.loadRecommendData()
    },
    methods: {
        goBack() {
            this.$router.back()
        },
        loadDetailData(iid) {
            loadDetail(iid).then(({ data: { result } }) => {
                this.bannerList = result.itemInfo.topImages
                this.goods = new Goods(
                    result.itemInfo,
                    result.columns,
                    result.shopInfo.services
                )
                this.shop = new Shop(result.shopInfo)
                this.detailInfo = result.detailInfo
                this.goodsParams = result.itemParams
                this.commentList = result.rate.list
                this.loading = false
            })
        },
        loadRecommendData() {
            loadRecommend().then(
                ({
                    data: {
                        data: { list }
                    }
                }) => {
                    this.recommenList = list
                }
            )
        },
        gotoDetail(shop_id) {
            Toast('暂无商品信息')
            // this.$router.push(`/detail/${shop_id}`);
        },
        addCart() {
            this.$nextTick(() => {
                if (
                    !this.bannerList[0] ||
                    !this.goods.realPrice ||
                    !this.goods.title
                ) {
                    Toast('添加失败，请稍后重试')
                    return
                }
                let goods = {
                    id: this.iid,
                    img: this.bannerList[0],
                    title: this.goods.title,
                    price: this.goods.realPrice,
                    count: 1
                }
                this.$store.commit('addCart', goods)
                Toast('添加成功')
            })
        }
    },
    filters: {
        sellCountFilter(value) {
            let result = value
            if (value > 10000) {
                result = (result / 10000).toFixed(1) + '万'
            }
            return result
        }
    }
}
</script>

<style lang="less" scoped>
.detail {
    padding-bottom: 50px;
    .van-tabs {
        .van-icon {
            line-height: 48px;
            text-align: center;
            width: 50px;
        }
    }
    .detail-info {
        padding: 10px 5px;
        .detail-title {
            font-size: 16px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
        .detail-pic {
            padding: 10px 0;
            color: #ff7294;
            s {
                font-size: 12px;
                color: #999;
                padding: 0 5px;
            }
            span {
                background-color: #ff7196;
                border-radius: 20%;
                color: #eee;
                font-size: 12px;
                vertical-align: top;
                padding: 1px 3px;
            }
        }
    }
    .detail-count,
    .services {
        padding: 0 5px;
        display: flex;
        color: #999;
        font-size: 12px;
        text-align: center;
        div {
            flex: 2 1 auto;
            border-bottom: 1px solid #ddd;
            padding: 7px 0;
        }
        div:first-child {
            text-align: left;
        }
        div:last-child {
            text-align: right;
        }
    }
    .services {
        color: #000;
        .van-icon {
            width: 12px;
        }
        div {
            border: none;
        }
    }
    .shop {
        padding: 20px;
        border: 3px solid #f0f0f0;
        border-left: none;
        border-right: none;
        .shop-title {
            display: flex;
            align-items: center;
            font-size: 16px;
            .van-image {
                width: 40px;
                margin-right: 15px;
                border-radius: 50%;
                overflow: hidden;
                border: 1px solid #ccc;
            }
        }
        .shop-detail {
            display: flex;
            div {
                padding: 15px 0;
                flex: 1;
            }
            .shop-count {
                display: flex;
                font-size: 14px;
                div {
                    span {
                        text-align: center;
                        padding: 5px 0;
                        display: block;
                    }
                    span:last-child {
                        font-size: 12px;
                    }
                }
                div:last-child {
                    border-right: 1px solid #ccc;
                }
            }
            .shop-score {
                font-size: 12px;
                div {
                    padding: 5px 0 5px 30px;
                }
                span {
                    color: #81b900;
                    padding: 0 5px;
                    width: 25px;
                    display: inline-block;
                }
                .high-color {
                    color: #ff7294;
                }
            }
        }
    }
    .ditail-wrap {
        padding: 10px;
        .detail-desc {
            font-size: 14px;
            color: #666;
            &::before,
            &::after {
                content: ' ';
                border-bottom: 1px solid #666;
                width: 100px;
                display: block;
                margin: 20px 0;
            }
            &::after {
                margin-top: 30px;
                float: right;
            }
        }
        .detail-key {
            font-size: 14px;
            padding: 20px 0;
        }
    }
    .params-info,
    .params-rule {
        font-size: 14px;
        color: #666;
        .rule-title,
        .info-title {
            text-align: center;
            padding: 25px 0;
            color: #333;
            font-size: 16px;
            font-weight: bold;
        }
        .van-row {
            padding: 10px;
            border-bottom: 1px solid #ccc;
        }
    }
    .params-info .van-col:last-child {
        color: #ff7294;
    }
    .comment-wrap {
        padding: 10px 10px;
        // border-top: 3px solid #f0f0f0;
        .comment-title {
            display: flex;
            font-size: 16px;
            justify-content: space-between;
            padding: 15px 10px;
        }
        .comment-content {
            border-top: 1px solid #f0f0f0;
            .comment-user {
                padding: 15px 0 5px 0;
                display: flex;
                align-items: center;
                font-size: 16px;
                .van-image {
                    width: 40px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 10px;
                }
            }
            .comment {
                font-size: 14px;
                .comment-text {
                    color: #666;
                    padding: 5px;
                }
                .comment-info {
                    margin: 10px 0;
                    font-size: 12px;
                    color: #999;
                    span {
                        padding: 0 5px;
                    }
                }
                .van-image {
                    width: 80px;
                    height: 80px;
                    overflow: hidden;
                }
            }
        }
    }
    .recommend {
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
            .van-icon {
                width: 16px;
                line-height: 1;
            }
        }
    }
    .van-goods-action {
        z-index: 9;
    }
}
</style>
