<template>
  <div class="app-asider">
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="$route.path"
      router>
      <el-menu-item index="/">
        <i class="el-icon-third-shouye"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>
      <el-menu-item index="/user/list">
        <i class="el-icon-third-geren"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/role/list">
        <i class="el-icon-third-listview"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
      <el-menu-item index="/permission/list">
        <i class="el-icon-third-listzuhe"></i>
        <span slot="title">权限管理</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-third-dianping"></i>
          <span>代码管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/code/list">
            <i class="el-icon-third-fuzhi"></i>
            <span slot="title">代码列表</span>
          </el-menu-item>
          <el-menu-item index="/code/categories">
            <i class="el-icon-third-shengqian"></i>
            <span slot="title">代码分类</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-third-zhinengyouhua"></i>
          <span>音乐管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/music/list">
            <i class="el-icon-third-fuzhi"></i>
            <span slot="title">音乐列表</span>
          </el-menu-item>
          <el-menu-item index="/music/categories">
            <i class="el-icon-third-shengqian"></i>
            <span slot="title">音乐分类</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-third-xiangji"></i>
          <span>电影管理</span>
        </template>
        <el-menu-item-group>
           <el-menu-item index="/film/list">
            <i class="el-icon-third-fuzhi"></i>
            <span slot="title">电影列表</span>
          </el-menu-item>
          <el-menu-item index="/film/categories">
            <i class="el-icon-third-shengqian"></i>
            <span slot="title">电影分类</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-third-youji"></i>
          <span>书籍管理</span>
        </template>
        <el-menu-item-group>
           <el-menu-item index="/book/list">
            <i class="el-icon-third-fuzhi"></i>
            <span slot="title">书籍列表</span>
          </el-menu-item>
          <el-menu-item index="/book/categories">
            <i class="el-icon-third-shengqian"></i>
            <span slot="title">书籍分类</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-third-pinglun"></i>
          <span>评论管理</span>
        </template>
        <el-menu-item-group>
           <el-menu-item index="/code/comment">
            <i class="el-icon-third-bianji"></i>
            <span slot="title">代码评论</span>
          </el-menu-item>
          <el-menu-item index="/music/comment">
            <i class="el-icon-third-bianji"></i>
            <span slot="title">音乐评论</span>
          </el-menu-item>
          <el-menu-item index="/film/comment">
            <i class="el-icon-third-bianji"></i>
            <span slot="title">电影评论</span>
          </el-menu-item>
          <el-menu-item index="/book/comment">
            <i class="el-icon-third-bianji"></i>
            <span slot="title">书籍评论</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/settings">
        <i class="el-icon-third-shezhi"></i>
        <span slot="title">系统设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../static/css/config.styl'
.app-asider
  background-color white
  text-align center
  height 100%
  ul
    border 0
</style>
