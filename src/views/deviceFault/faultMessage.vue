<template>
  <div class='fault'>
    <v-header :title="title"></v-header>
    <van-cell-group>
      <van-field
        v-model="value"
        type="text"
        label="故障详情"
        label-width="100%"
        label-align="left"
      />
      <van-field
        v-model="time"
        type="text"
        label="故障时间"
        label-width="100%"
        label-align="left"
      />
    </van-cell-group>
  </div>
</template>

<script>

  export default {
    data() {
      //这里存放数据
      return {
        title: "故障通知",
        value: "测试数据啦啦啦",
        time: "2019-04-11 08:12:56"
      };
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

    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
  .fault {
    .van-cell-group {
      .van-cell {
        display: block !important;
        &.van-cell__value {
          textarea {
            width: 100% !important;
          }
        }
      }
    }
  }
</style>