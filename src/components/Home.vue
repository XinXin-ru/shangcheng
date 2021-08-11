<template>
  <el-container class="home_container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/images/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 左侧导航栏 -->
      <!-- isCollapse 是否未true（折叠）
      collapse：是否水平收起菜单，默认flase
      unique-opened：是否保持只有一个子菜单展开 默认flase
      collapse-transition：折叠动画
       -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <el-menu
          background-color="#313743"
          text-color="#fff"
          active-text-color="#409bff"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 折叠按钮 -->
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <!-- 一级菜单 -->
          <!-- index 只接受字符串，因此item.id要转换为字符串 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id + '']"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <!-- :index="'/' + subItem.path + ''"  路由跳转，点击二级菜单跳转 -->
            <el-menu-item
              :index="'/' + subItem.path + ''"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path + '')"
            >
              <!-- 二级菜单模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主题 -->
      <el-main>
        <!-- 占位路由  Welcome是其子路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      // 一级菜单图标
      iconsObj: {
        125: "iconfont icon-user",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: "",
    };
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    // 清除缓存的token
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取所有左侧菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status != 200) return this.$message.error("res.meta.msg");
      this.menuList = res.data;
      console.log(res);
    },
    // 点击按钮，切换菜单的折叠展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      // 重新赋值，否则点击其他列表后，users将不在高亮
      this.activePath = activePath;
    },
  },
};
</script>

<style>
.home_container {
  height: 100%;
}
.el-header {
  background: #363d40;
  display: flex;
  /* 元素分布在两头 */
  justify-content: space-between;
  /* 垂直居中 */
  align-items: center;
  font-size: 20px;
  color: #fff;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-header div span {
  margin-left: 20px;
}
.el-aside {
  background: #313743;
}
.el-aside .el-menu {
  border-right: none;
}
.el-main {
  background: #e9edf1;
}
/* 图标边距 */
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  /*字间距 */
  letter-spacing: 4px;
  /* 鼠标变小手 */
  cursor: pointer;
}
</style>