<template>
  <el-dialog
    title="分类详情"
    :visible.sync="bookCategoryDetailVisible"
    width="480px">
    <el-form label-position="left" label-width="70px" :model="bookCategory">
      <el-form-item label="分类">
        <el-input v-model="bookCategory.category_name" disabled></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="bookCategory.created_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input v-model="bookCategory.updated_time" disabled></el-input>
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
    bookCategoryDetailVisible: {
      // getter
      get: function () {
        return this.$store.getters.bookCategoryDetailVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setBookCategoryDetailVisible', newValue)
      }
    },
    bookCategory () {
      return this.$store.getters.bookCategory
    }
  },
  methods: {
    // 关闭模态框
    handleConfirm () {
      this.$store.commit('setBookCategoryDetailVisible', false)
    },
    // 获取分类详情
    async getBookCategory (categoryId) {
      await this.$store.dispatch('getBookCategory', {'this': this, 'category_id': categoryId})
    }
  }
}
</script>
