<template>
  <div class="avatar-info-div">
    <Alert show-icon class="tips-box" closable type="warning">
        小提示
        <Icon type="md-bulb" slot="icon"></Icon>
        <template slot="desc">点击上传区域或拖拽图片入区域进行上传！</template>
    </Alert>
    <div class="position-set">
      <Upload
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="100" style="color: #3399ff"></Icon>
            <p>点击或拖拽上传头像</p>
        </div>
    </Upload>
  </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        imageUrl: ''
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG 或者是 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style scoped>
  .avatar-info-div {
    margin: 30px 50px;
  }
  .position-set {
    text-align: center;
  }
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    left: 322px;
    width:178px;
    height: 178px;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .btn-upload {
    width: 178px;
    height: auto;
    margin: 10px 0px;
  }
</style>
