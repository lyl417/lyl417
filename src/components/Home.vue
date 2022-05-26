<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header style="height:80px;">
      <div> 
        <img src="../assets/images/logo.png"/>
        <span style="color:#303133">CRM</span>
      </div>
      <!-- <el-button type="info" @click="logout">退出</el-button> -->
      <el-dropdown trigger="click" style="cursor: pointer;">
          <span class="el-dropdown-link userinfo-inner">
            <span class="user-name">欢迎，{{this.username}}</span>
            <!-- 头像 -->
            <!-- <auth-img v-if="user.icon && (user.icon != 'undefined')" class="user-icon" 
              :url="user.icon" :thumbnail="true"></auth-img> -->
            <!-- <img class="user-icon" :src="require('@/assets/images/headimage.png')"> -->
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="dialogFormVisibleMeth">个人中心</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '230px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#e8e8e8" text-color="#000000" active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
          <!-- 一级菜单 -->
          <template v-for="item in menulist">
            <!--一级菜单 没有子菜单-->
            <el-menu-item 
              v-if="item.child == undefined || item.child == null || item.child.length == 0"
              :index="item.gncd1_lj"
              :key="item.gncd1_id" @click="saveNavState(item.gncd1_lj)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-link"></i>
                <!-- 文本 -->
                <span>{{item.gncd1_name}}</span>
              </template>
            </el-menu-item>
            <!--一级菜单 有子菜单-->
            <el-submenu 
              v-if="item.child != undefined && item.child != null && item.child.length > 0"
              :index="item.gncd1_id+ ''"
              :key="item.gncd1_id">
              <!-- 一级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{item.gncd1_name}}</span>
              </template>
              <template v-for="subItem in item.child">
              <!--二级菜单 没有子菜单-->
                <el-menu-item 
                  v-if="subItem.child == undefined || subItem.child == null || subItem.child.length == 0"
                  :index="subItem.gncd1_lj"
                  :key="subItem.gncd1_id" @click="saveNavState(subItem.gncd1_lj)">
                  <template slot="title">
                    <!-- 图标 -->
                    <i class="el-icon-link"></i>
                    <!-- 文本 -->
                    <span>{{subItem.gncd1_name}}</span>
                  </template>
                </el-menu-item>
                <!--二级菜单 有子菜单-->
                <el-submenu 
                  v-if="subItem.child != undefined && subItem.child != null && subItem.child.length > 0"
                  :index="subItem.gncd1_id+ ''"
                  :key="subItem.gncd1_id">
                  <!-- 一级菜单的模板区域 -->
                  <template slot="title">
                    <!-- 图标 -->
                    <i class="el-icon-menu"></i>
                    <span>{{subItem.gncd1_name}}</span>
                  </template>
                  <!--三级菜单-->
                  <template v-for="subsubItem in subItem.child">
                  <!--三级菜单 没有子菜单-->
                    <el-menu-item 
                      :index="subsubItem.gncd1_lj"
                      :key="subsubItem.gncd1_id" @click="saveNavState(subsubItem.gncd1_lj)">
                      <template slot="title">
                        <!-- 图标 -->
                        <i class="el-icon-link"></i>
                        <!-- 文本 -->
                        <span>{{subsubItem.gncd1_name}}</span>
                      </template>
                    </el-menu-item>
                    
                  </template>

                </el-submenu>
              </template>

            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
    <!--个人信息-->
    <el-dialog width="40%" title="个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="form.zt" autocomplete="off" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState('loginuser',{
      logindata:'data',
      username: 'username',
    }),
    ...mapState('menus',{
      menulist: 'menus'
    })
  },
  data() {
    return {
      // 左侧菜单数据
      // menulist: [],
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: '',
      dialogFormVisible: false,
      form: {
        name:'',
        zt: ''
      },
      formLabelWidth: '60px'
    }
  },
  created() {
    // this.getMenuList()
    this.$store.dispatch('menus/getMenus');
    this.$store.dispatch("loginuser/getUser");
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    dialogFormVisibleMeth(){
      this.dialogFormVisible = !this.dialogFormVisible;
      this.form.name = this.logindata.gscy1Name;
      this.form.zt = this.logindata.gscy1Zt;
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #e8e8e8; 
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #e8e8e8;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #fff;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color:#C9151E;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.home_img{
  border-radius: 5px;
  width: 80%;
  height: 80%;
}
.user-icon{
  width: 40px;
  height: 36px;
  border-radius: 20px;
  margin: 10px 0 10px 10px;
  cursor: pointer;
  float: right;
}
.user-name{
  font-size: 16px;
  color: #303133;
  cursor: pointer;
  line-height: 60px;
}
.el-submenu i{
color: #000000;
}
.el-icon-menu{
  color: #000000;
}
.el-icon-link{
  color: #000000;
}
</style>
