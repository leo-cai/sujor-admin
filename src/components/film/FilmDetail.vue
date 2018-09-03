<template>
  <el-dialog
    title="电影详情"
    :visible.sync="filmDetailVisible"
    width="680px">
    <el-form label-position="left" label-width="70px" :model="film">
      <el-form-item label="标题">
        <el-input v-model="film.title" disabled></el-input>
      </el-form-item>
      <el-form-item label="豆瓣链接">
        <el-input v-model="film.film_url" disabled></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-tag v-if="film.categories.length === 0">暂无分类</el-tag>
        <el-tag v-else v-for="(category, index) in film.categories" :key="index" v-text="category.category_name" style="margin: 0 5px;" type="success"></el-tag>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="film.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="访问量">
        <el-input v-model="film.clicks" disabled></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20 }"
          v-model="film.summary" disabled></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input
          type="textarea"
          :autosize="{ minRows: 20, maxRows: 30 }"
          v-model="film.content" disabled></el-input>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-radio v-model="film.audited" :label=0 disabled>审核中</el-radio>
        <el-radio v-model="film.audited" :label=1 disabled>已通过</el-radio>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-radio v-model="film.activated" :label=0 disabled>未发布</el-radio>
        <el-radio v-model="film.activated" :label=1 disabled>已发布</el-radio>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="film.created_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input v-model="film.updated_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="审核时间">
        <el-input v-model="film.audited_time" disabled></el-input>
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
    filmDetailVisible: {
      // getter
      get: function () {
        return this.$store.getters.filmDetailVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setFilmDetailVisible', newValue)
      }
    },
    film () {
      return this.$store.getters.film
    }
  },
  methods: {
    // 关闭模态框
    handleConfirm () {
      this.$store.commit('setFilmDetailVisible', false)
    },
    // 获取分类详情
    async getFilm (filmId) {
      await this.$store.dispatch('getFilm', {'this': this, 'film_id': filmId})
    }
  }
}
</script>
