<template>
    <div class="cart">
        <van-nav-bar
            fixed
            title="购物车"
            left-text="返回"
            left-arrow
            @click-left="onBack"
        />
        <div class="cart-list">
            <div v-show="Object.keys(goods).length == 0" class="not-found">
                购物车是空的呢~
            </div>
            <van-swipe-cell v-for="item in goods" :key="item.id">
                <template #left>
                    <van-button square type="primary" text="选择" />
                </template>
                <van-card
                    :num="item.count"
                    :price="item.price"
                    desc="描述信息"
                    :title="item.title"
                    :thumb="item.img"
                >
                    <template #footer>
                        <van-button size="mini" @click="addItem(item.id)"
                            >+</van-button
                        >
                        <van-button size="mini" @click="subItem(item.id)"
                            >-</van-button
                        >
                    </template>
                </van-card>
                <template #right>
                    <van-button
                        square
                        type="danger"
                        text="删除"
                        @click="delItem(item.id)"
                    />
                </template>
            </van-swipe-cell>
        </div>
        <van-submit-bar
            :price="allPrice * 100"
            button-text="提交订单"
            @submit="onSubmit"
        />
    </div>
</template>

<script>
import { Dialog } from 'vant'

export default {
    methods: {
        onSubmit() {
            console.log(9)
        },
        onBack() {
            this.$router.back()
        },
        delItem(id) {
            this.$store.commit('delItem', id)
        },
        addItem(id) {
            this.$store.commit('addItem', id)
        },
        subItem(id) {
            if (this.$store.state.cart[id].count == 1) {
                Dialog.confirm({
                    title: '移出购物车',
                    message:
                        '该商品在您的购物车中只有一个，是否需要从购物车中移除'
                })
                    .then(() => {
                        this.$store.commit('delItem', id)
                    })
                    .catch(() => {
                        // on cancel
                    })
                return
            }
            this.$store.commit('subItem', id)
        }
    },
    computed: {
        goods() {
            return this.$store.state.cart
        },
        allPrice() {
            let index = Object.keys(this.goods)
            let allPrice = 0
            for (let i = 0; i < index.length; i++) {
                allPrice +=
                    this.goods[index[i]].price * this.goods[index[i]].count
            }
            return allPrice
        }
    }
}
</script>

<style lang="less" scoped>
.cart {
    padding: 50px 0 100px 0;
    .van-nav-bar {
        background-color: #f9496f;
        .van-nav-bar__title,
        .van-nav-bar__text,
        .van-icon {
            color: #fff;
        }
    }
    .van-submit-bar {
        bottom: 50px;
    }
    .cart-list {
        .van-button {
            height: 100%;
        }
    }
    .not-found {
        text-align: center;
        line-height: 200px;
        font-size: 14px;
    }
}
</style>
