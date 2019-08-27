<template>
  <div class='main'>
    <div class="list">
      <van-button
        type="info"
        @click="infoFn"
      >详情</van-button>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      //这里存放数据
      return {};
    },
    props: [],
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //生命周期 - 创建完成（可以访问当前this实例） 
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    //方法集合
    methods: {
      infoFn() {
        this.$router.push('/info');
      }
    }
  }
</script>
<style lang='less' scoped>
  .main {
    .list {
      margin: 20px auto;
      background: #a09e9e;
    }
  }
</style>
