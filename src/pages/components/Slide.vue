<template>
  <div class="banner">
    <span  class="slide-pre" @click="slidePre">
      <i class="el-icon-arrow-left icon-chevron-left"></i>
    </span>
    <span  class="slide-next" @click="slideNext">
      <i class="el-icon-arrow-right icon-chevron-right"></i>
    </span>
    <div class="slide" v-for="(item, index) in banners" v-show="index === curpage" :key="index" transition="fadeIn">
      <a :href="item.sourceUrl" target="_blank">
        <img class="imgBanners" :src="item.imgUrl" alt=""/>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slide',
  data() {
    return {
      prevTid: '',
      curpage: 0,
      slideDirection: 1
    }
  },
  props: {
    banners: {
      type: Array,
      require: true
    }
  },
  mounted() {
    this.autoSlide();
  },
  methods: {
    slidePre() {
      const lastPage = this.banners.length - 1;
      if (this.curpage > 0) {
        this.curpage -= 1;
      } else {
        this.curpage = lastPage;
      }
    },
    slideNext() {
      if (this.curpage < this.banners.length - 1) {
        this.curpage += 1;
      } else {
        this.curpage = 0;
      }
    },
    autoSlide() {
      clearInterval(this.prevTid);
      this.prevTid = setInterval(() => {
        this.slideNext();
      }, 5000);
    }
  }
}
</script>

<style scoped>
.banner {
  position: relative;
  width: 1226px;
  height: 460px;
  z-index: 0;
}

.slide-pre {
  display: block;
  position: absolute;
  left: 235px;
  top: 50%;
  width: 40px;
  height: 70px;
  margin-top: -35px;
  z-index: 10;
  cursor: pointer;
}

.slide-pre:hover, .slide-next:hover {
  background: rgba(0, 0, 0, 0.3);
}

.slide-next {
  display: block;
  position: absolute;
  right: 0;
  top: 50%;
  width: 40px;
  height: 70px;
  margin-top: -35px;
  z-index: 10;
  cursor: pointer;
}

.slide {
  position: absolute;
  left: 0;
  top: 0;
  width: 1226px;
  height: 460px;
}

.imgBanners {
  width: 100%;
  height: 100%;
}

.icon-chevron-left, .icon-chevron-right {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 30px;
  height: 30px;
  margin-left: -10px;
  margin-top: -10px;
  color: #ecf0f1;
}

.fadeIn-transition {
  transition: all .5s ease;
  opacity: 1;
}

.fadeIn-enter, .fadeIn-leave {
  opacity: 0;
}
</style>
