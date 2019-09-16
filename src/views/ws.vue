<template>
  <div class='ws'>
    <button
      id='ToggleConnection'
      type="button"
      @click='ToggleConnectionClicked();'
    >连接服务器</button><br /><br />
    <button
      id='ToggleConnection'
      type="button"
      @click='SendData();'
    >发送我的名字：beston</button><br /><br />
    <button
      id='ToggleConnection'
      type="button"
      @click='seestate();'
    >查看状态</button><br /><br />
  </div>
</template>

<script>
  var ws;
  export default {
    data() {
      //这里存放数据
      return {

      };
    },
    props: [],
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.ToggleConnectionClicked();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    //方法集合
    methods: {
      ToggleConnectionClicked() {
        try {
          ws = new WebSocket("ws://192.168.200.31:8090");//连接服务器
          ws.onopen = function(event) { alert("已经与服务器建立了连接rn当前连接状态：" + this.readyState); };
          ws.onmessage = function(event) { alert("接收到服务器发送的数据：rn" + event.data); };
          ws.onclose = function(event) { alert("已经与服务器断开连接rn当前连接状态：" + this.readyState); };
          ws.onerror = function(event) { alert("WebSocket异常！"); };
        } catch(ex) {
          alert(ex.message);
        }
      },
      SendData() {
        try {
          ws.send("beston");
        } catch(ex) {
          alert(ex.message);
        }
      },

      seestate() {
        alert(ws.readyState);
      }
    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
</style>