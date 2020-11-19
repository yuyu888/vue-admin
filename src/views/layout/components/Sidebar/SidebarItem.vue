<template>
<div v-if="item.has_auth">
    <div class="menubox" :class="{'cmenubgc':isCurrentMenu}" @click="cilckMenu(item.has_child, item.menu_path)">
        <div class="mname"><b>{{item.menu_name}}</b></div>
        <div class="childshow" v-if="item.has_child==true">
            <i class="el-icon-arrow-right" v-if="show_child==false"></i>
            <i class="el-icon-arrow-down" v-else></i>
        </div>
    </div>
    <div style="padding-left:20px" v-if="item.has_child==true && show_child==true">
        <sidebar-item v-for="child in item.children" :key="child.id" :item="child"></sidebar-item>
    </div>
</div>
</template>

<script>
import Bus from '@/utils/bus'

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
        cilckMenu(hasChild, path) {
            if (hasChild) {
                this.show_child = this.show_child == true ? false : true
            } else {
                this.$router.push(path)
            }
            Bus.$emit('changeMenu', path)
        },
        changeMenu(path) {
            this.isCurrentMenu = this.item.menu_path == path ? true : false;
        }
    },
    data() {
        return {
            show_child: false,
            isCurrentMenu: false
        }
    },
    mounted() {
        Bus.$on('changeMenu', this.changeMenu)
    },
    created() {
        // console.log(this.item)
    }
}
</script>

<style scoped>
.menubox {
    height: 20px;
    padding: 10px;
    cursor: pointer;
}

.menubox:hover {
    background: #eff1ef;
    border-left-width: 6px;
    border-left-style: solid;
    border-left-color: rgb(119, 179, 171);
}

.cmenubgc {
    background:  #d1d6d1;
}

.mname {
    color: rgba(68, 66, 66, 0.966);
    float: left;
    height: 20px;
}

.childshow {
    float: right;
    height: 20px;
    width: 10px;
}
</style>
