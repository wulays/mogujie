<template>
    <div class="scroll-wrap" style="height:85vh" ref="BScroll">
        <div class="scroll-container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    mounted(){
        this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.BScroll, {
                probeType: 3,
                click: true
            })
            this.scroll.on('scroll', pos => {
                this.$emit('scroll', pos)
            })
        })
    },
    methods: {
        scrollTo(x, y, time){
            this.scroll.scrollTo(x=0, y=0, time=300)
        }
    }
}
</script>
