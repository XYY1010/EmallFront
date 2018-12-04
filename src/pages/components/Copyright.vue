<template>
  <div>
   <div class="copyright" id="copyright">
     <div class="copyrightMiddle">
       <img src="../../assets/cateye.png" id="cateye" class="cateye">
       <div class="white_link">
         <a href="#" style="padding-left: 0px">关于我们</a>
         <a href="#">帮助中心</a>
         <a href="#">开放平台</a>
         <a href="#">诚聘英才</a>
         <a href="#">联系我们</a>
         <a href="#">网站合作</a>
         <a href="#">法律声明</a>
         <a href="#">知识产权</a>
         <a href="#">廉正举报</a>
       </div>
       <div class="white_link">
         <a href="#" style="padding-left: 0px">阿里巴巴集团</a><span class="slash">|</span>
         <a href="#">淘宝网</a><span class="slash">|</span>
         <a href="#">天猫</a><span class="slash">|</span>
         <a href="#">聚划算</a><span class="slash">|</span>
         <a href="#">全球速卖通</a><span class="slash">|</span>
         <a href="#">阿里巴巴国际交易平台</a><span class="slash">|</span>
         <a href="#">1688</a><span class="slash">|</span>
         <a href="#">阿里妈妈</a><span class="slash">|</span>
         <a href="#">阿里旅行·去啊</a><span class="slash">|</span>
         <a href="#">阿里云计算</a><span class="slash">|</span>
         <a href="#">阿里通信</a><span class="slash">|</span>
         <a href="#">YunOS</a><span class="slash">|</span>
         <a href="#">万网</a><span class="slash">|</span>
         <a href="#">高德</a><span class="slash">|</span>
         <a href="#">优视</a><span class="slash">|</span>
         <a href="#">友盟</a><span class="slash">|</span>
         <a href="#">虾米</a><span class="slash">|</span>
         <a href="#">天天动听</a><span class="slash">|</span>
         <a href="#">来往</a><span class="slash">|</span>
         <a href="#">钉钉</a><span class="slash">|</span>
         <a href="#">支付宝</a>
       </div>

       <div class="license">
         <span>增值电信业务经营许可证： 浙B5-20180446</span>
         <span>网络文化经营许可证：浙网文[2018]0295-065号</span>
         <span>互联网医疗保健信息服务 审核同意书 浙卫网审【2014】6号 </span>
         <span>互联网药品信息服务资质证书编号：浙-（经营性）-2012-0005</span>
         <div class="copyRightYear">&copy; 2018-2019 EMALL.com 版权所有</div>
         <div>
           <img src="../../assets/copyRight1.jpg">
           <img src="../../assets/copyRight2.jpg">
         </div>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  name: 'copyright',
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.copyright {
    background-color: black;
    border-top-style: solid;
    border-top-width: 2px;
    border-top-color: #A013EB;
    margin-top: 40px;
  }
  .copyrightMiddle {
    width: 1024px;
    margin: 0 auto;
    text-align: left;
    position: relative;
  }
  .cateye {
    margin-left: 20px;
    display: block;
    top: -33px;
    left: -15px;
    position: absolute;
  }
  .copyright .slash {
    color: white;
  }
  .license {
    margin-left: 10px;
    padding-bottom: 30px;
  }
  .license .copyRightYear {
    margin: 10px 0px;
    color: #686868;
  }
  .license span {
    color: #A4A4A4;
  }
  .copyright .white_link {
    padding: 10px 0px;
    margin-left: 10px;
  }
  .copyright .white_link a {
    padding: 0px 5px;
    color: white;
  }
</style>
