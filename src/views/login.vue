<template>
  <div class='login'>
    <div class="user">
      <van-cell-group>
        <van-field
          v-model="user.username"
          required
          clearable
          label="用户名"
          placeholder="请输入用户名"
        />

        <van-field
          v-model="user.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
      </van-cell-group>
    </div>

    <van-button
      slot="button"
      size="small"
      type="info"
      @click="loginFn"
    >登录</van-button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import {
    Dialog
  } from 'vant';
  export default {
    data() {
      //这里存放数据
      return {
        user: {
          username: '',
          password: ''
        }
      };
    },
    props: [],
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      //   this.init();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    //方法集合
    methods: {
      ...mapActions(['_getInfo']),
      init() {
        this._getInfo({
          ops: { "userID": "xbb", "userPass": "111111" },
          method: 'post',
          api: 'getLogin',
          callback: res => {
            console.log(res);
          }
        })
      },
      loginFn() {
        //登录建议 当用户名和密码都不为空时，登录按钮可点击
        this.$router.push('/main');
      }
    }
  }
</script>
<style lang='less' scoped>
  .login {
    .user {
      margin: 10px auto;
    }
  }
</style>
