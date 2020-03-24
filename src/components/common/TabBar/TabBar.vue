<template>
    <ul class="tab-bar">
        <slot></slot>
    </ul>
</template>


<style lang="less" scoped>
@import "~@/assets/css/iconfont.css";

.tab-bar {
    padding-top: .25rem;
    line-height: 1rem;
    display: flex;
    font-size: .7rem;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 -1px 1px rgba(0, 0, 0, .1);
    background-color: #fff;
    z-index: 9;
    li {
        flex: 1;
    }
}
</style>