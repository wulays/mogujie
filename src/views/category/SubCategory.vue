<template>
    <div class="sub-category">
        <van-grid :column-num="3" clickable>
            <van-grid-item
                :icon="item.image"
                :text="item.title"
                v-for="(item, i) in subCategoryList"
                :key="i"
                @click="gotoGoodList($route.query.mini)"
            />
        </van-grid>
    </div>
</template>

<script>
import { loadCategory } from '@/network/category'

export default {
    data() {
        return {
            subCategoryList: [],
            maitKey: 0
        }
    },
    created() {
        // console.log('创建')
        // 不知道为啥它每次切换到别TabBar也会创建一遍就判断一下把。。。去掉报错哈哈
        if (!this.$route.params.maitKey) {
            return
        }
        this.maitKey = this.$route.params.maitKey
        this.loadSubCategoryList(this.maitKey)
    },
    methods: {
        loadSubCategoryList(maitKey) {
            loadCategory(maitKey)
                .then(
                    ({
                        data: {
                            data: { list },
                            key
                        }
                    }) => {
                        this.subCategoryList = list
                    }
                )
                .catch(err => {
                    // console.log('至今没搞明白的错误~')
                })
        },
        gotoGoodList(miniWallkey){
            miniWallkey = miniWallkey?miniWallkey:10062603
            this.$router.push(`/goodlist/${miniWallkey}`)
        }
    }
}
</script>

<style lang="less" scoped>
.sub-category {
    height: 100%;
    overflow-y: auto;
}
</style>
