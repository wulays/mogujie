<template>
    <div class="swiper-warp">
        <ul>
            <slot></slot>
        </ul>
    </div>
</template>


<style lang="less" scoped>
.swiper-warp {
    overflow: hidden;
    ul {
        width: 100%;
        float: left;
        li {
            width: 100%;
        }
    }
}
</style>