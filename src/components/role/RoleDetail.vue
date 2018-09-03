<template>
  <el-dialog
    title="角色详情"
    :visible.sync="roleDetailVisible"
    width="480px">
    <el-form label-position="left" label-width="70px" :model="role">
      <el-form-item label="角色">
        <el-input v-model="role.role_name" disabled></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="role.created_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input v-model="role.updated_time" disabled></el-input>
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
    roleDetailVisible: {
      // getter
      get: function () {
        return this.$store.getters.roleDetailVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setRoleDetailVisible', newValue)
      }
    },
    role () {
      return this.$store.getters.role
    }
  },
  methods: {
    // 关闭模态框
    handleConfirm () {
      this.$store.commit('setRoleDetailVisible', false)
    },
    // 获取角色详情
    async getRole (roleId) {
      await this.$store.dispatch('getRole', {'this': this, 'role_id': roleId})
    }
  }
}
</script>
