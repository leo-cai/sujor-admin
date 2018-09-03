<template>
  <el-dialog
    title="书籍详情"
    :visible.sync="bookDetailVisible"
    width="680px">
    <el-form label-position="left" label-width="70px" :model="book">
      <el-form-item label="标题">
        <el-input v-model="book.title" disabled></el-input>
      </el-form-item>
      <el-form-item label="豆瓣链接">
        <el-input v-model="book.book_url" disabled></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-input v-model="book.cover" disabled></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-tag v-if="book.categories.length === 0">暂无分类</el-tag>
        <el-tag v-else v-for="(category, index) in book.categories" :key="index" v-text="category.category_name" style="margin: 0 5px;" type="success"></el-tag>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="book.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="访问量">
        <el-input v-model="book.clicks" disabled></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20 }"
          v-model="book.summary" disabled></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input
          type="textarea"
          :autosize="{ minRows: 20, maxRows: 30 }"
          v-model="book.content" disabled></el-input>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-radio v-model="book.audited" :label=0 disabled>审核中</el-radio>
        <el-radio v-model="book.audited" :label=1 disabled>已通过</el-radio>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-radio v-model="book.activated" :label=0 disabled>未发布</el-radio>
        <el-radio v-model="book.activated" :label=1 disabled>已发布</el-radio>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="book.created_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input v-model="book.updated_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="审核时间">
        <el-input v-model="book.audited_time" disabled></el-input>
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
    bookDetailVisible: {
      // getter
      get: function () {
        return this.$store.getters.bookDetailVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setBookDetailVisible', newValue)
      }
    },
    book () {
      return this.$store.getters.book
    }
  },
  methods: {
    // 关闭模态框
    handleConfirm () {
      this.$store.commit('setBookDetailVisible', false)
    },
    // 获取分类详情
    async getBook (bookId) {
      await this.$store.dispatch('getBook', {'this': this, 'book_id': bookId})
    }
  }
}
</script>
