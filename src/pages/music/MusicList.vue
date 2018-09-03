<template>
  <div class="music-list">
    <!-- 顶部导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/music/list' }">音乐管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 音乐列表 -->
    <el-table
      :v-loading="musicListLoading"
      :data="musicList"
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
            @click.native="handleToAudit(scope.row.music_id, scope.row.audited, scope.row.activated)"
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
            @click.native="handleToActivate(scope.row.music_id, scope.row.audited, scope.row.activated)"
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
          <el-button @click="handleToDetail(scope.row.music_id)" type="text" size="small">查看</el-button>
          <!-- <el-button @click="handleToUpdate(scope.row.music_id)" type="text" size="small">编辑</el-button> -->
          <el-button @click="handleDelete(scope.row.music_id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增音乐按钮 -->
    <div class="music-add-btn">
      <el-button type="primary" @click="handleToAddMusic()" plain>新增音乐</el-button>
    </div>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="limit"
      :total="musicTotal">
    </el-pagination>
    <!-- 新增音乐 -->
    <music-add @handleReload="reloadList" ref="callAdd"></music-add>
    <!-- 音乐详情 -->
    <music-detail ref="callDetail"></music-detail>
    <!-- 音乐更新 -->
    <!-- <music-update @handleReload="reloadList" ref="callUpdate"></music-update> -->
  </div>
</template>

<script>
import MusicAdd from '@/components/music/MusicAdd'
import MusicDetail from '@/components/music/MusicDetail'
// import MusicUpdate from '@/components/music/MusicUpdate'
import * as config from '@/store/config'
export default {
  inject: ['reload'],
  metaInfo: {
    title: '音乐管理',
    titleTemplate: '%s - 管理后台',
    meta: [
      {name: 'keywords', content: 'Sujor管理后台'},
      {name: 'description', content: 'Sujor管理后台'}
    ]
  },
  components: {
    MusicAdd,
    MusicDetail
    // MusicUpdate
  },
  data () {
    return {
      API_ROOT: config.API_ROOT
    }
  },
  computed: {
    musicList () {
      return this.$store.getters.musicList
    },
    musicTotal () {
      return this.$store.getters.musicTotal
    },
    musicListLoading () {
      return this.$store.getters.musicListLoading
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
    '$route': 'getMusicList'
  },
  methods: {
    // 打开添加音乐
    handleToAddMusic () {
      // 打开详情modal
      this.$store.commit('setMusicAddVisible', true)
      // 调起子组件方法
      this.$refs.callAdd.getMusicCategoryList()
    },
    // 获取角色列表
    async getMusicList () {
      await this.$store.dispatch('getMusicList', {'this': this, 'page': this.currentPage, 'limit': this.limit})
    },
    // 刷新页面
    reloadList () {
      this.reload()
    },
    // 改变审核
    handleToAudit (musicId, audited, activated) {
      this.$confirm(`确认改变审核状态吗？`)
        .then(_ => {
          this.updateMusic(musicId, !audited, activated)
        })
        .catch(_ => {
          console.log('handle canceled～ ')
        })
    },
    // 改变发布
    handleToActivate (musicId, audited, activated) {
      this.$confirm(`确认改变发布状态吗？`)
        .then(_ => {
          this.updateMusic(musicId, audited, !activated)
        })
        .catch(_ => {
          console.log('handle canceled～ ')
        })
    },
    // 前往查看详情
    handleToDetail (musicId) {
      // 打开详情modal
      this.$store.commit('setMusicDetailVisible', true)
      // 调起子组件方法
      this.$refs.callDetail.getMusic(musicId)
    },
    // 前往编辑详情
    // handleToUpdate (musicId) {
    //   // 打开编辑modal
    //   this.$store.commit('setMusicUpdateVisible', true)
    //   // 调起子组件方法
    //   this.$refs.callUpdate.getMusic(musicId)
    // },
    // 删除按钮事件
    handleDelete (musicId) {
      this.$confirm(`确认删除该图片吗？`)
        .then(_ => {
          // 删除并刷新列表
          this.deleteMusic(musicId)
        })
        .catch(_ => {
          console.log('delete canceled～ ')
        })
    },
    async updateMusic (musicId, audited, activated) {
      await this.$store.dispatch('updateMusic', {'this': this, 'music': {'music_id': musicId, 'audited': audited, 'activated': activated}})
      this.reloadList()
    },
    async deleteMusic (musicId) {
      await this.$store.dispatch('deleteMusic', {'this': this, 'music_id': musicId})
      this.reloadList()
    },
    async handleCurrentChange (val) {
      await this.$store.dispatch('getMusicList', {'this': this, 'page': val, 'limit': this.limit})
      this.$router.push({path: '/music/list', query: {page: val}})
      document.documentElement.scrollTop = 0
    }
  },
  created () {
    // 初始化数据
    this.getMusicList()
  }
}
</script>

<style lang="stylus" scoped>
.music-list
  margin 20px
  .music-add-btn
    margin 20px 0
    text-align left
</style>
