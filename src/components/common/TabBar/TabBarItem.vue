<template>
    <router-link tag="li" :to="path">
        <i :class="['iconfont', icon]"></i>
        <div>
            <slot>首页</slot>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: 'icon-home'
        },
        path: {
            type: String,
            default: '/'
        }
    }
}
</script>

<style lang="less" scoped>
.iconfont{
    font-size: .7rem;
}
</style>