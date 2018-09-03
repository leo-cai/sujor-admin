<template>
  <el-dialog
    title="权限详情"
    :visible.sync="permissionDetailVisible"
    width="480px">
    <el-form label-position="left" label-width="70px" :model="permission">
      <el-form-item label="权限">
        <el-input v-model="permission.permission_name" disabled></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="permission.created_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input v-model="permission.updated_time" disabled></el-input>
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
    permissionDetailVisible: {
      // getter
      get: function () {
        return this.$store.getters.permissionDetailVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setPermissionDetailVisible', newValue)
      }
    },
    permission () {
      return this.$store.getters.permission
    }
  },
  methods: {
    // 关闭模态框
    handleConfirm () {
      this.$store.commit('setPermissionDetailVisible', false)
    },
    // 获取权限详情
    async getPermission (permissionId) {
      await this.$store.dispatch('getPermission', {'this': this, 'permission_id': permissionId})
    }
  }
}
</script>
