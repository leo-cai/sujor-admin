<template>
  <el-dialog
    title="添加音乐文章"
    :visible.sync="musicAddVisible"
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
      <el-form-item label="艺术家">
        <el-input v-model="artist" placeholder="请输入艺术家"></el-input>
      </el-form-item>
      <el-form-item label="歌曲封面">
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
      <el-form-item label="音乐链接">
        <el-input v-model="musicUrl" placeholder="请输入音乐链接"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-checkbox-group v-model="musicCategoryGroup" size="medium">
          <el-checkbox v-for="category in musicCategoryList" :key="category.category_id" :label="category.category_name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="歌词">
        <el-input
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20 }"
          placeholder="请输入歌词"
          v-model="lyric">
        </el-input>
      </el-form-item>
      <el-form-item label="文本歌词">
        <el-input
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20 }"
          placeholder="请输入文本歌词"
          v-model="lyricContent">
        </el-input>
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
      bgUploadUrl: `${config.API_ROOT}v1/image/upload?path=background`, // 上传url
      coverUploadUrl: `${config.API_ROOT}v1/file/upload?path=music`, // 上传音乐封面url
      bgploadSuccess: {}, // 接收上传成功response
      coverUploadSuccess: {}, // 接收上传成功response
      title: '',
      artist: '',
      musicUrl: '',
      lyric: '',
      lyricContent: '',
      summary: '',
      content: '',
      musicCategoryGroup: []
    }
  },
  computed: {
    musicAddVisible: {
      // getter
      get: function () {
        return this.$store.getters.musicAddVisible
      },
      // setter
      set: function (newValue) {
        this.$store.commit('setMusicAddVisible', newValue)
      }
    },
    userId () {
      return getCookie('user_id')
    },
    musicCategoryList () {
      return this.$store.getters.musicCategoryList
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
      this.$store.commit('setMusicAddVisible', false)
    },
    async handleConfirm () {
      let musicCategoryIdGroup = []
      // 获取选中的类型的id 组
      this.musicCategoryGroup.forEach(element => {
        this.musicCategoryList.forEach(e => {
          if (e.category_name === element) {
            musicCategoryIdGroup.push(e.category_id)
          }
        })
      })
      // 分类不能为空
      if (musicCategoryIdGroup.length <= 0) {
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
      // 艺术家不能为空
      if (this.artist.trim() === '') {
        this.$message({
          message: '请输入艺术家',
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
      if (JSON.stringify(this.coverUploadSuccess) !== '{}') {
        coverUrl = this.coverUploadSuccess.data.filename
      } else {
        this.$message({
          message: '请先上传封面！',
          type: 'warning'
        })
        return
      }
      const music = {user_id: this.userId, title: this.title, cover: coverUrl, music_url: this.musicUrl, artist: this.artist, lyric: this.lyric, lyric_content: this.lyricContent, summary: this.summary, content: this.content, background_url: backgroundUrl, pre_background_url: preBackgroundUrl, music_category_id_group: musicCategoryIdGroup}
      // 提交添加 并 关闭模态框
      await this.$store.dispatch('addMusic', {this: this, music})
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
      this.$store.dispatch('deleteFile', {'this': this, 'filename': this.coverUploadSuccess.data.filename, 'filePath': 'music'})
    },
    // getMusicCategoryList
    async getMusicCategoryList () {
      await this.$store.dispatch('getMusicCategoryList', {'this': this})
    }
  }
}
</script>
