<template>
  <el-dialog
    title="角色编辑"
    :visible.sync="roleUpdateVisible"
    width="480px"
    :before-close="handleClose">
    <el-form label-position="left" label-width="70px" :model="role">
      <el-form-item label="角色">
        <el-input :value="role.role_name"
          @input="mutateRole({ role_name: $event.trim(), role_id: role.role_id })"
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
      roleName: ''
    }
  },
  computed: {
    roleUpdateVisible: {
      // getter
      get: function () {
        return this.$store.getters.roleUpdateVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setRoleUpdateVisible', newValue)
      }
    },
    role () {
      return this.$store.getters.role
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
      this.$store.commit('setRoleUpdateVisible', false)
    },
    // 确定
    async handleConfirm () {
      // 角色不能为空
      if (this.role.role_name.trim() === '') {
        this.$message({
          message: '请输入角色名！',
          type: 'warning'
        })
        return
      }
      // 角色未更改
      if (this.role.role_name.trim() === this.roleName) {
        this.$message({
          message: '角色未更改',
          type: 'warning'
        })
        return
      }
      // 提交添加角色 并 关闭模态框
      await this.$store.dispatch('updateRole', {this: this, role: this.role})
    },
    // 获取
    async getRole (roleId) {
      await this.$store.dispatch('getRole', {'this': this, 'role_id': roleId})
      this.roleName = this.role.role_name
    },
    // 提交vuex更改role
    mutateRole (role) {
      this.$store.commit('setRole', role)
    }
  }
}
</script>
