<template>
<el-row class="container">
    <el-col :span="24" class="header">
        <el-col :span="4" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
            <span v-if="collapsed==false">VUEADMIN</span>
            <i v-if="collapsed" style="font-size:30px; line-height:60px" class="el-icon-menu"> </i>
        </el-col>
        <el-col :span="4">
            <div class="tools" @click.prevent="collapse">
                <i style="font-size:30px;line-height:60px" :class="collapsed?'el-icon-s-unfold':'el-icon-s-fold'"></i>
            </div>
        </el-col>
        <el-col :span="12" class="userinfo">
            <el-dropdown trigger="hover">
                <span class="el-dropdown-link userinfo-inner"><img :src="userInfo.avatar" />{{userInfo.name}}</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>我的消息</el-dropdown-item>
                    <el-dropdown-item>设置</el-dropdown-item>
                    <el-dropdown-item @click.native="gotouserpage">用户管理</el-dropdown-item>
                    <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-col>
    <el-col :span="24" class="main">
        <aside :class="collapsed?'menu-collapsed':'menu-expanded'" style="background-color:#F2F6FC">
            <sidebar :menulist="menulist"></sidebar>
        </aside>
        <section class="content-container">
            <div class="grid-content bg-purple-light">
                <el-col :span="24" class="content-wrapper">
                    <transition name="fade" mode="out-in">
                        <container-main v-if="mainShow"></container-main>
                    </transition>
                </el-col>
            </div>
        </section>
    </el-col>
</el-row>
</template>

<script>
import Sidebar from './components/Sidebar/index.vue'
import ContainerMain from './components/ContainerMain.vue'

export default {
    name: 'Layout',
    components: {
        Sidebar,
        ContainerMain
    },
    data() {
        return {
            sysName: 'VUEADMIN',
            collapsed: false,
            menulist: [],
            userInfo: {
                name: '',
                avatar: '',
            },
            mainShow: false,
            menu_auth_list: {}
        }
    },
    watch: {
        $route(to, from) {
            // console.log(from.path); //从哪来
            // console.log(to.path); //到哪去
            //console.log(this.$route.path)
            this.checkPageAuth()
        }
    },
    created() {
        this.init()
    },
    methods: {
        //退出登录
        logout: function () {
            this.$ajax.get(this.UTIL.AJAX_BASEURL + '/api/common/sso/loginout', {}).then((res) => {
                // 这里处理拿到的数据
                if (res.status === 200) {
                    window.location.href = '/login'
                } else {}
            }).catch((e) => {
                // 有异常这里会输出
                console.log(e)
            })
        },
        init() {
            var self = this
            this.$ajax.get(this.UTIL.AJAX_BASEURL + '/api/common/sys/auth', {}).then((res) => {
                // 这里处理拿到的数据
                if (res.status === 200) {
                    self.userInfo.name = res.data.login_user.real_name
                    self.userInfo.avatar = res.data.login_user.avatar == '' ? 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2092511787,1157776987&fm=26&gp=0.jpg' : res.data.login_user.avatar
                    self.menulist = res.data.menu_list
                    self.menu_auth_list = res.data.menu_auth_list
                    this.Right.MenuAuthList = res.data.menu_auth_list
                    this.checkPageAuth()
                    self.mainShow = true
                } else {}
            }).catch((e) => {
                // 有异常这里会输出
                console.log(e)
            })
        },
        //折叠导航栏
        collapse: function () {
            this.collapsed = !this.collapsed;
        },
        checkPageAuth() {
            var thispath = this.$route.path
            if (this.menu_auth_list.hasOwnProperty(thispath) && this.menu_auth_list[thispath] == false) {
                this.$router.push("/error/403")
            }
        },
        gotouserpage() {
            this.$router.push("/manager/userlist")
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
.container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .header {
        height: 60px;
        line-height: 60px;
        background: #489D89;
        color: #fff;

        .userinfo {
            text-align: right;
            padding-right: 35px;
            float: right;

            .userinfo-inner {
                cursor: pointer;
                color: #fff;

                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    margin: 10px 0px 10px 10px;
                    float: right;
                }
            }
        }

        .logo {
            //width:230px;
            height: 60px;
            font-size: 22px;
            padding-left: 20px;
            padding-right: 20px;
            border-color: rgba(238, 241, 146, 0.3);
            border-right-width: 0px;
            border-right-style: solid;

            img {
                width: 40px;
                float: left;
                margin: 10px 10px 10px 18px;
            }

            .txt {
                color: #fff;
            }
        }

        .logo-width {
            width: 230px;
        }

        .logo-collapse-width {
            width: 60px
        }

        .tools {
            padding: 0px 10px;
            width: 14px;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
        }
    }

    .main {
        display: flex;
        // background: #324057;
        position: absolute;
        top: 60px;
        bottom: 0px;
        overflow: hidden;

        aside {
            flex: 0 0 230px;
            width: 230px;

            // position: absolute;
            // top: 0px;
            // bottom: 0px;
            .el-menu {
                height: 100%;
            }

            .collapsed {
                width: 60px;

                .item {
                    position: relative;
                }

                .submenu {
                    position: absolute;
                    top: 0px;
                    left: 60px;
                    z-index: 99999;
                    height: auto;
                    display: none;
                }

            }
        }

        .menu-collapsed {
            flex: 0 0 0px;
            width: 0px;
            display: none
        }

        .menu-expanded {
            flex: 0 0 230px;
            width: 230px;
        }

        .content-container {
            // background: #f1f2f7;
            flex: 1;
            // position: absolute;
            // right: 0px;
            // top: 0px;
            // bottom: 0px;
            // left: 230px;
            overflow-y: scroll;
            padding: 20px;

            .breadcrumb-container {

                //margin-bottom: 15px;
                .title {
                    width: 200px;
                    float: left;
                    color: #475669;
                }

                .breadcrumb-inner {
                    float: right;
                }
            }

            .content-wrapper {
                background-color: #fff;
                box-sizing: border-box;
            }
        }
    }
}
</style>
