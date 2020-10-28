<template>
<div>
  <div style="float:right;margin-bottom:10px">
    <el-button type="primary" @click="addMenuShow('form', 1)" size="small">添加新菜单</el-button>
  </div>
  <tree-table :data="menu_list" from="MenuList" :columns="columns" expandAll border v-loading="listLoading" :header-cell-style="{background:'#f5f5f5'}">
    <el-table-column prop="type" width="150" label="类型">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.type==1">{{scope.row.type_show}}</el-tag>
        <el-tag type="warning" v-if="scope.row.type==2">{{scope.row.type_show}}</el-tag>
        <el-tag type="info" v-if="scope.row.type==3">{{scope.row.type_show}}</el-tag>
        <el-tag type="danger" v-if="scope.row.type==4">{{scope.row.type_show}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="sort_no" width="80" label="同级排序">
    </el-table-column>
    <el-table-column prop="operate" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="addMenuShow('form', scope.row.id)" size="mini">添加子菜单</el-button>
        <el-button type="success" size="mini" @click="editMenuShow('form', scope.row.id)">编辑</el-button>
        <el-button type="danger" v-if="checkButton('deleteMenu')" @click="deleteMenu(scope.row.id)" size="mini">移除</el-button>
        <el-button type="warning" @click="setRoleShow(scope.row.id, scope.row.menu_name)" size="mini">授权角色</el-button>
      </template>
    </el-table-column>
  </tree-table>
</div>
</template>

<script>
import treeTable from '@/components/TreeTable'
export default {
  name: 'MenuList',
  components: {
    treeTable
  },
  data() {
    return {
      menu_list: [],
      listLoading: true,
      columns: [
        {
          text: '名称',
          value: 'menu_name',
          width: 200
        },
        {
          text: '地址',
          value: 'menu_path'
        }
      ],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList: function () {
      var self = this
      self.listLoading = true
      // this.$ajax.get(this.UTIL.AJAX_BASEURL + '/api/manager/init/auth').then((res) => {
        this.$ajax.get(this.UTIL.AJAX_BASEURL + '/api/manager/init/auth').then((res) => {
        // 这里处理拿到的数据
        if (res.status === 200) {
          self.menu_list = res.data.menuList
        } else {
          this.$message.error(res.message)
        }
        self.listLoading = false
      }).catch((e) => {
        // 有异常这里会输出
        this.$message.error('接口请求失败')
        console.log(e)
      })
    },
    checkButton: function (path) {},
    addMenuShow: function (formName, fid) {

    },
    addMenu: function (formName) {

    },
    deleteMenu: function (id) {

    },
    editMenuShow: function (formName, id) {},
    editMenu: function (formName) {

    },
    setRoleShow: function (menuId, menuName) {

    },
    setRoles: function () {}
  }

}
</script>
