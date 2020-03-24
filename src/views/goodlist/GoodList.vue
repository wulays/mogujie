<template>
    <div class="goods-list">
        <van-loading v-if="loading" color="#ff7294" size="50" />
        <van-nav-bar
            fixed
            title="商品列表"
            left-text="返回"
            left-arrow
            @click-left="onBack"
        />
        <van-list finished-text="没有更多了">
            <van-card
                :num="item.sale"
                :tag="item.cfav > 10000 ? '热' : ''"
                :price="item.price"
                :desc="item.shopSeller"
                :title="item.title"
                :thumb="item.img"
                :origin-price="item.orgPrice"
                v-for="item in goodList"
                :key="item.iid"
                @click="gotoDetail(item.iid)"
            >
                <template #tags v-if="item.cfav > 10000">
                    <van-tag v-for="tag in 3" :key="tag" plain type="danger">{{item.props[tag]}}</van-tag>
                </template>
            </van-card>
        </van-list>
    </div>
</template>

<script>
import { loadGoodList } from '@/network/goodlist'

export default {
    name: 'GoodList',
    data() {
        return {
            loading: true,
            goodList: [],
            miniWallkey: 10062603
        }
    },
    created() {
        this.miniWallkey = this.$route.params.miniWallkey
        this.loadGoodListData(this.miniWallkey, 'pop')
    },
    methods: {
        loadGoodListData(miniWallkey, type) {
            loadGoodList(miniWallkey, type).then(({ data }) => {
                this.goodList = data
                this.loading = false
            })
        },
        gotoDetail(iid) {
            this.$router.push(`/detail/${iid}`)
        },
        onBack() {
            this.$router.back()
        }
    }
}
</script>

<style lang="less" scoped>
.goods-list {
    padding: 46px 0 50px 0;
}
</style>
