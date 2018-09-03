<template>
  <el-dialog
    title="代码详情"
    :visible.sync="codeDetailVisible"
    width="680px">
    <el-form label-position="left" label-width="70px" :model="code">
      <el-form-item label="标题">
        <el-input v-model="code.title" disabled></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-tag v-if="code.categories.length === 0">暂无分类</el-tag>
        <el-tag v-else v-for="(category, index) in code.categories" :key="index" v-text="category.category_name" style="margin: 0 5px;" type="success"></el-tag>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="code.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="访问量">
        <el-input v-model="code.clicks" disabled></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20 }"
          v-model="code.summary" disabled></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input
          type="textarea"
          :autosize="{ minRows: 20, maxRows: 30 }"
          v-model="code.content" disabled></el-input>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-radio v-model="code.audited" :label=0 disabled>审核中</el-radio>
        <el-radio v-model="code.audited" :label=1 disabled>已通过</el-radio>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-radio v-model="code.activated" :label=0 disabled>未发布</el-radio>
        <el-radio v-model="code.activated" :label=1 disabled>已发布</el-radio>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="code.created_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input v-model="code.updated_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="审核时间">
        <el-input v-model="code.audited_time" disabled></el-input>
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
    codeDetailVisible: {
      // getter
      get: function () {
        return this.$store.getters.codeDetailVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setCodeDetailVisible', newValue)
      }
    },
    code () {
      return this.$store.getters.code
    }
  },
  methods: {
    // 关闭模态框
    handleConfirm () {
      this.$store.commit('setCodeDetailVisible', false)
    },
    // 获取分类详情
    async getCode (codeId) {
      await this.$store.dispatch('getCode', {'this': this, 'code_id': codeId})
    }
  }
}
</script>
