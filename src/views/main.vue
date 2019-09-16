<template>
  <div class='main'>
    <v-header
      :title="title"
      :isShow="isShow"
    ></v-header>
    <router-view />

    <van-tabbar v-model="active">
      <van-tabbar-item
        icon="home-o"
        @click="homeFn"
      >首页</van-tabbar-item>
      <van-tabbar-item
        icon="setting-o"
        @click="setFn"
      >设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    data() {
      //这里存放数据
      return {
        title: "派警列表",
        active: 0,
        isShow: "hide",
      };
    },
    props: [],
    //监听属性 类似于data概念
    computed: {
    },
    //监控data中的数据变化
    watch: {},
    //生命周期 - 创建完成（可以访问当前this实例） 
    created() {
      this.$router.push('/list');
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    //方法集合
    methods: {
      setFn() {
        this.title = "设置";
        this.$router.push('/setting');
      },
      homeFn() {
        this.$router.push('/list');
      }
    }
  }
</script>
<style lang='less' scoped>
  .main {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .van-tabs {
      position: absolute;
      top: 46px;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: #f0f0f0;
      .nodata {
        position: absolute;
        bottom: 1rem;
        text-align: center;
        color: #999;
        left: 50%;
        width: 1rem;
        margin-left: -0.5rem;
      }
    }
  }
</style>
