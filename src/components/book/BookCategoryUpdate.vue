<template>
  <el-dialog
    title="分类编辑"
    :visible.sync="bookCategoryUpdateVisible"
    width="480px"
    :before-close="handleClose">
    <el-form label-position="left" label-width="70px" :model="bookCategory">
      <el-form-item label="分类">
        <el-input :value="bookCategory.category_name"
          @input="mutateBookCategory({ category_name: $event.trim(), category_id: bookCategory.category_id})"
          @keyup.enter.native="handleConfirm()"
          ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel()">取 消</el-button>
      <el-button type="primary" @click="handleConfirm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      categoryName: ''
    }
  },
  computed: {
    bookCategoryUpdateVisible: {
      // getter
      get: function () {
        return this.$store.getters.bookCategoryUpdateVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setBookCategoryUpdateVisible', newValue)
      }
    },
    bookCategory () {
      return this.$store.getters.bookCategory
    }
  },
  methods: {
    // 关闭
    handleClose (done) {
      this.$confirm('确认不保存，直接关闭吗？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 取消
    handleCancel () {
      this.$store.commit('setBookCategoryUpdateVisible', false)
    },
    // 确定
    async handleConfirm () {
      // 分类不能为空
      if (this.bookCategory.category_name.trim() === '') {
        this.$message({
          message: '请输入分类名！',
          type: 'warning'
        })
        return
      }
      // 分类未更改
      if (this.bookCategory.category_name.trim() === this.categoryName) {
        this.$message({
          message: '分类未更改',
          type: 'warning'
        })
        return
      }
      // 提交添加分类 并 关闭模态框
      await this.$store.dispatch('updateBookCategory', {this: this, category: this.bookCategory})
    },
    // 获取
    async getBookCategory (categoryId) {
      await this.$store.dispatch('getBookCategory', {'this': this, 'category_id': categoryId})
      this.categoryName = this.bookCategory.category_name
    },
    // 提交vuex更改bookCategory
    mutateBookCategory (bookCategory) {
      this.$store.commit('setBookCategory', bookCategory)
    }
  }
}
</script>
