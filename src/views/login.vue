<template>
  <div class="login">
    <div class="head">
      <div class="logo"></div>
      <h1>{{title}}</h1>
    </div>
    <div class="user">
      <van-cell-group>
        <van-field
          v-model="user.username"
          size="0.16rem"
          clearable
          placeholder="用户名"
        />

        <van-field
          v-model="user.password"
          type="password"
          placeholder="密码"
        />
      </van-cell-group>
    </div>

    <van-button
      slot="button"
      size="normal"
      type="info"
      color="#6BAFFC"
      @click="loginFn"
      :disabled="isDisable"
    >登录{{stoptime}}</van-button>
  </div>
</template>

<script>
  import { getPostData, getParams, getLoc, setLoc } from "../utils/common.js";
  //import { getPostData } from "../utils/getData.js";
  import { Toast, Dialog } from "vant";
  import { mapActions, mapMutations, mapState } from "vuex";
  import { setTimeout } from 'timers';
  export default {
    data() {
      //这里存放数据
      return {
        title: "油气管线智慧监控平台",
        user: {
          username: "",
          password: ""
        },
        isDisable: false,
        stoptime: ""
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
      this.getUser();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },


    //方法集合
    methods: {
      ...mapMutations(['_userInfo']),
      ...mapActions(['_getInfo']),
      getUser() {
        if(getLoc('userInfo')) {
          this.$router.push("/main");
        }
      },
      loginFn() {
        //验证数据
        if(this.user.username == "" || this.user.password == "") {
          Toast({ position: "bottom", message: "账号密码不能为空" });
          return false;
        }

        //提交数据
        const params = getPostData("checkUserIDAndUserPass", [this.user.username, this.user.password]
        );
        this.$router.push("/main");

        // this._getInfo({
        //   ops: params,
        //   method: "post",
        //   api: "getLogin",
        //   callback: res => {
        //     var div = document.createElement("div");
        //     div.innerHTML = res;
        //     var curUserinfo = div.querySelector("return").innerHTML;

        //     if (curUserinfo != "null") {
        //       this.$router.push("/main");
        //       this._userInfo(JSON.parse(curUserinfo));
        //     } else {
        //       Toast({ position: "bottom", message: "账号或密码有误" });
        //       this.user.password = "";
        //       this.isDisable = true;
        //       var num = 3;
        //       var loop = () => {
        //         this.stoptime = '(' + num + ')';
        //         if (num > 0) {
        //           num--;
        //           setTimeout(loop, 1000)
        //         } else {
        //           this.stoptime = "";
        //         }
        //       }
        //       setTimeout(loop, 1)
        //     }
        //   }
        // });
      }
    }
  };
</script>
<style lang='less' scoped>
  .login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url(../assets/bg.jpg) no-repeat top;
    background-size: 100% auto;
    .head {
      padding: 2.4rem 0 1rem;
      text-align: center;
      .logo {
        margin: 0 auto;
        background: url(../assets/logo.png) no-repeat;
        background-size: 100% auto;
        width: 3.7rem;
        height: 1.2rem;
        margin-bottom: 0.4rem;
      }
      h1 {
        font-size: 0.44rem;
        color: #fff;
        margin-bottom: 0.4rem;
      }
    }
    .user {
      width: 5rem;
      margin: 0 auto;
      .van-cell-group {
        background-color: transparent;
        .van-field {
          margin-bottom: 0.2rem;
        }
      }
    }

    .van-button {
      margin-top: 0.5rem;
      width: 5rem;
      letter-spacing: 0.2rem;
    }
  }
</style>
<style>
  .van-icon {
    position: relative;
    bottom: 0.07rem;
    height: 0.49rem;
  }
</style>
