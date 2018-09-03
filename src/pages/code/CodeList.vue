<template>
  <div class="code-list">
    <!-- 顶部导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/code/list' }">代码管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 代码列表 -->
    <el-table
      :v-loading="codeListLoading"
      :data="codeList"
      stripe
      style="width: 100%; text-align: center;">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="audited"
        label="审核状态"
        width="80">
        <template slot-scope="scope">
          <el-tag
            style="cursor: pointer;"
            @click.native="handleToAudit(scope.row.code_id, scope.row.audited, scope.row.activated)"
            :type="scope.row.audited === 1 ? 'success' : 'info'"
            disable-transitions>{{scope.row.audited ? '已审核' : '审核中'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="activated"
        label="发布状态"
        width="80">
        <template slot-scope="scope">
          <el-tag
            style="cursor: pointer;"
            @click.native="handleToActivate(scope.row.code_id, scope.row.audited, scope.row.activated)"
            :type="scope.row.activated === 1 ? 'success' : 'info'"
            disable-transitions>{{scope.row.activated ? '已发布' : '未发布'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_time"
        label="创建时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="audited_time"
        label="审核时间"
        width="100">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="130">
        <template slot-scope="scope">
          <el-button @click="handleToDetail(scope.row.code_id)" type="text" size="small">查看</el-button>
          <!-- <el-button @click="handleToUpdate(scope.row.code_id)" type="text" size="small">编辑</el-button> -->
          <el-button @click="handleDelete(scope.row.code_id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增代码按钮 -->
    <div class="code-add-btn">
      <el-button type="primary" @click="handleToAddCode()" plain>新增代码</el-button>
    </div>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="limit"
      :total="codeTotal">
    </el-pagination>
    <!-- 新增代码 -->
    <code-add @handleReload="reloadList" ref="callAdd"></code-add>
    <!-- 代码详情 -->
    <code-detail ref="callDetail"></code-detail>
    <!-- 代码更新 -->
    <!-- <code-update @handleReload="reloadList" ref="callUpdate"></code-update> -->
  </div>
</template>

<script>
import CodeAdd from '@/components/code/CodeAdd'
import CodeDetail from '@/components/code/CodeDetail'
// import CodeUpdate from '@/components/code/CodeUpdate'
import * as config from '@/store/config'
export default {
  inject: ['reload'],
  metaInfo: {
    title: '代码管理',
    titleTemplate: '%s - 管理后台',
    meta: [
      {name: 'keywords', content: 'Sujor管理后台'},
      {name: 'description', content: 'Sujor管理后台'}
    ]
  },
  components: {
    CodeAdd,
    CodeDetail
    // CodeUpdate
  },
  data () {
    return {
      API_ROOT: config.API_ROOT
    }
  },
  computed: {
    codeList () {
      return this.$store.getters.codeList
    },
    codeTotal () {
      return this.$store.getters.codeTotal
    },
    codeListLoading () {
      return this.$store.getters.codeListLoading
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
    '$route': 'getCodeList'
  },
  methods: {
    // 打开添加代码
    handleToAddCode () {
      // 打开详情modal
      this.$store.commit('setCodeAddVisible', true)
      // 调起子组件方法
      this.$refs.callAdd.getCodeCategoryList()
    },
    // 获取角色列表
    async getCodeList () {
      await this.$store.dispatch('getCodeList', {'this': this, 'page': this.currentPage, 'limit': this.limit})
    },
    // 刷新页面
    reloadList () {
      this.reload()
    },
    // 改变审核
    handleToAudit (codeId, audited, activated) {
      this.$confirm(`确认改变审核状态吗？`)
        .then(_ => {
          this.updateCode(codeId, !audited, activated)
        })
        .catch(_ => {
          console.log('handle canceled～ ')
        })
    },
    // 改变发布
    handleToActivate (codeId, audited, activated) {
      this.$confirm(`确认改变发布状态吗？`)
        .then(_ => {
          this.updateCode(codeId, audited, !activated)
        })
        .catch(_ => {
          console.log('handle canceled～ ')
        })
    },
    // 前往查看详情
    handleToDetail (codeId) {
      // 打开详情modal
      this.$store.commit('setCodeDetailVisible', true)
      // 调起子组件方法
      this.$refs.callDetail.getCode(codeId)
    },
    // 前往编辑详情
    // handleToUpdate (codeId) {
    //   // 打开编辑modal
    //   this.$store.commit('setCodeUpdateVisible', true)
    //   // 调起子组件方法
    //   this.$refs.callUpdate.getCode(codeId)
    // },
    // 删除按钮事件
    handleDelete (codeId) {
      this.$confirm(`确认删除该图片吗？`)
        .then(_ => {
          // 删除并刷新列表
          this.deleteCode(codeId)
        })
        .catch(_ => {
          console.log('delete canceled～ ')
        })
    },
    async updateCode (codeId, audited, activated) {
      await this.$store.dispatch('updateCode', {'this': this, 'code': {'code_id': codeId, 'audited': audited, 'activated': activated}})
      this.reloadList()
    },
    async deleteCode (codeId) {
      await this.$store.dispatch('deleteCode', {'this': this, 'code_id': codeId})
      this.reloadList()
    },
    async handleCurrentChange (val) {
      await this.$store.dispatch('getCodeList', {'this': this, 'page': val, 'limit': this.limit})
      this.$router.push({path: '/code/list', query: {page: val}})
      document.documentElement.scrollTop = 0
    }
  },
  created () {
    // 初始化数据
    this.getCodeList()
  }
}
</script>

<style lang="stylus" scoped>
.code-list
  margin 20px
  .code-add-btn
    margin 20px 0
    text-align left
</style>
