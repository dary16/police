<template>
  <keep-alive>
    <div class="about">
      <v-header :title="title"></v-header>
      <div class="content">
        <div class="img">
          <div
            class="noImg"
            v-if="length === 0"
          >
            <img src="../../assets/noimg.jpg"/>
          </div>
            <van-swipe
              :autoplay="3000"
              indicator-color="black"
            >
              <van-swipe-item
                v-for="(image, index) in images"
                :key="index"
              >
                <van-image
                  :src="image"
                  v-lazy="image"
                  @click="swiperImgClick()"
                />
              </van-swipe-item>
            </van-swipe>
          </div>
          <div class="address clearfix">
            <div class="left fl">
              <img src="../../assets/point.png" alt="">
        </div>
              <div class="right fl">
                <h3>告警地点</h3>
                <h5>{{objData.address}}，标桩号：{{objData.num}}，预置位：{{objData.preAdd}}</h5>
              </div>
            </div>
            <div class="btns">
              <van-button
                color="#0ab5bd"
                size="small"
                @click="toPoint"
              >导航至报警点</van-button>
              <van-button
                color="#e8433f"
                size="small"
                @click="commitFn"
              >结果反馈</van-button>
            </div>
          </div>
        </div>
  </keep-alive>
</template>

<script>
  import { getPostData, getParams, getLoc, setLoc } from "../../utils/common.js";
  import { mapActions, mapMutations, mapState } from "vuex";
  import { ImagePreview } from 'vant';
  export default {
    data() {
      return {
        title: '图集',
        length: 0,
        warningID: '',
        dispatchId: '',
        objData: {
          address: "西青区天津西琉城",
          num: "34",
          preAdd: "2"
        },
        mapData: {},
        images: []
      }
    },
    computed: {
      ...mapState(['disptId', 'warnId'])
    },
    created() {
      //保存所需id
      this.warningID = this.warnId;
      this.dispatchId = this.disptId;
      //获取数据
      //   this.getListdata();
    },
    mounted() {
    },
    methods: {
      ...mapMutations(['_warningid']),
      ...mapActions(['_getInfo']),
      getListdata() {
        this.images = [];

        const params = getPostData("findWarningInfo", [this.warningID]);
        this._getInfo({
          ops: params,
          method: "post",
          api: "findWarningInfo",
          callback: res => {
            var div = document.createElement("div");
            div.innerHTML = res;
            var curUserinfo = JSON.parse(div.querySelector("return").innerHTML);

            this.mapData = curUserinfo.warningDTO;
            console.log(curUserinfo);
            this.objData.address = curUserinfo.warningDTO.warningAddress;
            this.objData.num = curUserinfo.warningDTO.stakeNO;
            this.objData.preAdd = curUserinfo.warningDTO.presetno;
            this.length = curUserinfo.warningImgList.length;

            if(curUserinfo.warningImgList.length > 1) {
              curUserinfo.warningImgList.forEach(item => {
                let params2 = getPostData("findWarningInfo", [this.warningID, item.warningRefID]);
                this._getInfo({
                  ops: params2,
                  methods: "post",
                  api: "findWarningInfo",
                  callback: res => {
                    var div = document.createElement("div");
                    div.innerHTML = res;
                    let imgItem = JSON.parse(div.querySelector("return").innerHTML);
                    this.images.push(imgItem.imgPath);
                  }
                })
              });

            } else if(curUserinfo.warningImgList.length === 1) {
              this.images.push(curUserinfo.imgPath);
            } else {
              this.images = [];
            }
          }
        });
      },
      toPoint() {
        this.$router.push({ name: 'map', params: { mapData: this.mapData } });
      },
      commitFn() {
        this.checkFn();
      },
      //点击查看图片
      swiperImgClick() {
        ImagePreview(this.images);
      },
      checkFn() {
        //检查是否已经被回执
        let params = getPostData("checkIsReceipt", [this.warningID]);
        this._getInfo({
          ops: params,
          method: "post",
          api: "checkIsReceipt",
          callback: res => {
            var div = document.createElement("div");
            div.innerHTML = res;
            var result = div.querySelector("return").innerHTML;
            if(result === 'true') {
              //已回执，去查看
              console.log('已回执');
              this.$router.push({ name: 'finishedDetails', params: { dispatchId: this.dispatchId } });
            } else if(result === 'false') {
              //未回执，去回执
              //准备添加数据
              //   this.prepareAddData();
              this.$router.push({ name: 'result', params: { dispatchId: this.dispatchId } });
            }
          }
        })
      },
      prepareAddData() {
        let params = getPostData("checkIsReceipt", [this.dispatchId]);
        this._getInfo({
          ops: params,
          method: "post",
          api: "preAddDispatchPolice ",
          callback: res => {
            var div = document.createElement("div");
            div.innerHTML = res;
            var result = div.querySelector("return").innerHTML;
          }
        })
      }
    },
    updated() {
    },
  }
</script>

<style lang='less' scoped>
  .about {
    .content {
      margin: 0.3rem 0.44rem;
      .address {
        position: relative;
        padding: 0.4rem;
        display: flex;
        .left {
          width: 1.2rem;
          img {
            width: 1rem;
            height: 1rem;
          }
        }
        .right {
          flex: 1;
          padding-top: 0.12rem;
          h3 {
            font-size: 0.3rem;
            color: #000;
            font-weight: bold;
            text-align: left;
          }
          h5 {
            text-align: left;
            font-size: 0.26rem;
            color: #929292;
          }
        }
      }
      .address::before {
        background-color: #ebedf0;
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0.02rem;
      }
      .address::after {
        background-color: #ebedf0;
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0.02rem;
      }
      .btns {
        margin: 0.2rem 0.35rem;
        button {
          margin-right: 0.1rem;
        }
      }
    }
  }
</style>
