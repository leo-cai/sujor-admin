<template>
  <div class="category-list">
    <!-- 顶部导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/book/categories' }">书籍分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 分类列表 -->
    <el-table
      :v-loading="bookCategoryListLoading"
      :data="bookCategoryList"
      stripe
      style="width: 100%; text-align: center;">
      <el-table-column
        type="index"
      >
      </el-table-column>
      <el-table-column
        prop="category_name"
        label="分类名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="created_time"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updated_time"
        label="修改时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="130">
        <template slot-scope="scope">
          <el-button @click="handleToDetail(scope.row.category_id)" type="text" size="small">查看</el-button>
          <el-button @click="handleToUpdate(scope.row.category_id)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row.category_name, scope.row.category_id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增分类按钮 -->
    <div class="category-add-btn">
      <el-button type="primary" @click="handleToAddCategory()" plain>新增分类</el-button>
    </div>
     <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="limit"
      :total="bookCategoryTotal">
    </el-pagination>
    <!-- 新增分类 -->
    <book-category-add @handleReload="reloadList"></book-category-add>
    <!-- 分类详情 -->
    <book-category-detail ref="callDetail"></book-category-detail>
    <!-- 分类更新 -->
    <book-category-update @handleReload="reloadList" ref="callUpdate"></book-category-update>
  </div>
</template>

<script>
import BookCategoryAdd from '@/components/book/BookCategoryAdd'
import BookCategoryDetail from '@/components/book/BookCategoryDetail'
import BookCategoryUpdate from '@/components/book/BookCategoryUpdate'
export default {
  inject: ['reload'],
  metaInfo: {
    title: '书籍分类管理',
    titleTemplate: '%s - 管理后台',
    meta: [
      {name: 'keywords', content: 'Sujor管理后台'},
      {name: 'description', content: 'Sujor管理后台'}
    ]
  },
  components: {
    BookCategoryAdd,
    BookCategoryDetail,
    BookCategoryUpdate
  },
  computed: {
    bookCategoryList () {
      return this.$store.getters.bookCategoryList
    },
    bookCategoryTotal () {
      return this.$store.getters.bookCategoryTotal
    },
    bookCategoryListLoading () {
      return this.$store.getters.bookCategoryListLoading
    },
    limit () {
      let limit = this.$route.query.limit || 20
      return parseInt(limit)
    },
    currentPage () {
      let currentPage = this.$route.query.page || 1
      return parseInt(currentPage)
    }
  },
  watch: {
    '$route': 'getBookCategoryList'
  },
  methods: {
    // 打开添加分类
    handleToAddCategory () {
      this.$store.commit('setBookCategoryAddVisible', true)
    },
    // 获取分类列表
    getBookCategoryList () {
      this.$store.dispatch('getBookCategoryList', {'this': this, 'page': this.currentPage, 'limit': this.limit})
    },
    // 刷新页面
    reloadList () {
      this.reload()
    },
    // 前往查看详情
    handleToDetail (categoryId) {
      // 打开详情modal
      this.$store.commit('setBookCategoryDetailVisible', true)
      // 调起子组件方法
      this.$refs.callDetail.getBookCategory(categoryId)
    },
    // 前往编辑详情
    handleToUpdate (categoryId) {
      // 打开编辑modal
      this.$store.commit('setBookCategoryUpdateVisible', true)
      // 调起子组件方法
      this.$refs.callUpdate.getBookCategory(categoryId)
    },
    // 删除按钮事件
    handleDelete (categoryName, categoryId) {
      this.$confirm(`确认删除${categoryName}吗？`)
        .then(_ => {
          // 删除并刷新列表
          this.deleteBookCategory(categoryId)
        })
        .catch(_ => {
          console.log('delete canceled～ ')
        })
    },
    async deleteBookCategory (categoryId) {
      await this.$store.dispatch('deleteBookCategory', {'this': this, 'category_id': categoryId})
      this.reloadList()
    },
    async handleCurrentChange (val) {
      await this.$store.dispatch('getBookCategoryList', {'this': this, 'page': val, 'limit': this.limit})
      this.$router.push({path: '/book/categories', query: {page: val}})
      document.documentElement.scrollTop = 0
    }
  },
  created () {
    // 初始化数据
    this.getBookCategoryList()
  }
}
</script>

<style lang="stylus" scoped>
.category-list
  margin 20px
  .category-add-btn
    margin 20px 0
    text-align left
</style>
