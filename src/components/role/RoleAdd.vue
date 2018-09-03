<template>
  <el-dialog
    title="添加角色"
    :visible.sync="roleAddVisible"
    width="480px"
    :before-close="handleClose">
    <el-form label-position="left" label-width="70px">
      <el-form-item label="角色">
        <el-input placeholder="请输入角色名" v-model="roleName" @keyup.enter.native="handleConfirm()"></el-input>
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
      roleName: ''
    }
  },
  computed: {
    roleAddVisible: {
      // getter
      get: function () {
        return this.$store.getters.roleAddVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setRoleAddVisible', newValue)
      }
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
      this.$store.commit('setRoleAddVisible', false)
    },
    async handleConfirm () {
      // 角色名不能为空
      if (this.roleName.trim() === '') {
        this.$message({
          message: '请输入角色名！',
          type: 'warning'
        })
        return
      }
      // 提交添加角色 并 关闭模态框
      await this.$store.dispatch('addRole', {this: this, role: {role_name: this.roleName.trim()}})
    }
  }
}
</script>
