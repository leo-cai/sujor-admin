<template>
  <el-dialog
    title="分类详情"
    :visible.sync="codeCategoryDetailVisible"
    width="480px">
    <el-form label-position="left" label-width="70px" :model="codeCategory">
      <el-form-item label="分类">
        <el-input v-model="codeCategory.category_name" disabled></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="codeCategory.created_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input v-model="codeCategory.updated_time" disabled></el-input>
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
    codeCategoryDetailVisible: {
      // getter
      get: function () {
        return this.$store.getters.codeCategoryDetailVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setCodeCategoryDetailVisible', newValue)
      }
    },
    codeCategory () {
      return this.$store.getters.codeCategory
    }
  },
  methods: {
    // 关闭模态框
    handleConfirm () {
      this.$store.commit('setCodeCategoryDetailVisible', false)
    },
    // 获取分类详情
    async getCodeCategory (categoryId) {
      await this.$store.dispatch('getCodeCategory', {'this': this, 'category_id': categoryId})
    }
  }
}
</script>
