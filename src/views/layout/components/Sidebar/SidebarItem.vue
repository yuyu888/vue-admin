<template>
<div v-if="item.has_auth">
  <el-menu-item v-if="!item.has_child" :index="item.id.toString()" @click="setPath(item.menu_path)">
    <span>{{item.menu_name}}</span>
  </el-menu-item>
  <el-submenu v-else :index="item.id.toString()">
    <template slot="title">{{item.menu_name}}</template>
    <template>
      <sidebar-item v-for="child in item.children" :key="child.id" :item="child"></sidebar-item>
    </template>
  </el-submenu>
</div>
</template>

<script>
export default {
  name: 'SidebarItem',
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
