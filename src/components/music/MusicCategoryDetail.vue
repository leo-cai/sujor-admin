<template>
  <el-dialog
    title="分类详情"
    :visible.sync="musicCategoryDetailVisible"
    width="480px">
    <el-form label-position="left" label-width="70px" :model="musicCategory">
      <el-form-item label="分类">
        <el-input v-model="musicCategory.category_name" disabled></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="musicCategory.created_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input v-model="musicCategory.updated_time" disabled></el-input>
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
    musicCategoryDetailVisible: {
      // getter
      get: function () {
        return this.$store.getters.musicCategoryDetailVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setMusicCategoryDetailVisible', newValue)
      }
    },
    musicCategory () {
      return this.$store.getters.musicCategory
    }
  },
  methods: {
    // 关闭模态框
    handleConfirm () {
      this.$store.commit('setMusicCategoryDetailVisible', false)
    },
    // 获取分类详情
    async getMusicCategory (categoryId) {
      await this.$store.dispatch('getMusicCategory', {'this': this, 'category_id': categoryId})
    }
  }
}
</script>
