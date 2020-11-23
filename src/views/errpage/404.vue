<template>
<div>404 <a @click="gohome()">返回首页</a></div>
</template>

<script>
export default {
    name: 'Page404',
    data() {
        return {}
    },
    methods: {
        gohome() {
            this.$router.push("/")
        }
    }
}
</script>
