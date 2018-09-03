<template>
  <el-dialog
    title="权限编辑"
    :visible.sync="permissionUpdateVisible"
    width="480px"
    :before-close="handleClose">
    <el-form label-position="left" label-width="70px" :model="permission">
      <el-form-item label="权限">
        <el-input :value="permission.permission_name"
          @input="mutatePermission({ permission_name: $event.trim(), permission_id: permission.permission_id })"
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
      permissionName: ''
    }
  },
  computed: {
    permissionUpdateVisible: {
      // getter
      get: function () {
        return this.$store.getters.permissionUpdateVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setPermissionUpdateVisible', newValue)
      }
    },
    permission () {
      return this.$store.getters.permission
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
      this.$store.commit('setPermissionUpdateVisible', false)
    },
    // 确定
    async handleConfirm () {
      // 权限不能为空
      if (this.permission.permission_name.trim() === '') {
        this.$message({
          message: '请输入权限名！',
          type: 'warning'
        })
        return
      }
      // 权限未更改
      if (this.permission.permission_name.trim() === this.permissionName) {
        this.$message({
          message: '权限未更改',
          type: 'warning'
        })
        return
      }
      // 提交添加权限 并 关闭模态框
      await this.$store.dispatch('updatePermission', {this: this, permission: this.permission})
    },
    // 获取
    async getPermission (permissionId) {
      await this.$store.dispatch('getPermission', {'this': this, 'permission_id': permissionId})
      this.permissionName = this.permission.permission_name
    },
    // 提交vuex更改permission
    mutatePermission (permission) {
      this.$store.commit('setPermission', permission)
    }
  }
}
</script>
