<template>
  <el-dialog
    title="添加书籍文章"
    :visible.sync="bookAddVisible"
    width="680px"
    :before-close="handleClose">
    <el-form label-position="left" label-width="70px">
      <el-form-item label="文章背景">
        <el-upload
          drag
          :action="bgUploadUrl"
          :on-success="bgSuccessUpload"
          :on-remove="removeBgUpload"
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
      <el-form-item label="豆瓣链接">
        <el-input v-model="bookUrl" placeholder="请输入豆瓣链接"></el-input>
      </el-form-item>
      <el-form-item label="书籍封面">
        <el-upload
          drag
          :action="coverUploadUrl"
          :on-success="coverSuccessUpload"
          :on-remove="removeCoverUpload"
          :limit=1
          :on-exceed="handleExceed"
          list-type="picture">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将背景图片文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="分类">
        <el-checkbox-group v-model="bookCategoryGroup" size="medium">
          <el-checkbox v-for="category in bookCategoryList" :key="category.category_id" :label="category.category_name"></el-checkbox>
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
      bgUploadUrl: `${config.API_ROOT}v1/image/upload?path=background`, // 上传背景url
      coverUploadUrl: `${config.API_ROOT}v1/image/upload?path=cover`, // 上传封面url
      bgUploadSuccess: {}, // 接收上传成功response
      coverUploadSuccess: {}, // 接收上传成功response
      title: '',
      bookUrl: '',
      summary: '',
      content: '',
      bookCategoryGroup: []
    }
  },
  computed: {
    bookAddVisible: {
      // getter
      get: function () {
        return this.$store.getters.bookAddVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setBookAddVisible', newValue)
      }
    },
    userId () {
      return getCookie('user_id')
    },
    bookCategoryList () {
      return this.$store.getters.bookCategoryList
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
      this.$store.commit('setBookAddVisible', false)
    },
    async handleConfirm () {
      let bookCategoryIdGroup = []
      // 获取选中的类型的id 组
      this.bookCategoryGroup.forEach(element => {
        this.bookCategoryList.forEach(e => {
          if (e.category_name === element) {
            bookCategoryIdGroup.push(e.category_id)
          }
        })
      })
      // 分类不能为空
      if (bookCategoryIdGroup.length <= 0) {
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
      if (JSON.stringify(this.bgUploadSuccess) !== '{}') {
        backgroundUrl = this.bgUploadSuccess.data.imagename
        preBackgroundUrl = this.bgUploadSuccess.data.pre_imagename
      } else {
        this.$message({
          message: '请先上传图片！',
          type: 'warning'
        })
        return
      }
      // 封面图片不能为空
      let coverUrl = ''
      let preCoverUrl = ''
      if (JSON.stringify(this.coverUploadSuccess) !== '{}') {
        coverUrl = this.coverUploadSuccess.data.imagename
        preCoverUrl = this.coverUploadSuccess.data.pre_imagename
      } else {
        this.$message({
          message: '请先上传封面！',
          type: 'warning'
        })
        return
      }
      const book = {user_id: this.userId, title: this.title, cover: coverUrl, pre_cover: preCoverUrl, book_url: this.bookUrl, summary: this.summary, content: this.content, background_url: backgroundUrl, pre_background_url: preBackgroundUrl, book_category_id_group: bookCategoryIdGroup}
      // 提交添加 并 关闭模态框
      await this.$store.dispatch('addBook', {this: this, book})
    },
    // handleExceed
    handleExceed (files, fileList) {
      this.$message({
        message: '超出音频文件上传个数！',
        type: 'warning'
      })
    },
    // bgSuccessUpload
    bgSuccessUpload (response, file, fileList) {
      this.bgUploadSuccess = response
    },
    // coverSuccessUpload
    coverSuccessUpload (response, file, fileList) {
      this.coverUploadSuccess = response
    },
    // removeBgUpload
    removeBgUpload (file, fileList) {
      this.$store.dispatch('deleteImage', {'this': this, 'imageName': this.bgUploadSuccess.data.imagename, 'imagePath': 'background'})
    },
    // removeCoverUpload
    removeCoverUpload (file, fileList) {
      this.$store.dispatch('deleteImage', {'this': this, 'imageName': this.coverUploadSuccess.data.imagename, 'imagePath': 'cover'})
    },
    // getBookCategoryList
    async getBookCategoryList () {
      await this.$store.dispatch('getBookCategoryList', {'this': this})
    }
  }
}
</script>
