<template>
<el-scrollbar style="height:100%">
    <div class="menubox"><div class="mname" ><b>xxxx</b></div><div class="childshow" ><i class="el-icon-arrow-right"></i></div></div>
    <div class="menubox"><div class="mname" ><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><b>aaaa</b></div><div class="childshow" ><i class="el-icon-arrow-down"></i></div></div>
</el-scrollbar>
</template>
<script>

export default {
  name: 'Sidebar',
  props: {
    // route object
    menulist: {
      type: Array,
      required: true
    }
  },
  created() {
    // console.log(this.menulist)

  }
}
</script>

<style scoped>
    .menubox { 
        height: 20px;
        padding: 10px;
        cursor:pointer;
    }
    .menubox:hover{
      background: #eff1ef;
      border-left-width: 6px;
      border-left-style:solid;
      border-left-color: rgb(119, 179, 171);
    }
    .mname {
        color: rgba(68, 66, 66, 0.966);
        float: left;
        height: 20px;
    }
    .childshow { 
        float: right;
        height: 20px;
        width:10px;
    }
</style>
