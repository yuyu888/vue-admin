<template>
<div>
    <div class="fmenu"><div>xxxx</div><div>></div></div>
    <div class="fmenu"><div>aaaa</div><div>></div></div>

</div>
</template>

<script>
export default {
  name: 'SidebarTree',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    setPath: function(path) {
        this.$router.push(path)
    }
  },
  created() {
    // console.log(this.item)
  }
}
</script>

<style lang="scss" scoped>
    .fmenu { 
        font-size: 22px;
        color:red;
        height: 20px;
        width: 40px;
    }
</style>