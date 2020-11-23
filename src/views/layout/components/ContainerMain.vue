<template>
<router-view></router-view>
</template>

<script>
export default {
    name: 'ContainerMain',
    data() {
        return {}
    },
    watch: {
        // $route(to, from) {
            // console.log(from.path); //从哪来
            // console.log(to.path); //到哪去
            // console.log(this.$route.path)
        // }
    },
    created() {
        // console.log(this.$route.path)
    },
    methods: {

    }
}
</script>
