<template>
  <div class='list'>
    <v-header
      :title="title"
      v-on:refrash="refrashFn"
    ></v-header>
    <div class="content">
      <van-checkbox-group v-model="result">
        <van-cell-group title="请选择人员">
          <van-cell
            v-for="(item, index) in list"
            clickable
            :key="item"
            :title="`复选框 ${item}`"
            @click="toggle(index)"
          >
            <van-checkbox
              :name="item"
              ref="checkboxes"
              slot="right-icon"
            />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <div class="btns">
        <button @click="back">取消</button>
        <button
          class="submit"
          @click="submit"
        >确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { formatDate } from '@/utils/common.js';
  import { getPostData, getParams } from "@/utils/common.js";
  export default {
    data() {
      //这里存放数据
      return {
        title: '智能监控终端',
        list: ['a', 'b', 'c'],
        result: []
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
    mounted() { },
    //方法集合
    methods: {
      toggle(index) {
        this.$refs.checkboxes[index].toggle();
      },
      back() {
        this.$router.go(-1)
      },
      submit() {

      }
    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
  .content {
    position: absolute;
    top: 1.226667rem;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f0f0f0;
    text-align: left;
    .btns {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 1rem;
      display: flex;
      height: 50px;
      button {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        background-color: #fff;
        font-size: 0.32rem;
      }
      button:active {
        background-color: #f2f3f5;
      }
      .submit {
        color: #07c160;
      }
    }
  }
</style>