<template>
<div style="margin:10px">
    <div style="margin-bottom:10px;float:right">
        <el-button @click="newRole()" type="primary" size="small">添加新角色</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%;">
        <el-table-column prop="id" fixed="left" label="ID">
        </el-table-column>
        <el-table-column prop="name" label="角色名称">
        </el-table-column>
        <el-table-column prop="members" label="角色成员">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="380">
            <template slot-scope="scope">
                <el-button @click="modifyRole(scope.row.id, scope.row.name)" type="primary" size="mini">修改名称</el-button>
                <el-button @click="memberOpt(scope.row.id, scope.row.name)" type="success" size="mini">成员管理</el-button>
                <el-button @click="menuOpt(scope.row.id, scope.row.name)" type="success" size="mini">授权菜单</el-button>
                <el-button @click="deleteRole(scope.row.id)" type="danger" size="mini">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="30%" :before-close="addHandleClose">
        <el-form :model="addRoleForm" ref="addRoleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色名称:" prop="role_name">
                <el-input v-model="addRoleForm.role_name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRole()">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog title="编辑角色" :visible.sync="editDialogVisible" width="30%" :before-close="editHandleClose">
        <el-form :model="editRoleForm" ref="editRoleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色名称:" prop="role_name">
                <el-input v-model="editRoleForm.role_name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateRole()">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="成员管理" :visible.sync="memberDialogVisible" :before-close="memberDialogVisibleClose">
        {{memberRoleName}}:
        <el-tag v-for="tag in memberList" :key="tag.real_name" closable type="success" @close="DeleteRoleMember(tag.id)">
            {{tag.real_name}}
        </el-tag>
        <div style="margin-bottom:10px;margin-top:20px;">
            <el-input v-model="real_name" style="margin-bottom:10px;margin-right:10px;float:left;width:200px;" placeholder="请输入真实姓名" clearable size="small"></el-input>
            <el-button @click="searchUser()" style="float:left" size="small">搜索</el-button>
        </div>
        <el-table :data="userList">
            <el-table-column property="id" label=""></el-table-column>
            <el-table-column property="real_name" label="姓名"></el-table-column>
            <el-table-column property="mobile" label="电话" width="160"></el-table-column>
            <el-table-column property="email" label="邮箱" width="160"></el-table-column>
            <el-table-column property="department" label="部门"></el-table-column>
            <el-table-column label="操作" fixed="right" width="280">
                <template slot-scope="scope">
                    <el-button @click="addRoleMember(scope.row.id)" type="success" size="mini">添加</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
    <el-dialog title="授权菜单" :visible.sync="menuDialogVisible">
        {{menuRoleName}}:
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
            <el-table-column prop="operate" label="状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.has_auth" active-color="#13ce66" inactive-color="#ff4949" @change='authorize($event,scope.row.id)'>
                    </el-switch>
                </template>
            </el-table-column>
        </tree-table>
    </el-dialog>
</div>
</template>

<script>
import treeTable from '@/components/TreeTable'

