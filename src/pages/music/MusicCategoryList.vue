<template>
  <div class="category-list">
    <!-- 顶部导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/music/categories' }">音乐分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 分类列表 -->
    <el-table
      :v-loading="musicCategoryListLoading"
      :data="musicCategoryList"
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
      :total="musicCategoryTotal">
    </el-pagination>
    <!-- 新增分类 -->
    <music-category-add @handleReload="reloadList"></music-category-add>
    <!-- 分类详情 -->
    <music-category-detail ref="callDetail"></music-category-detail>
    <!-- 分类更新 -->
    <music-category-update @handleReload="reloadList" ref="callUpdate"></music-category-update>
  </div>
</template>

<script>
import MusicCategoryAdd from '@/components/music/MusicCategoryAdd'
import MusicCategoryDetail from '@/components/music/MusicCategoryDetail'
import MusicCategoryUpdate from '@/components/music/MusicCategoryUpdate'
export default {
  inject: ['reload'],
  metaInfo: {
    title: '音乐分类管理',
    titleTemplate: '%s - 管理后台',
    meta: [
      {name: 'keywords', content: 'Sujor管理后台'},
      {name: 'description', content: 'Sujor管理后台'}
    ]
  },
  components: {
    MusicCategoryAdd,
    MusicCategoryDetail,
    MusicCategoryUpdate
  },
  computed: {
    musicCategoryList () {
      return this.$store.getters.musicCategoryList
    },
    musicCategoryTotal () {
      return this.$store.getters.musicCategoryTotal
    },
    musicCategoryListLoading () {
      return this.$store.getters.musicCategoryListLoading
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
    '$route': 'getMusicCategoryList'
  },
  methods: {
    // 打开添加分类
    handleToAddCategory () {
      this.$store.commit('setMusicCategoryAddVisible', true)
    },
    // 获取分类列表
    getMusicCategoryList () {
      this.$store.dispatch('getMusicCategoryList', {'this': this, 'page': this.currentPage, 'limit': this.limit})
    },
    // 刷新页面
    reloadList () {
      this.reload()
    },
    // 前往查看详情
    handleToDetail (categoryId) {
      // 打开详情modal
      this.$store.commit('setMusicCategoryDetailVisible', true)
      // 调起子组件方法
      this.$refs.callDetail.getMusicCategory(categoryId)
    },
    // 前往编辑详情
    handleToUpdate (categoryId) {
      // 打开编辑modal
      this.$store.commit('setMusicCategoryUpdateVisible', true)
      // 调起子组件方法
      this.$refs.callUpdate.getMusicCategory(categoryId)
    },
    // 删除按钮事件
    handleDelete (categoryName, categoryId) {
      this.$confirm(`确认删除${categoryName}吗？`)
        .then(_ => {
          // 删除并刷新列表
          this.deleteMusicCategory(categoryId)
        })
        .catch(_ => {
          console.log('delete canceled～ ')
        })
    },
    async deleteMusicCategory (categoryId) {
      await this.$store.dispatch('deleteMusicCategory', {'this': this, 'category_id': categoryId})
      this.reloadList()
    },
    async handleCurrentChange (val) {
      await this.$store.dispatch('getMusicCategoryList', {'this': this, 'page': val, 'limit': this.limit})
      this.$router.push({path: '/music/categories', query: {page: val}})
      document.documentElement.scrollTop = 0
    }
  },
  created () {
    // 初始化数据
    this.getMusicCategoryList()
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
