<template>
  <el-dialog
    title="分类编辑"
    :visible.sync="musicCategoryUpdateVisible"
    width="480px"
    :before-close="handleClose">
    <el-form label-position="left" label-width="70px" :model="musicCategory">
      <el-form-item label="分类">
        <el-input :value="musicCategory.category_name"
          @input="mutateMusicCategory({ category_name: $event.trim(), category_id: musicCategory.category_id})"
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
    musicCategoryUpdateVisible: {
      // getter
      get: function () {
        return this.$store.getters.musicCategoryUpdateVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setMusicCategoryUpdateVisible', newValue)
      }
    },
    musicCategory () {
      return this.$store.getters.musicCategory
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
      this.$store.commit('setMusicCategoryUpdateVisible', false)
    },
    // 确定
    async handleConfirm () {
      // 分类不能为空
      if (this.musicCategory.category_name.trim() === '') {
        this.$message({
          message: '请输入分类名！',
          type: 'warning'
        })
        return
      }
      // 分类未更改
      if (this.musicCategory.category_name.trim() === this.categoryName) {
        this.$message({
          message: '分类未更改',
          type: 'warning'
        })
        return
      }
      // 提交添加分类 并 关闭模态框
      await this.$store.dispatch('updateMusicCategory', {this: this, category: this.musicCategory})
    },
    // 获取
    async getMusicCategory (categoryId) {
      await this.$store.dispatch('getMusicCategory', {'this': this, 'category_id': categoryId})
      this.categoryName = this.musicCategory.category_name
    },
    // 提交vuex更改musicCategory
    mutateMusicCategory (musicCategory) {
      this.$store.commit('setMusicCategory', musicCategory)
    }
  }
}
</script>
