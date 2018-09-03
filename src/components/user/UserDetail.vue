<template>
  <el-dialog
    title="用户详情"
    :visible.sync="userDetailVisible"
    width="480px">
    <el-form label-position="left" label-width="70px" :model="user">
      <el-form-item label="用户名">
        <el-input v-model="user.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-tag v-if="user.roles.length === 0">暂无角色</el-tag>
        <el-tag v-else v-for="(role, index) in user.roles" :key="index" v-text="role.role_name" style="margin: 0 5px;" type="success"></el-tag>
      </el-form-item>
      <el-form-item label="可用状态">
        <el-radio v-model="user.disabled" :label=0 disabled>禁用</el-radio>
        <el-radio v-model="user.disabled" :label=1 disabled>可用</el-radio>
      </el-form-item>
      <el-form-item label="激活状态">
        <el-radio v-model="user.activated" :label=0 disabled>未激活</el-radio>
        <el-radio v-model="user.activated" :label=1 disabled>已激活</el-radio>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="user.created_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input v-model="user.updated_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="登录时间">
        <el-input v-model="user.signed_time" disabled></el-input>
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
    userDetailVisible: {
      // getter
      get: function () {
        return this.$store.getters.userDetailVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setUserDetailVisible', newValue)
      }
    },
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    // 关闭模态框
    handleConfirm () {
      this.$store.commit('setUserDetailVisible', false)
    },
    // 获取分类详情
    async getUser (userId) {
      await this.$store.dispatch('getUser', {'this': this, 'user_id': userId})
    }
  }
}
</script>
