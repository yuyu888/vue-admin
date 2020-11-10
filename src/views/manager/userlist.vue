<template>
<div style="margin:10px">
    <div style="margin-bottom:10px;">
        <el-input v-model="real_name" style="margin-bottom:10px;margin-right:10px;float:left;width:200px;" placeholder="请输入真实姓名" clearable size="small"></el-input>
        <el-button @click="searchUser()" style="float:left" size="small">搜索</el-button>
        <el-button @click="newUser()" style="float:right" type="primary" size="small">添加新用户</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%;">
        <el-table-column prop="id" fixed="left" label="UID">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="real_name" label="姓名">
        </el-table-column>
        <el-table-column prop="department" label="所属业务部门">
        </el-table-column>
        <el-table-column prop="roles" label="拥有角色">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="160">
        </el-table-column>
        <!--el-table-column prop="update_time" label="更新时间" width="160">
        </el-table-column-->
        <el-table-column label="操作" fixed="right" width="200">
            <template slot-scope="scope" v-if="scope.row.status==1">
                <el-button @click="modifyUser(scope.row.id, scope.row)" type="primary" size="mini">编辑</el-button>
                <el-button @click="deleteUser(scope.row.id)" type="danger" size="mini">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination style="margin:10px;float:right" background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total,  prev, pager, next" :page-size=page_size :total=total v-if="total>page_size">
    </el-pagination>
    <el-dialog title="编辑用户" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form :model="editUserForm" ref="editUserForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="真实姓名:" prop="real_name">
                <el-input v-model="editUserForm.real_name" disabled></el-input>
            </el-form-item>
            <el-form-item label="手机号:" prop="mobile">
                <el-input v-model="editUserForm.mobile" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
                <el-input v-model="editUserForm.email" disabled></el-input>
            </el-form-item>
            <el-form-item label="所属业务部门:" prop="department">
                <el-select v-model="editUserForm.department" placeholder="请选择">
                    <el-option v-for="item in department_options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="拥有角色">
                <el-checkbox-group v-model="editUserForm.roleids">
                    <el-checkbox v-for="role in role_list" :label="role.id" :key="role.id">{{role.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateUser()">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="新增用户" :visible.sync="addDialogVisible" width="30%" :before-close="handleAddClose">
        <el-form :model="addUserForm" ref="addUserForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="真实姓名:" prop="real_name">
                <el-input v-model="addUserForm.real_name"></el-input>
            </el-form-item>
            <el-form-item label="手机号:" prop="mobile">
                <el-input v-model="addUserForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
                <el-input v-model="addUserForm.email"></el-input>
            </el-form-item>
            <el-form-item label="所属业务部门:" prop="department">
                <el-select v-model="addUserForm.department" placeholder="请选择">
                    <el-option v-for="item in department_options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>            </el-form-item>
            <el-form-item label="拥有角色">
                <el-checkbox-group v-model="addUserForm.roleids">
                    <el-checkbox v-for="role in role_list" :label="role.id" :key="role.id">{{role.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser()">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    name: 'UserList',
    data() {
        return {
            tableData: [],
            listLoading: false,
            total: 0,
            page_size: 20,
            page: 1,
            dialogVisible: false,
            current_id: 0,
            editUserForm: {
                'real_name': '',
                'mobile': '',
                'email': '',
                'department': '',
                'roleids': []
            },
            real_name: '',
            role_list: [],
            addUserForm: {
                'real_name': '',
                'mobile': '',
                'email': '',
                'department': '',
                'roleids': []
            },
            department_options: [{
                value: '技术',
                label: '技术'
            }, {
                value: '测试',
                label: '测试'
            }, {
                value: '运营',
                label: '运营'
            }, {
                value: '市场',
                label: '市场'
            }, {
                value: '产品',
                label: '产品'
            }],
            addDialogVisible: false
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            var self = this
            self.listLoading = true
            this.$ajax.post(this.UTIL.AJAX_BASEURL + '/api/manager/user/list', {
                real_name: self.real_name,
                page: self.page,
                page_size: self.page_size
            }).then((res) => {
                // 这里处理拿到的数据
                if (res.status === 200) {
                    self.tableData = res.data.list
                    self.role_list = res.data.role_list
                    self.total = res.data.total
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

        deleteUser(id) {
            var self = this
            this.$confirm('请再次确认是否继续执行操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                self.listLoading = true
                this.$ajax.post(this.UTIL.AJAX_BASEURL + '/api/manager/user/delete', {
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
        handleSizeChange(val) {
            this.page_size = val
            this.getList()
        },
        handleCurrentChange(val) {
            this.page = val
            this.getList()
        },
        modifyUser(uid, user) {
            this.dialogVisible = true
            this.current_id = uid
            this.editUserForm.email = user.email
            this.editUserForm.real_name = user.real_name
            this.editUserForm.mobile = user.mobile
            this.editUserForm.department = user.department
            if (user.roleids != null) {
                this.editUserForm.roleids = user.roleids
            }
        },
        handleClose() {
            this.dialogVisible = false
        },
        handleAddClose() {
            this.addDialogVisible = false
        },
        updateUser() {
            var self = this
            self.listLoading = true
            this.$ajax.post(this.UTIL.AJAX_BASEURL + '/api/manager/user/edit', {
                id: self.current_id,
                department: self.editUserForm.department,
                roleids: self.editUserForm.roleids,
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
            this.dialogVisible = false
        },
        addUser() {
            var self = this
            self.listLoading = true
            this.$ajax.post(this.UTIL.AJAX_BASEURL + '/api/manager/user/add', {
                mobile: self.addUserForm.mobile,
                email: self.addUserForm.email,
                real_name: self.addUserForm.real_name,
                department: self.addUserForm.department,
                roleids: self.addUserForm.roleids,
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
        newUser() {
            this.addDialogVisible = true
        },
        searchUser() {
            this.getList()
            this.real_name = ''
        }
    }
}
</script>
