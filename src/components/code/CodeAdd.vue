<template>
  <el-dialog
    title="添加code文章"
    :visible.sync="codeAddVisible"
    width="680px"
    :before-close="handleClose">
    <el-form label-position="left" label-width="70px">
      <el-form-item label="文章背景">
        <el-upload
          drag
          :action="uploadUrl"
          :on-success="successUpload"
          :on-remove="removeUpload"
          :limit=1
          :on-exceed="handleExceed"
          list-type="picture">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将背景图片文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-checkbox-group v-model="codeCategoryGroup" size="medium">
          <el-checkbox v-for="category in codeCategoryList" :key="category.category_id" :label="category.category_name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="简介">
        <el-input
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20 }"
          placeholder="请输入简介"
          v-model="summary">
        </el-input>
      </el-form-item>
      <el-form-item label="内容">
        <markdown-editor v-model="content" ref="markdownEditor" style="text-align: left; line-hight: 30px;" :highlight="true"></markdown-editor>
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
import * as config from '@/store/config'
export default {
  data () {
    return {
      uploadUrl: `${config.API_ROOT}v1/image/upload?path=background`, // 上传url
      uploadSuccess: {}, // 接收上传成功response
      title: '',
      summary: '',
      content: '',
      codeCategoryGroup: []
    }
  },
  computed: {
    codeAddVisible: {
      // getter
      get: function () {
        return this.$store.getters.codeAddVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setCodeAddVisible', newValue)
      }
    },
    userId () {
      return getCookie('user_id')
    },
    codeCategoryList () {
      return this.$store.getters.codeCategoryList
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
      this.$store.commit('setCodeAddVisible', false)
    },
    async handleConfirm () {
      let codeCategoryIdGroup = []
      // 获取选中的类型的id 组
      this.codeCategoryGroup.forEach(element => {
        this.codeCategoryList.forEach(e => {
          if (e.category_name === element) {
            codeCategoryIdGroup.push(e.category_id)
          }
        })
      })
      // 分类不能为空
      if (codeCategoryIdGroup.length <= 0) {
        this.$message({
          message: '请至少选择一个分类',
          type: 'warning'
        })
        return
      }
      // 标题不能为空
      if (this.title.trim() === '') {
        this.$message({
          message: '请输入标题',
          type: 'warning'
        })
        return
      }
      // 内容不能为空
      if (this.content.trim() === '') {
        this.$message({
          message: '请输入内容',
          type: 'warning'
        })
        return
      }
      // 背景图片不能为空
      let backgroundUrl = ''
      let preBackgroundUrl = ''
      if (JSON.stringify(this.uploadSuccess) !== '{}') {
        backgroundUrl = this.uploadSuccess.data.imagename
        preBackgroundUrl = this.uploadSuccess.data.pre_imagename
      } else {
        this.$message({
          message: '请先上传图片！',
          type: 'warning'
        })
        return
      }
      const code = {user_id: this.userId, title: this.title, summary: this.summary, content: this.content, background_url: backgroundUrl, pre_background_url: preBackgroundUrl, code_category_id_group: codeCategoryIdGroup}
      // 提交添加 并 关闭模态框
      await this.$store.dispatch('addCode', {this: this, code})
    },
    // handleExceed
    handleExceed (files, fileList) {
      this.$message({
        message: '超出音频文件上传个数！',
        type: 'warning'
      })
    },
    // successUpload
    successUpload (response, file, fileList) {
      this.uploadSuccess = response
    },
    // removeUpload
    removeUpload (file, fileList) {
      this.$store.dispatch('deleteImage', {'this': this, 'imageName': this.uploadSuccess.data.imagename, 'imagePath': 'background'})
    },
    // getCodeCategoryList
    async getCodeCategoryList () {
      await this.$store.dispatch('getCodeCategoryList', {'this': this})
    }
  }
}
</script>
