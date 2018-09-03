<template>
  <el-dialog
    title="添加分类"
    :visible.sync="filmCategoryAddVisible"
    width="480px"
    :before-close="handleClose">
    <el-form label-position="left" label-width="70px">
      <el-form-item label="分类">
        <el-input placeholder="请输入分类名" v-model="categoryName" @keyup.enter.native="handleConfirm()"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel()">取 消</el-button>
      <el-button type="primary" @click="handleConfirm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getCookie } from '@/utils/cookie'
export default {
  data () {
    return {
      categoryName: ''
    }
  },
  computed: {
    filmCategoryAddVisible: {
      // getter
      get: function () {
        return this.$store.getters.filmCategoryAddVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setFilmCategoryAddVisible', newValue)
      }
    },
    userId () {
      return getCookie('user_id')
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认不保存，直接关闭吗？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleCancel () {
      this.$store.commit('setFilmCategoryAddVisible', false)
    },
    async handleConfirm () {
      // 分类名不能为空
      if (this.categoryName.trim() === '') {
        this.$message({
          message: '请输入分类名！',
          type: 'warning'
        })
        return
      }
      // 提交添加分类 并 关闭模态框
      await this.$store.dispatch('addFilmCategory', {this: this, category: {category_name: this.categoryName.trim(), user_id: this.userId}})
    }
  }
}
</script>
