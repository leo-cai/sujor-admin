<template>
  <div class="book-list">
    <!-- 顶部导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/book/list' }">书籍管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 书籍列表 -->
    <el-table
      :v-loading="bookListLoading"
      :data="bookList"
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
            @click.native="handleToAudit(scope.row.book_id, scope.row.audited, scope.row.activated)"
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
            @click.native="handleToActivate(scope.row.book_id, scope.row.audited, scope.row.activated)"
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
          <el-button @click="handleToDetail(scope.row.book_id)" type="text" size="small">查看</el-button>
          <!-- <el-button @click="handleToUpdate(scope.row.book_id)" type="text" size="small">编辑</el-button> -->
          <el-button @click="handleDelete(scope.row.book_id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增书籍按钮 -->
    <div class="book-add-btn">
      <el-button type="primary" @click="handleToAddBook()" plain>新增书籍</el-button>
    </div>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="limit"
      :total="bookTotal">
    </el-pagination>
    <!-- 新增书籍 -->
    <book-add @handleReload="reloadList" ref="callAdd"></book-add>
    <!-- 书籍详情 -->
    <book-detail ref="callDetail"></book-detail>
    <!-- 书籍更新 -->
    <!-- <book-update @handleReload="reloadList" ref="callUpdate"></book-update> -->
  </div>
</template>

<script>
import BookAdd from '@/components/book/BookAdd'
import BookDetail from '@/components/book/BookDetail'
// import BookUpdate from '@/components/book/BookUpdate'
import * as config from '@/store/config'
export default {
  inject: ['reload'],
  metaInfo: {
    title: '书籍管理',
    titleTemplate: '%s - 管理后台',
    meta: [
      {name: 'keywords', content: 'Sujor管理后台'},
      {name: 'description', content: 'Sujor管理后台'}
    ]
  },
  components: {
    BookAdd,
    BookDetail
    // BookUpdate
  },
  data () {
    return {
      API_ROOT: config.API_ROOT
    }
  },
  computed: {
    bookList () {
      return this.$store.getters.bookList
    },
    bookTotal () {
      return this.$store.getters.bookTotal
    },
    bookListLoading () {
      return this.$store.getters.bookListLoading
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
    '$route': 'getBookList'
  },
  methods: {
    // 打开添加书籍
    handleToAddBook () {
      // 打开详情modal
      this.$store.commit('setBookAddVisible', true)
      // 调起子组件方法
      this.$refs.callAdd.getBookCategoryList()
    },
    // 获取角色列表
    async getBookList () {
      await this.$store.dispatch('getBookList', {'this': this, 'page': this.currentPage, 'limit': this.limit})
    },
    // 刷新页面
    reloadList () {
      this.reload()
    },
    // 改变审核
    handleToAudit (bookId, audited, activated) {
      this.$confirm(`确认改变审核状态吗？`)
        .then(_ => {
          this.updateBook(bookId, !audited, activated)
        })
        .catch(_ => {
          console.log('handle canceled～ ')
        })
    },
    // 改变发布
    handleToActivate (bookId, audited, activated) {
      this.$confirm(`确认改变发布状态吗？`)
        .then(_ => {
          this.updateBook(bookId, audited, !activated)
        })
        .catch(_ => {
          console.log('handle canceled～ ')
        })
    },
    // 前往查看详情
    handleToDetail (bookId) {
      // 打开详情modal
      this.$store.commit('setBookDetailVisible', true)
      // 调起子组件方法
      this.$refs.callDetail.getBook(bookId)
    },
    // 前往编辑详情
    // handleToUpdate (bookId) {
    //   // 打开编辑modal
    //   this.$store.commit('setBookUpdateVisible', true)
    //   // 调起子组件方法
    //   this.$refs.callUpdate.getBook(bookId)
    // },
    // 删除按钮事件
    handleDelete (bookId) {
      this.$confirm(`确认删除该图片吗？`)
        .then(_ => {
          // 删除并刷新列表
          this.deleteBook(bookId)
        })
        .catch(_ => {
          console.log('delete canceled～ ')
        })
    },
    async updateBook (bookId, audited, activated) {
      await this.$store.dispatch('updateBook', {'this': this, 'book': {'book_id': bookId, 'audited': audited, 'activated': activated}})
      this.reloadList()
    },
    async deleteBook (bookId) {
      await this.$store.dispatch('deleteBook', {'this': this, 'book_id': bookId})
      this.reloadList()
    },
    async handleCurrentChange (val) {
      await this.$store.dispatch('getBookList', {'this': this, 'page': val, 'limit': this.limit})
      this.$router.push({path: '/book/list', query: {page: val}})
      document.documentElement.scrollTop = 0
    }
  },
  created () {
    // 初始化数据
    this.getBookList()
  }
}
</script>

<style lang="stylus" scoped>
.book-list
  margin 20px
  .book-add-btn
    margin 20px 0
    text-align left
</style>
