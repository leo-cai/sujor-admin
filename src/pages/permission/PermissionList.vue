<template>
  <div class="permission-list">
    <!-- 顶部导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/permission/list' }">权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 权限列表 -->
    <el-table
      :v-loading="permissionListLoading"
      :data="permissionList"
      stripe
      style="width: 100%; text-align: center;">
      <el-table-column
        type="index"
      >
      </el-table-column>
      <el-table-column
        prop="permission_name"
        label="权限">
      </el-table-column>
      <el-table-column
        prop="created_time"
        label="创建时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="updated_time"
        label="修改时间"
        width="100">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="130">
        <template slot-scope="scope">
          <el-button @click="handleToDetail(scope.row.permission_id)" type="text" size="small">查看</el-button>
          <el-button @click="handleToUpdate(scope.row.permission_id)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row.permission_id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增权限按钮 -->
    <div class="permission-add-btn">
      <el-button type="primary" @click="handleToAddPermission()" plain>新增权限</el-button>
    </div>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="limit"
      :total="permissionTotal">
    </el-pagination>
    <!-- 新增权限 -->
    <permission-add @handleReload="reloadList" ref="callAdd"></permission-add>
    <!-- 权限详情 -->
    <permission-detail ref="callDetail"></permission-detail>
    <!-- 权限更新 -->
    <permission-update @handleReload="reloadList" ref="callUpdate"></permission-update>
  </div>
</template>

<script>
import PermissionAdd from '@/components/permission/PermissionAdd'
import PermissionDetail from '@/components/permission/PermissionDetail'
import PermissionUpdate from '@/components/permission/PermissionUpdate'
import * as config from '@/store/config'
export default {
  inject: ['reload'],
  metaInfo: {
    title: '权限管理',
    titleTemplate: '%s - 管理后台',
    meta: [
      {name: 'keypermissions', content: 'Sujor管理后台'},
      {name: 'description', content: 'Sujor管理后台'}
    ]
  },
  components: {
    PermissionAdd,
    PermissionDetail,
    PermissionUpdate
  },
  data () {
    return {
      API_ROOT: config.API_ROOT
    }
  },
  computed: {
    permissionList () {
      return this.$store.getters.permissionList
    },
    permissionTotal () {
      return this.$store.getters.permissionTotal
    },
    permissionListLoading () {
      return this.$store.getters.permissionListLoading
    },
    currentPage () {
      let currentPage = this.$route.query.page || 1
      return parseInt(currentPage)
    },
    limit () {
      let limit = this.$route.query.limit || 20
      return parseInt(limit)
    }
  },
  watch: {
    '$route': 'getPermissionList'
  },
  methods: {
    // 打开添加权限
    handleToAddPermission () {
      this.$store.commit('setPermissionAddVisible', true)
    },
    // 获取角色列表
    async getPermissionList () {
      await this.$store.dispatch('getPermissionList', {'this': this, 'page': this.currentPage, 'limit': this.limit})
    },
    // 刷新页面
    reloadList () {
      this.reload()
    },
    // 前往查看详情
    handleToDetail (permissionId) {
      // 打开详情modal
      this.$store.commit('setPermissionDetailVisible', true)
      // 调起子组件方法
      this.$refs.callDetail.getPermission(permissionId)
    },
    // 前往编辑详情
    handleToUpdate (permissionId) {
      // 打开编辑modal
      this.$store.commit('setPermissionUpdateVisible', true)
      // 调起子组件方法
      this.$refs.callUpdate.getPermission(permissionId)
    },
    // 删除按钮事件
    handleDelete (permissionId) {
      this.$confirm(`确认删除该图片吗？`)
        .then(_ => {
          // 删除并刷新列表
          this.deletePermission(permissionId)
        })
        .catch(_ => {
          console.log('delete canceled～ ')
        })
    },
    async deletePermission (permissionId) {
      await this.$store.dispatch('deletePermission', {'this': this, 'permission_id': permissionId})
      this.reloadList()
    },
    async handleCurrentChange (val) {
      await this.$store.dispatch('getPermissionList', {'this': this, 'page': val, 'limit': this.limit})
      this.$router.push({path: '/permission/list', query: {page: val}})
      document.documentElement.scrollTop = 0
    }
  },
  created () {
    // 初始化数据
    this.getPermissionList()
  }
}
</script>

<style lang="stylus" scoped>
.permission-list
  margin 20px
  .permission-add-btn
    margin 20px 0
    text-align left
</style>
