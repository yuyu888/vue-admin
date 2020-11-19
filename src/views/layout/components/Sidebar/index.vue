<template>
<el-scrollbar style="height:100%">
    <sidebar-item v-for="item in menulist" :key="item.id" :item="item" ></sidebar-item>
</el-scrollbar>
</template>

<script>
import SidebarItem from './SidebarItem.vue'

export default {
    name: 'Sidebar',
    components: {
        SidebarItem
    },
    props: {
        // route object
        menulist: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
        }
    },
    watch: {

    },
    methods: {

    }
}
</script>

