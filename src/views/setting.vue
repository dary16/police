<template>
  <div class='setting'>
    <div class="content">
      <div class="user">
        <ul>
          <li>
            <span class="t-left">用户名</span>
            <span class="t-right">{{userInfo.realName}}</span>
          </li>
          <van-divider />
          <li>
            <span class="t-left">公司名称</span>
            <span class="t-right">{{userInfo.departmentName}}</span>
          </li>
          <van-divider />
          <li>
            <span class="t-left">角色</span>
            <span class="t-right">{{userInfo.userRoleNames}}</span>
          </li>
          <van-divider />
        </ul>
      </div>
    </div>
    <div
      class="footer"
      @click="changeUserFn"
    >
      切换账号
    </div>
  </div>
</template>

<script>
  import { setLoc } from "../utils/common.js";
  import { mapState } from 'vuex';
  export default {
    data() {
      //这里存放数据
      return {
        title: "设置"
      };
    },
    props: [],
    //监听属性 类似于data概念
    computed: {
      ...mapState(['userInfo'])
    },
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
      changeUserFn() {
        setLoc('userInfo', '');
        this.$router.push('/login');
      }
    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
  .setting {
    .content {
      width: 100%;
      height: 100%;
      background: #f3f3f3;
      .user {
        font-size: 0.26rem;
        li {
          height: 1rem;
          line-height: 1rem;
          padding: 0 0.5rem;
          .t-left {
            width: 40%;
            float: left;
            text-align: left;
          }
          .t-right {
            width: 50%;
            float: right;
            text-align: right;
          }
        }
      }
    }
    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.3rem;
      background: #f3f3f3;
    }
  }
</style>
<style>
  .setting .van-divider {
    line-height: auto !important;
    margin: 0 !important;
  }
</style>