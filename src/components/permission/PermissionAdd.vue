<template>
  <el-dialog
    title="添加权限"
    :visible.sync="permissionAddVisible"
    width="480px"
    :before-close="handleClose">
    <el-form label-position="left" label-width="70px">
      <el-form-item label="权限">
        <el-input placeholder="请输入权限名" v-model="permissionName" @keyup.enter.native="handleConfirm()"></el-input>
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
      permissionName: ''
    }
  },
  computed: {
    permissionAddVisible: {
      // getter
      get: function () {
        return this.$store.getters.permissionAddVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setPermissionAddVisible', newValue)
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
      this.$store.commit('setPermissionAddVisible', false)
    },
    async handleConfirm () {
      // 权限名不能为空
      if (this.permissionName.trim() === '') {
        this.$message({
          message: '请输入权限名！',
          type: 'warning'
        })
        return
      }
      // 提交添加权限 并 关闭模态框
      await this.$store.dispatch('addPermission', {this: this, permission: {permission_name: this.permissionName.trim()}})
    }
  }
}
</script>
