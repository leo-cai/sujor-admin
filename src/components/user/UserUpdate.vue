<template>
  <el-dialog
    title="用户编辑"
    :visible.sync="userUpdateVisible"
    width="480px"
    :before-close="handleClose">
    <el-form label-position="left" label-width="70px" :model="user">
      <el-form-item label="用户名">
        <el-input v-model="user.username" disabled></el-input>
      </el-form-item>
      <!-- <el-form-item label="角色">
        <el-checkbox-group
          :value="user.roles"
          @input="checkRole($event)"
          size="medium">
          <el-checkbox v-for="role in roleList" :key="role.role_id" :label="role.role_name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <el-form-item label="可用状态">
        <el-radio :value="user.disabled" @input="mutateUser({ user_id: user.user_id, username: user.username, roles: user.roles, disabled: $event, activated: user.activated })" :label=0>禁用</el-radio>
        <el-radio :value="user.disabled" @input="mutateUser({ user_id: user.user_id, username: user.username, roles: user.roles, disabled: $event, activated: user.activated })" :label=1>可用</el-radio>
      </el-form-item>
      <el-form-item label="激活状态">
        <el-radio :value="user.activated" @input="mutateUser({ user_id: user.user_id, username: user.username, disabled: user.disabled, activated: $event })" :label=0>未激活</el-radio>
        <el-radio :value="user.activated" @input="mutateUser({ user_id: user.user_id, username: user.username, disabled: user.disabled, activated: $event })" :label=1>已激活</el-radio>
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
  computed: {
    userUpdateVisible: {
      // getter
      get: function () {
        return this.$store.getters.userUpdateVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setUserUpdateVisible', newValue)
      }
    },
    // roleList () {
    //   return this.$store.getters.roleList
    // },
    user () {
      return this.$store.getters.user
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
      this.$store.commit('setUserUpdateVisible', false)
    },
    // 确定
    async handleConfirm () {
      // 提交添加用户 并 关闭模态框
      await this.$store.dispatch('updateUser', {this: this, user: this.user})
    },
    // 获取分类列表
    // async getRoleList () {
    //   await this.$store.dispatch('getRoleList', {'this': this})
    // },
    // 获取
    async getUser (userId) {
      await this.$store.dispatch('getUser', {'this': this, 'user_id': userId})
    },
    // 提交vuex更改user
    mutateUser (user) {
      this.$store.commit('setUser', user)
    }
    // // mutate roleGroup
    // checkRole (roleGroup) {
    //   let roles = []
    //   // 获取选中的类型的id 组
    //   roleGroup.forEach(element => {
    //     this.roleList.forEach(e => {
    //       if (e.role_name === element) {
    //         roles.push({role_id: e.role_id, role_name: e.role_name})
    //       }
    //     })
    //   })
    //   console.log(roleGroup)
    //   this.mutateUser({ user_id: this.user.user_id, username: this.user.username, roles: roles, disabled: this.user.disabled, activated: this.user.activated })
    //   console.log(this.user)
    // }
  }
}
</script>
