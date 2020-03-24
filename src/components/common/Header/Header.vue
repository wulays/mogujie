<template>
    <ul class="header" :style="`background-color:${bgcolor}; color: ${color}`">
        <li>
            <slot name="left"></slot>
        </li>
        <li>
            <slot></slot>
        </li>
        <li>
            <slot name="right"></slot>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        bgcolor: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-around;
    line-height: 2.25rem;
    text-align: center;
    font-size: 0.9rem;
    li {
        flex: 4;
    }
    li:first-child,
    li:last-child {
        flex: 1;
    }
}
</style>