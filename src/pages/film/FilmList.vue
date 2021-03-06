<template>
  <div class="film-list">
    <!-- 顶部导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/film/list' }">电影管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 电影列表 -->
    <el-table
      :v-loading="filmListLoading"
      :data="filmList"
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
            @click.native="handleToAudit(scope.row.film_id, scope.row.audited, scope.row.activated)"
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
            @click.native="handleToActivate(scope.row.film_id, scope.row.audited, scope.row.activated)"
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
          <el-button @click="handleToDetail(scope.row.film_id)" type="text" size="small">查看</el-button>
          <!-- <el-button @click="handleToUpdate(scope.row.film_id)" type="text" size="small">编辑</el-button> -->
          <el-button @click="handleDelete(scope.row.film_id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增电影按钮 -->
    <div class="film-add-btn">
      <el-button type="primary" @click="handleToAddFilm()" plain>新增电影</el-button>
    </div>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="limit"
      :total="filmTotal">
    </el-pagination>
    <!-- 新增电影 -->
    <film-add @handleReload="reloadList" ref="callAdd"></film-add>
    <!-- 电影详情 -->
    <film-detail ref="callDetail"></film-detail>
    <!-- 电影更新 -->
    <!-- <film-update @handleReload="reloadList" ref="callUpdate"></film-update> -->
  </div>
</template>

<script>
import FilmAdd from '@/components/film/FilmAdd'
import FilmDetail from '@/components/film/FilmDetail'
// import FilmUpdate from '@/components/film/FilmUpdate'
import * as config from '@/store/config'
export default {
  inject: ['reload'],
  metaInfo: {
    title: '电影管理',
    titleTemplate: '%s - 管理后台',
    meta: [
      {name: 'keywords', content: 'Sujor管理后台'},
      {name: 'description', content: 'Sujor管理后台'}
    ]
  },
  components: {
    FilmAdd,
    FilmDetail
    // FilmUpdate
  },
  data () {
    return {
      API_ROOT: config.API_ROOT
    }
  },
  computed: {
    filmList () {
      return this.$store.getters.filmList
    },
    filmTotal () {
      return this.$store.getters.filmTotal
    },
    filmListLoading () {
      return this.$store.getters.filmListLoading
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
    '$route': 'getFilmList'
  },
  methods: {
    // 打开添加电影
    handleToAddFilm () {
      // 打开详情modal
      this.$store.commit('setFilmAddVisible', true)
      // 调起子组件方法
      this.$refs.callAdd.getFilmCategoryList()
    },
    // 获取角色列表
    async getFilmList () {
      await this.$store.dispatch('getFilmList', {'this': this, 'page': this.currentPage, 'limit': this.limit})
    },
    // 刷新页面
    reloadList () {
      this.reload()
    },
    // 改变审核
    handleToAudit (filmId, audited, activated) {
      this.$confirm(`确认改变审核状态吗？`)
        .then(_ => {
          this.updateFilm(filmId, !audited, activated)
        })
        .catch(_ => {
          console.log('handle canceled～ ')
        })
    },
    // 改变发布
    handleToActivate (filmId, audited, activated) {
      this.$confirm(`确认改变发布状态吗？`)
        .then(_ => {
          this.updateFilm(filmId, audited, !activated)
        })
        .catch(_ => {
          console.log('handle canceled～ ')
        })
    },
    // 前往查看详情
    handleToDetail (filmId) {
      // 打开详情modal
      this.$store.commit('setFilmDetailVisible', true)
      // 调起子组件方法
      this.$refs.callDetail.getFilm(filmId)
    },
    // 前往编辑详情
    // handleToUpdate (filmId) {
    //   // 打开编辑modal
    //   this.$store.commit('setFilmUpdateVisible', true)
    //   // 调起子组件方法
    //   this.$refs.callUpdate.getFilm(filmId)
    // },
    // 删除按钮事件
    handleDelete (filmId) {
      this.$confirm(`确认删除该图片吗？`)
        .then(_ => {
          // 删除并刷新列表
          this.deleteFilm(filmId)
        })
        .catch(_ => {
          console.log('delete canceled～ ')
        })
    },
    async updateFilm (filmId, audited, activated) {
      await this.$store.dispatch('updateFilm', {'this': this, 'film': {'film_id': filmId, 'audited': audited, 'activated': activated}})
      this.reloadList()
    },
    async deleteFilm (filmId) {
      await this.$store.dispatch('deleteFilm', {'this': this, 'film_id': filmId})
      this.reloadList()
    },
    async handleCurrentChange (val) {
      await this.$store.dispatch('getFilmList', {'this': this, 'page': val, 'limit': this.limit})
      this.$router.push({path: '/film/list', query: {page: val}})
      document.documentElement.scrollTop = 0
    }
  },
  created () {
    // 初始化数据
    this.getFilmList()
  }
}
</script>

<style lang="stylus" scoped>
.film-list
  margin 20px
  .film-add-btn
    margin 20px 0
    text-align left
</style>
