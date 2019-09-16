<template>
  <div class='header'>
    <van-nav-bar :title="title">
      <van-icon
        name="cross"
        slot="left"
        color="#323233"
        v-show="show"
        @click="onClickLeft"
      />
    </van-nav-bar>
  </div>
</template>

<script>

  export default {
    data() {
      //这里存放数据
      return {
        show: true
      };
    },
    props: ['title', 'isShow'],
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.init();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    //方法集合
    methods: {
      onClickLeft() {
        this.$router.push('/main');
      },
      init() {
        if(this.isShow == "hide") {
          this.show = false;
        }
      }
    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
</style>