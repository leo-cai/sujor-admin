<template>
  <el-dialog
    title="音乐详情"
    :visible.sync="musicDetailVisible"
    width="680px">
    <el-form label-position="left" label-width="70px" :model="music">
      <el-form-item label="标题">
        <el-input v-model="music.title" width="570px" disabled></el-input>
      </el-form-item>
      <el-form-item label="豆瓣链接">
        <el-input v-model="music.music_url" width="570px" disabled></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-tag v-if="music.categories.length === 0">暂无分类</el-tag>
        <el-tag v-else v-for="(category, index) in music.categories" :key="index" v-text="category.category_name" style="margin: 0 5px;" type="success"></el-tag>
      </el-form-item>
      <el-form-item label="歌词">
        <el-input
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20 }"
          v-model="music.lyric" width="570px" disabled></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="music.username" width="570px" disabled></el-input>
      </el-form-item>
       <el-form-item label="访问量">
        <el-input v-model="music.clicks" disabled></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20 }"
          v-model="music.summary" disabled></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input
          type="textarea"
          :autosize="{ minRows: 20, maxRows: 30 }"
          v-model="music.content" disabled></el-input>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-radio v-model="music.audited" :label=0 disabled>审核中</el-radio>
        <el-radio v-model="music.audited" :label=1 disabled>已通过</el-radio>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-radio v-model="music.activated" :label=0 disabled>未发布</el-radio>
        <el-radio v-model="music.activated" :label=1 disabled>已发布</el-radio>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="music.created_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input v-model="music.updated_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="审核时间">
        <el-input v-model="music.audited_time" disabled></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleConfirm()">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  computed: {
    musicDetailVisible: {
      // getter
      get: function () {
        return this.$store.getters.musicDetailVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setMusicDetailVisible', newValue)
      }
    },
    music () {
      return this.$store.getters.music
    }
  },
  methods: {
    // 关闭模态框
    handleConfirm () {
      this.$store.commit('setMusicDetailVisible', false)
    },
    // 获取分类详情
    async getMusic (musicId) {
      await this.$store.dispatch('getMusic', {'this': this, 'music_id': musicId})
    }
  }
}
</script>
