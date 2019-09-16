<template>
  <div class='list'>
    <v-header
      :title="title"
      v-on:refrash="refrashFn"
    ></v-header>
    <div class="cell-wrap">
      <van-cell-group>

        <van-field
          v-model="objData.verifyContent"
          id="textarea"
          label="现场情况"
          type="text"
          placeholder="（必填）核实情况"
          label-width="100%"
          label-align="left"
          autosize
        />

      </van-cell-group>

      <div class="loader-wrap">
        <h3>现场照片（最多9张）</h3>
        <van-uploader
          v-model="imgList"
          :max-count="9"
          :after-read="afterRead"
          @delete="deleteFn"
          multiple
        />
      </div>
      <div class="footer-btn">
        <van-button
          color="#e8433f"
          size="small"
          @click="cancelFn"
        >关闭</van-button>
        <van-button
          color="#0ab5bd"
          size="small"
          @click="commitFn"
        >提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { getPostData, getParams, getLoc } from "@/utils/common.js";
  import { Toast, Dialog } from "vant";
  export default {
    data() {
      //这里存放数据
      return {
        title: '结果反馈（处理中）',
        objData: {
          dispatchPoliceID: '',
          verifyPersonID: '',
          verifyContent: '',
          ImageNameList: []
        },
        fileList: [],
        imgList: []
      };
    },
    props: [],
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      console.log(this.$route.params.dispatchId);
      this.objData.dispatchPoliceID = this.$route.params.dispatchId;
      this.objData.verifyPersonID = getLoc('userInfo').userID;
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    //方法集合
    methods: {
      ...mapActions(['_getInfo']),
      //提交
      commitFn() {
        if(!this.objData.verifyContent) {
          Toast({ position: "bottom", message: "内容不能为空" });
          return false;
        }
        if(this.objData.ImageNameList.length === 0) {
          Toast({ position: "bottom", message: "请上传照片" });
          return false;
        }
        let params = getPostData("addDispatchPolice", {
          "dispatchPoliceID": this.objData.dispatchPoliceID,
          "verifyPersonID": this.objData.verifyPersonID,
          "verifyContent": this.objData.verifyContent,
          "ImageNameList": this.objData.ImageNameList
        });
        // console.log(params);
        this._getInfo({
          ops: params,
          method: "post",
          api: "addDispatchPolice",
          callback: res => {
            var div = document.createElement("div");
            div.innerHTML = res;

            var resData = JSON.parse(div.querySelector("return").innerHTML);
            if(resData.result === '' && resData.status === 'success') {
              //   console.log('处理成功');
              this.$router.push('/main');
            } else {
              Toast({ position: "bottom", message: "上传失败" });
              this.$router.push('/main');
            }
          }
        })
      },
      //关闭
      cancelFn() {
        this.$router.push('/main');
      },
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        this.fileList.push(file);

        var base64Img = file.content;
        let params = getPostData("uploadWarningImgs", [base64Img]);

        this._getInfo({
          ops: params,
          method: "post",
          api: "uploadWarningImgs",
          callback: res => {
            var div = document.createElement("div");
            div.innerHTML = res;
            var imgSrc = div.querySelector("return").innerHTML;
            //   console.log(imgSrc, 999);
            this.objData.ImageNameList.push(imgSrc);
          }
        })

      },
      deleteFn(delFile) {
        this.fileList.forEach((item, index) => {
          if(item.file.name === delFile.file.name) {
            this.fileList.splice(index, 1);
            this.objData.ImageNameList.splice(index, 1);
          }
        })
      },
      refrashFn() {
        // this.objData.dispatchPoliceID = this.$route.params.dispatchId;
        // this.objData.verifyPersonID = getLoc('userInfo').userID;
      }
    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
  .list {
    .cell-wrap {
      .van-cell-group {
        .van-cell {
          &:last-child {
            display: block !important;
            &.van-cell__value {
              textarea {
                width: 100% !important;
              }
            }
          }
        }
      }
      .loader-wrap {
        padding: 0.1rem 0.23rem;
        text-align: left;
        h3 {
          color: #323233;
          font-size: 14px;
          height: 0.6rem;
          line-height: 0.6rem;
        }
      }
      .footer-btn {
        padding: 0.1rem 0.16rem;
        button {
          margin-right: 0.2rem;
        }
      }
    }
  }
</style>
<style>
  #textarea {
    color: #969799;
  }
</style>