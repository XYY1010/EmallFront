<template>
  <div>
   <div class="copyright" id="copyright">
     <div class="copyrightMiddle">
       <div class="license">
         <span>增值电信业务经营许可证： 浙B2-20110446</span> <span class="slash">|</span>
         <span>网络文化经营许可证：浙网文[2015]0295-065号</span>
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
  name: 'simplecopyright',
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.copyright {
    background-color: white;
  }
  .copyrightMiddle {
    width: 1024px;
    margin: 0 auto;
    text-align: center;
    position: relative;
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
  .slash {
    margin: 0px 5px 0px 5px;
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
