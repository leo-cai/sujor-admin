<template>
  <div class="role-list">
    <!-- 顶部导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role/list' }">角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 角色列表 -->
    <el-table
      :v-loading="roleListLoading"
      :data="roleList"
      stripe
      style="width: 100%; text-align: center;">
      <el-table-column
        type="index"
      >
      </el-table-column>
      <el-table-column
        prop="role_name"
        label="角色">
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
          <el-button @click="handleToDetail(scope.row.role_id)" type="text" size="small">查看</el-button>
          <el-button @click="handleToUpdate(scope.row.role_id)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row.role_id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增角色按钮 -->
    <div class="role-add-btn">
      <el-button type="primary" @click="handleToAddRole()" plain>新增角色</el-button>
    </div>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="limit"
      :total="roleTotal">
    </el-pagination>
    <!-- 新增角色 -->
    <role-add @handleReload="reloadList" ref="callAdd"></role-add>
    <!-- 角色详情 -->
    <role-detail ref="callDetail"></role-detail>
    <!-- 角色更新 -->
    <role-update @handleReload="reloadList" ref="callUpdate"></role-update>
  </div>
</template>

<script>
import RoleAdd from '@/components/role/RoleAdd'
import RoleDetail from '@/components/role/RoleDetail'
import RoleUpdate from '@/components/role/RoleUpdate'
import * as config from '@/store/config'
export default {
  inject: ['reload'],
  metaInfo: {
    title: '角色管理',
    titleTemplate: '%s - 管理后台',
    meta: [
      {name: 'keyroles', content: 'Sujor管理后台'},
      {name: 'description', content: 'Sujor管理后台'}
    ]
  },
  components: {
    RoleAdd,
    RoleDetail,
    RoleUpdate
  },
  data () {
    return {
      API_ROOT: config.API_ROOT
    }
  },
  computed: {
    roleList () {
      return this.$store.getters.roleList
    },
    roleTotal () {
      return this.$store.getters.roleTotal
    },
    roleListLoading () {
      return this.$store.getters.roleListLoading
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
    '$route': 'getRoleList'
  },
  methods: {
    // 打开添加角色
    handleToAddRole () {
      this.$store.commit('setRoleAddVisible', true)
    },
    // 获取角色列表
    async getRoleList () {
      await this.$store.dispatch('getRoleList', {'this': this, 'page': this.currentPage, 'limit': this.limit})
    },
    // 刷新页面
    reloadList () {
      this.reload()
    },
    // 前往查看详情
    handleToDetail (roleId) {
      // 打开详情modal
      this.$store.commit('setRoleDetailVisible', true)
      // 调起子组件方法
      this.$refs.callDetail.getRole(roleId)
    },
    // 前往编辑详情
    handleToUpdate (roleId) {
      // 打开编辑modal
      this.$store.commit('setRoleUpdateVisible', true)
      // 调起子组件方法
      this.$refs.callUpdate.getRole(roleId)
    },
    // 删除按钮事件
    handleDelete (roleId) {
      this.$confirm(`确认删除该图片吗？`)
        .then(_ => {
          // 删除并刷新列表
          this.deleteRole(roleId)
        })
        .catch(_ => {
          console.log('delete canceled～ ')
        })
    },
    async deleteRole (roleId) {
      await this.$store.dispatch('deleteRole', {'this': this, 'role_id': roleId})
      this.reloadList()
    },
    async handleCurrentChange (val) {
      await this.$store.dispatch('getRoleList', {'this': this, 'page': val, 'limit': this.limit})
      this.$router.push({path: '/role/list', query: {page: val}})
      document.documentElement.scrollTop = 0
    }
  },
  created () {
    // 初始化数据
    this.getRoleList()
  }
}
</script>

<style lang="stylus" scoped>
.role-list
  margin 20px
  .role-add-btn
    margin 20px 0
    text-align left
</style>
