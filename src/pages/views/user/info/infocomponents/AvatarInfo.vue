<template>
  <div class="avatar-info-div">
    <Alert show-icon class="tips-box" closable type="warning">
        小提示
        <Icon type="md-bulb" slot="icon"></Icon>
        <template slot="desc">点击上传区域或拖拽图片入区域进行上传！</template>
    </Alert>
    <div class="position-set">
      <Upload
        ref="upload"
        name="upfile"
        :headers="headers"
        :on-error="uploadError"
        :on-success="addUploadSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :before-upload="beforeAvatarUpload"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        type="drag"
        action="http://localhost:8090/file/uploading">
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
        imageUrl: '',
        headers:{
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Access-Control-Allow-Origin': '*'
        },
        userInfo: {}
      };
    },
    methods: {
      handleFormatError(file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        })
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        })
      },
      addUploadSuccess(res,file,fileList){
        this.$Message.success("上传成功");
        this.imageUrl = res.data;
        console.log(this.imageUrl);
        this.$axios({
          method: 'post',
          url: '/user/modifyAvatar',
          params: {
            userId: this.userInfo.userId,
            avatar: this.imageUrl
          }
        }).then(res => {
          let result = res.data;
          if (result.status == 'success') {
            this.$store.commit('editUser', {user: {
              avatarSrc: this.imageUrl
            }});
          } else {
            this.$Notice.error({
              title: "错误" + result.data.errCode,
              desc: result.data.errMsg
            });
          }
        }).catch(err => {
          this.$Notice.error({
            title: "错误",
            desc: "服务器开小差了,请稍后再试"
          });
        });
      },
      uploadError(a,b,c){
        this.$Message.error(a.data);
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
    },
    mounted() {
      this.userInfo = this.$store.getters.user;
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
