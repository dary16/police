<template>
  <div class="about">
    <v-header :title="title"></v-header>
    <div class="content">
      <div class="img">
        <img v-if="length === 1" src="../assets/testImg.jpg"/>
        <van-swipe
          :autoplay="3000"
          indicator-color="black"
        >
          <van-swipe-item
            v-for="(image, index) in images"
            :key="index"
          >
            <img :src="image" />
            </van-swipe-item>
        </van-swipe>
      </div>
      <div class="address clearfix">
        <div class="left fl">
          <img src="../assets/point.png" alt="">
        </div>
          <div class="right fl">
            <h3>告警地点</h3>
            <h5>建国社区</h5>
          </div>
        </div>
        <div class="btns">
          <van-button
            color="#0ab5bd"
            size="small"
            @click="toPoint"
          >导航至报警点</van-button>
          <van-button
            color="#e8433f"
            size="small"
            @click="commitFn"
          >结果反馈</van-button>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '图集',
        length: 0,
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg'
        ]
      }
    },
    mounted() {
    },
    methods: {
      toPoint() {
        this.$router.push('/map');
      },
      commitFn() {
        this.$router.push('/list');
      }
    }
  }
</script>

<style lang='less' scoped>
  .about {
    .content {
      margin: 0.3rem 0.44rem;
      .img {
        margin-bottom: 1rem;
      }
      .address {
        border-top: 1px solid #979596;
        border-bottom: 1px solid #979596;
        padding: 0.4rem;
        .left {
          width: 1.2rem;
        }
        .right {
          padding-top: 0.12rem;
          h3 {
            font-size: 0.3rem;
            color: #000;
            font-weight: bold;
          }
        }
      }
      .btns {
        margin: 0.2rem 0.35rem;
        button {
          margin-right: 0.1rem;
        }
      }
    }
  }
</style>