export default {
    name: 'RoleList',
    components: {
        treeTable
    },
    data() {
        return {
            tableData: [],
            listLoading: false,
            addDialogVisible: false,
            addRoleForm: {
                "role_name": ''
            },
            editDialogVisible: false,
            editRoleForm: {
                "id": 0,
                "role_name": ''
            },
            memberDialogVisible: false,
            memberRoleId: 0,
            memberRoleName: '',
            userList: [],
            memberList: [],
            real_name: '',
            menuDialogVisible: false,
            menuRoleName: '',
            menuRoleId: 0,
            menu_list: [],
            columns: [{
                    text: '名称',
                    value: 'menu_name',
                    width: 200
                },
                {
                    text: '地址',
                    value: 'menu_path'
                }
            ]

        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            var self = this
            self.listLoading = true
            this.$ajax.get(this.UTIL.AJAX_BASEURL + '/api/manager/role/list', {}).then((res) => {
                // 这里处理拿到的数据
                if (res.status === 200) {
                    self.tableData = res.data
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

        deleteRole(id) {
            var self = this
            this.$confirm('此操作不可逆，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                self.listLoading = true
                this.$ajax.post(this.UTIL.AJAX_BASEURL + '/api/manager/role/delete', {
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

        modifyRole(roleid, role_name) {
            this.editDialogVisible = true
            this.editRoleForm.id = roleid
            this.editRoleForm.role_name = role_name
        },
        editHandleClose() {
            this.editDialogVisible = false
            this.getList()

        },
        memberDialogVisibleClose() {
            this.memberDialogVisible = false
            this.getList()
        },
        addHandleClose() {
            this.addDialogVisible = false
            this.getList()
        },
        addRole() {
            var self = this
            self.listLoading = true
            this.$ajax.post(this.UTIL.AJAX_BASEURL + '/api/manager/role/add', {
                role_name: self.addRoleForm.role_name
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
        updateRole() {
            var self = this
            self.listLoading = true
            this.$ajax.post(this.UTIL.AJAX_BASEURL + '/api/manager/role/edit', {
                id: self.editRoleForm.id,
                role_name: self.editRoleForm.role_name
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
            self.editRoleForm.id = roleid
            self.editRoleForm.role_name = ''
        },
        newRole() {
            this.addDialogVisible = true
        },
        memberOpt(roleid, rolename) {
            this.memberDialogVisible = true
            this.memberRoleId = roleid
            this.memberRoleName = rolename
            this.getRoleMember()
        },
        searchUser() {
            var self = this
            self.listLoading = true
            this.$ajax.post(this.UTIL.AJAX_BASEURL + '/api/manager/user/list', {
                real_name: self.real_name,
                status: 1
            }).then((res) => {
                // 这里处理拿到的数据
                if (res.status === 200) {
                    self.userList = res.data.list
                    self.total = res.data.count
                } else {
                    this.$message.error(res.message)
                }
            }).catch((e) => {
                // 有异常这里会输出
                this.$message.error('接口请求失败')
                console.log(e)
            })
            self.listLoading = false
            self.real_name = ''
        },
        addRoleMember(uid) {
            var self = this
            self.listLoading = true
            this.$ajax.post(this.UTIL.AJAX_BASEURL + '/api/manager/role/add-role-member', {
                roleid: self.memberRoleId,
                uid: uid
            }).then((res) => {
                // 这里处理拿到的数据
                if (res.status === 200) {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.getRoleMember()
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
        getRoleMember() {
            var self = this
            self.listLoading = true
            this.$ajax.get(this.UTIL.AJAX_BASEURL + '/api/manager/role/member-list', {
                roleid: self.memberRoleId,
            }).then((res) => {
                // 这里处理拿到的数据
                if (res.status === 200) {
                    self.memberList = res.data
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
        DeleteRoleMember(uid) {
            var self = this
            self.listLoading = true
            this.$ajax.post(this.UTIL.AJAX_BASEURL + '/api/manager/role/delete-role-member', {
                roleid: self.memberRoleId,
                uid: uid
            }).then((res) => {
                // 这里处理拿到的数据
                if (res.status === 200) {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.getRoleMember()
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
        menuOpt(roleid, rolename) {
            var self = this
            self.menuDialogVisible = true
            self.menuRoleId = roleid
            self.menuRoleName = rolename
            self.listLoading = true
            this.$ajax.get(this.UTIL.AJAX_BASEURL + '/api/manager/menu/role-list', {
                role_id: roleid
            }).then((res) => {
                // 这里处理拿到的数据
                if (res.status === 200) {
                    self.menu_list = res.data.menu_list
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
        authorize($event, menu_id) {
            var reqApi = this.UTIL.AJAX_BASEURL + '/api/manager/role/add-role-menu'
            if ($event == false) {
                reqApi = this.UTIL.AJAX_BASEURL + '/api/manager/role/delete-role-menu'
            }
            var self = this
            self.listLoading = true
            this.$ajax.post(reqApi, {
                role_id: self.menuRoleId,
                menu_id: menu_id
            }).then((res) => {
                // 这里处理拿到的数据
                if (res.status === 200) {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                } else {
                    this.$message.error(res.message)
                }
            }).catch((e) => {
                // 有异常这里会输出
                this.$message.error('接口请求失败')
                console.log(e)
            })
            self.listLoading = false
        }
    }
}
</script>
