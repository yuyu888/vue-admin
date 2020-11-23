<template>
<div>
    <div style="float:right;margin-bottom:10px">
        <el-button type="primary" @click="addMenuShow(1)" size="small">添加新菜单</el-button>
    </div>
    <tree-table :data="menu_list" from="MenuList" :columns="columns" expandAll border v-loading="listLoading" :header-cell-style="{background:'#f5f5f5'}">
        <el-table-column prop="menu_type" width="150" label="类型">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.menu_type==1">{{scope.row.type_show}}</el-tag>
                <el-tag type="warning" v-if="scope.row.menu_type==2">{{scope.row.type_show}}</el-tag>
                <el-tag type="info" v-if="scope.row.menu_type==3">{{scope.row.type_show}}</el-tag>
                <el-tag type="danger" v-if="scope.row.menu_type==4">{{scope.row.type_show}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="sort_no" width="80" label="同级排序">
        </el-table-column>
        <el-table-column prop="operate" label="操作">
            <template slot-scope="scope">
                <el-button type="primary" @click="addMenuShow(scope.row.id)" v-if="scope.row._level<3" size="mini">添加子菜单</el-button>
                <el-button type="success" size="mini" @click="editMenuShow(scope.row)">编辑</el-button>
                <el-button type="danger" v-if="checkButton('deleteMenu')" @click="deleteMenu(scope.row.id)" size="mini">移除</el-button>
            </template>
        </el-table-column>
    </tree-table>
    <el-dialog title="添加子菜单" :visible.sync="addDialogVisible" width="30%">
        <el-form :model="addMenuForm" ref="addMenuForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="菜单名称:" prop="menu_name">
                <el-input v-model="addMenuForm.menu_name"></el-input>
            </el-form-item>
            <el-form-item label="地址:" prop="menu_path">
                <el-input v-model="addMenuForm.menu_path"></el-input>
            </el-form-item>
            <el-form-item label="菜单类型:">
                <el-radio-group v-model="addMenuForm.menu_type">
                    <el-radio label="1">菜单</el-radio>
                    <el-radio label="2">接口</el-radio>
                    <el-radio label="3">页面</el-radio>
                    <el-radio label="4">按钮</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="同级排序:" prop="sort_no">
                <el-input-number v-model="addMenuForm.sort_no" :min="0" :max="100" label="同级排序"></el-input-number>
            </el-form-item>
            <el-form-item label="授权角色:">
                <el-checkbox-group v-model="addMenuForm.roleids">
                    <el-checkbox v-for="role in role_list" :label="role.id" :key="role.id">{{role.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addMenu()">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="编辑菜单" :visible.sync="editDialogVisible" width="30%">
        <el-form :model="addMenuForm" ref="editMenuForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="菜单名称:" prop="menu_name">
                <el-input v-model="editMenuForm.menu_name"></el-input>
            </el-form-item>
            <el-form-item label="地址:" prop="menu_path">
                <el-input v-model="editMenuForm.menu_path"></el-input>
            </el-form-item>
            <el-form-item label="菜单类型:">
                <el-radio-group v-model="editMenuForm.menu_type">
                    <el-radio label="1">菜单</el-radio>
                    <el-radio label="2">接口</el-radio>
                    <el-radio label="3">页面</el-radio>
                    <el-radio label="4">按钮</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="同级排序:" prop="sort_no">
                <el-input-number v-model="editMenuForm.sort_no" :min="0" :max="100" label="同级排序"></el-input-number>
            </el-form-item>
            <el-form-item label="授权角色:">
                <el-checkbox-group v-model="editMenuForm.roleids">
                    <el-checkbox v-for="role in role_list" :label="role.id" :key="role.id">{{role.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editMenu()">确 定</el-button>
        </span>
    </el-dialog>
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
            columns: [{
                    text: '名称',
                    value: 'menu_name',
                    width: 200
                },
                {
                    text: '地址',
                    value: 'menu_path'
                }
            ],
            addDialogVisible: false,
            editDialogVisible: false,
            fid: 1,
            addMenuForm: {
                'menu_name': '',
                'menu_path': '',
                'menu_type': '1',
                'sort_no': 0,
                'roleids': []
            },
            role_list: [],
            editMenuForm: {
                'id': 0,
                'menu_name': '',
                'menu_path': '',
                'menu_type': '',
                'sort_no': 0,
                'roleids': []
            }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList: function () {
            var self = this
            self.listLoading = true
            this.$ajax.get(this.UTIL.AJAX_BASEURL + '/api/manager/menu/full-list').then((res) => {
                // 这里处理拿到的数据
                if (res.status === 200) {
                    self.menu_list = res.data.menu_list
                    self.role_list = res.data.role_list
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
        checkButton: function (path) {
            return this.Right.CheckPath(path,this.Right.MenuAuthList)
        },
        addMenuShow: function (fid) {
            this.fid = fid
            this.addDialogVisible = true
            this.addMenuForm = {
                'menu_name': '',
                'menu_path': '',
                'menu_type': '1',
                'sort_no': 0,
                'roleids': []
            }
        },
        addMenu: function () {
            var self = this
            self.listLoading = true
            this.$ajax.post(this.UTIL.AJAX_BASEURL + '/api/manager/menu/add', {
                menu_name: self.addMenuForm.menu_name,
                menu_path: self.addMenuForm.menu_path,
                menu_type: self.addMenuForm.menu_type,
                sort_no: self.addMenuForm.sort_no,
                fid: self.fid,
                roleids: self.addMenuForm.roleids
            }).then((res) => {
                // 这里处理拿到的数据
                if (res.status === 200) {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.getList()
                } else {
                    this.$message.error(res.message)
                }
            }).catch((e) => {
                // 有异常这里会输出
                this.$message.error('接口请求失败')
                console.log(e)
            })
            self.listLoading = false
            this.addDialogVisible = false
        },
        deleteMenu: function (id) {
            var self = this
            this.$confirm('此操作不可逆，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                self.listLoading = true
                this.$ajax.post(this.UTIL.AJAX_BASEURL + '/api/manager/menu/delete', {
                    id: id,
                }).then((res) => {
                    // 这里处理拿到的数据
                    if (res.status === 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.getList()
                    } else {
                        this.$message.error(res.message)
                    }
                })
                self.listLoading = false
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除操作'
                });
            });
        },
        editMenuShow: function (row) {
            var self = this
            self.editDialogVisible = true
            self.editMenuForm = {
                'id': row.id,
                'menu_name': row.menu_name,
                'menu_path': row.menu_path,
                'menu_type': row.menu_type.toString(),
                'sort_no': row.sort_no,
                'roleids': []
            }
            self.listLoading = true
            this.$ajax.post(this.UTIL.AJAX_BASEURL + '/api/manager/menu/menu-role', {
                id: row.id,
            }).then((res) => {
                // 这里处理拿到的数据
                if (res.status === 200) {
                    if (res.data instanceof Array) {
                        self.editMenuForm.roleids = res.data
                    }
                } else {
                    this.$message.error(res.message)
                }
            }).catch((e) => {
                // 有异常这里会输出
                this.$message.error('接口请求失败')
                console.log(e)
            })
            self.listLoading = false
        },
        editMenu: function (formName) {
            var self = this
            self.listLoading = true
            this.$ajax.post(this.UTIL.AJAX_BASEURL + '/api/manager/menu/edit', {
                menu_name: self.editMenuForm.menu_name,
                menu_path: self.editMenuForm.menu_path,
                menu_type: self.editMenuForm.menu_type,
                sort_no: self.editMenuForm.sort_no,
                id: self.editMenuForm.id,
                roleids: self.editMenuForm.roleids
            }).then((res) => {
                // 这里处理拿到的数据
                if (res.status === 200) {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.getList()
                } else {
                    this.$message.error(res.message)
                }
            }).catch((e) => {
                // 有异常这里会输出
                this.$message.error('接口请求失败')
                console.log(e)
            })
            self.listLoading = false
            this.editDialogVisible = false
        },
        setRoles: function () {}
    }
}
</script>
