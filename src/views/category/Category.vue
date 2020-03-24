<template>
    <div class="category">
        <van-loading v-if="loading" color="#ff7294" size="50" />
        <van-nav-bar fixed title="商品分类" />
        <div class="menu">
            <van-sidebar v-model="activeKey">
                <van-sidebar-item
                    v-for="item in sideBarList"
                    :key="item.maitKey"
                    :title="item.title"
                    :to="`/category/${item.maitKey}?mini=${item.miniWallkey}`"
                />
            </van-sidebar>
            <keep-alive>
                <router-view :key="key"></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import SubCategory from '@/views/category/SubCategory'
import { loadSideBar } from '@/network/category'

export default {
    data() {
        return {
            loading: true,
            activeKey: 0,
            sideBarList: []
        }
    },
    created() {
        this.loadSideBarData()
    },
    components: {
        SubCategory
    },
    computed: {
        key() {
            return this.$route.path
        }
    },
    methods: {
        loadSideBarData() {
            loadSideBar().then(
                ({
                    data: {
                        data: { category }
                    }
                }) => {
                    this.sideBarList = category.list
                    this.loading = false
                }
            )
        }
    }
}
</script>

<style lang="less" scoped>
.category {
    padding: 46px 0 50px 0;
    overflow: hidden;
    .menu {
        display: flex;
        .van-sidebar,
        .sub-category {
            height: calc(100vh - 100px);
            overflow-y: auto;
            flex: 1;
        }
        .sub-category {
            flex: 3;
        }
    }
}
</style>
