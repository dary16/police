<template>
  <div class="mainList">
    <van-cell-group
      v-for="item in items"
      :key="item.id"
    >
      <van-cell :title="item.title"></van-cell>
      <van-cell
        :value="item.infoTitle"
        class="content"
      ></van-cell>
      <van-cell
        :value="'预警内容：'+item.address+',标桩号：'+item.stakeNO+',预置位：'+item.presetNo+','+item.info"
        class="content"
      ></van-cell>
      <van-cell
        :value="'预警时间：'+item.time"
        class="content"
      ></van-cell>
      <van-cell
        title="详情"
        is-link
        url=""
        clickable
        class="info"
        @click="infoFns(item)"
      ></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: ['items', 'infoFn'],
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
      infoFns(val) {
        this.$emit("infoIdFn", val);
      }
    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>

<style lang='less' scoped>
  .mainList {
    position: absolute;
    top: 44px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    padding-top: 0.2rem;
    .van-cell-group {
      margin: 0 0.15rem 0.2rem;
      border-radius: 4px;
      overflow: hidden;
      text-align: left;
      .content {
        padding: 0.05rem 16px;
        .van-cell__value {
          color: #969799;
        }
      }
      .info {
        border-top: 1px solid #eee;
      }
    }
  }
</style>