<template>
<div>没有权限#403<a @click="gohome()">返回首页</a></div>
</template>

<script>
export default {
    name: 'Page403',
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
