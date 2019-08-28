<template>
  <div class='main'>
    <v-header :title="title"></v-header>
    <van-tabs v-model="active" background="#f0f0f0">
      <van-tab title="已完成">
        <v-list-item :items="completed" :infoFn="infoFn"></v-list-item>
      </van-tab>
      <van-tab title="未完成">
        <v-list-item :items="undone" :infoFn="infoFn"></v-list-item>
      </van-tab>
    </van-tabs>
    
  </div>
</template>

<script>

  export default {
    data() {
      //这里存放数据
      return {
        title:"派警列表",
        active:0,
        completed: [{
          id:0,
          title:"监控预警提醒1",
          time:"2019-08-28 10:43:11",
          info:"【建国社区】子午大道158号A座8楼",
          address:"1号预置位发生【1】条告警，请立即前往查看"
        },{
          id:1,
          title:"监控预警提醒2",
          time:"2019-08-28 10:43:11",
          info:"【建国社区】子午大道158号A座8楼",
          address:"1号预置位发生【1】条告警，请立即前往查看"
        },{
          id:1,
          title:"监控预警提醒2",
          time:"2019-08-28 10:43:11",
          info:"【建国社区】子午大道158号A座8楼",
          address:"1号预置位发生【1】条告警，请立即前往查看"
        },{
          id:1,
          title:"监控预警提醒2",
          time:"2019-08-28 10:43:11",
          info:"【建国社区】子午大道158号A座8楼",
          address:"1号预置位发生【1】条告警，请立即前往查看"
        },{
          id:1,
          title:"监控预警提醒2",
          time:"2019-08-28 10:43:11",
          info:"【建国社区】子午大道158号A座8楼",
          address:"1号预置位发生【1】条告警，请立即前往查看"
        },{
          id:1,
          title:"监控预警提醒2",
          time:"2019-08-28 10:43:11",
          info:"【建国社区】子午大道158号A座8楼",
          address:"1号预置位发生【1】条告警，请立即前往查看"
        }],
        undone:[{
          id:0,
          title:"监控预警提醒3",
          time:"2019-08-28 10:43:11",
          info:"【建国社区】子午大道158号A座8楼",
          address:"1号预置位发生【1】条告警，请立即前往查看"
        },{
          id:1,
          title:"监控预警提醒4",
          time:"2019-08-28 10:43:11",
          info:"【建国社区】子午大道158号A座8楼",
          address:"1号预置位发生【1】条告警，请立即前往查看"
        }],
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
      infoFn() {
        this.$router.push('/info');
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
    }
  }
</style>
