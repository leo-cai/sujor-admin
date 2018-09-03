<template>
  <div class="user-list">
    <!-- 顶部导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user/list' }">用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 用户列表 -->
    <el-table
      :v-loading="userListLoading"
      :data="userList"
      stripe
      style="width: 100%; text-align: center;">
      <el-table-column
        type="index"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        >
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
        prop="signed_time"
        label="登录时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="disabled"
        label="可用状态"
        width="80">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.disabled === 1 ? 'success' : 'info'"
            disable-transitions>{{scope.row.disabled ? '可用' : '禁用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="activated"
        label="激活状态"
        width="80">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.activated === 1 ? 'success' : 'info'"
            disable-transitions>{{scope.row.activated ? '已激活' : '未激活'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="130">
        <template slot-scope="scope">
          <el-button @click="handleToDetail(scope.row.user_id)" type="text" size="small">查看</el-button>
          <el-button @click="handleToUpdate(scope.row.user_id)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row.user_id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="limit"
      :total="userTotal">
    </el-pagination>
    <!-- 用户详情 -->
    <user-detail ref="callDetail"></user-detail>
    <!-- 用户更新 -->
    <user-update @handleReload="reloadList" ref="callUpdate"></user-update>
  </div>
</template>

<script>
import UserDetail from '@/components/user/UserDetail'
import UserUpdate from '@/components/user/UserUpdate'
export default {
  inject: ['reload'],
  metaInfo: {
    title: '用户管理',
    titleTemplate: '%s - Sujor管理后台',
    meta: [
      {name: 'keywords', content: 'Sujor管理后台'},
      {name: 'description', content: 'Sujor管理后台'}
    ]
  },
  components: {
    UserDetail,
    UserUpdate
  },
  computed: {
    userList () {
      return this.$store.getters.userList
    },
    userTotal () {
      return this.$store.getters.userTotal
    },
    userListLoading () {
      return this.$store.getters.userListLoading
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
    '$route': 'getUserList'
  },
  methods: {
    // 获取用户列表
    async getUserList () {
      await this.$store.dispatch('getUserList', {'this': this, 'page': this.currentPage, 'limit': this.limit})
    },
    // 刷新页面
    reloadList () {
      this.reload()
    },
    // 前往查看详情
    handleToDetail (userId) {
      // 打开详情modal
      this.$store.commit('setUserDetailVisible', true)
      // 调起子组件方法
      this.$refs.callDetail.getUser(userId)
    },
    // 前往编辑详情
    handleToUpdate (userId) {
      // 打开编辑modal
      this.$store.commit('setUserUpdateVisible', true)
      // 调起子组件方法
      this.$refs.callUpdate.getUser(userId)
      // this.$refs.callUpdate.getRoleList()
    },
    // 删除按钮事件
    handleDelete (userId) {
      this.$alert('用户不支持手动删除！', '提示', {
        confirmButtonText: '关闭',
        callback: _ => {}
      })
    },
    async handleCurrentChange (val) {
      await this.$store.dispatch('getUserList', {'this': this, 'page': val, 'limit': this.limit})
      this.$router.push({path: '/user/list', query: {page: val}})
      document.documentElement.scrollTop = 0
    }
  },
  created () {
    // 初始化数据
    this.getUserList()
  }
}
</script>

<style lang="stylus" scoped>
.user-list
  margin 20px
  .user-add-btn
    margin 20px 0
    text-align left
</style>
