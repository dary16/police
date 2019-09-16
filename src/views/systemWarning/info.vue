<template>
  <div class="about">
    <v-header
      :title="title"
      v-on:refrash="refrashFn"
    ></v-header>
    <div class="content">
      <div class="img">
        <div
          class="noImg"
          v-if="length === 0"
        >暂无图片</div>
        <van-swipe
          :autoplay="3000"
          indicator-color="black"
        >
          <van-swipe-item
            v-for="(image, index) in images"
            :key="index"
          >
            <img :src="image" />
            </van-swipe-item>
        </van-swipe>
      </div>
      <div class="address clearfix">
        <div class="left fl">
          <img src="../../assets/point.png" alt="">
        </div>
          <div class="right fl">
            <h3>防区侵入告警地点</h3>
            <h5>{{address}}</h5>
          </div>
        </div>
        <div class="btns">
          <van-button
            plain
            color="#333"
            size="small"
            @click="toPolice"
          >派警</van-button>
          <van-button
            color="#0ab5bd"
            size="small"
            @click="toPoint"
          >识别正确不派警</van-button>
          <van-button
            color="#FFBC09"
            size="small"
            @click="commitFn"
          >识别错误</van-button>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { getPostData, getParams } from "../../utils/common.js";
  export default {
    data() {
      return {
        title: '图集',
        length: 0,
        warningID: '',
        address: '',
        mapData: {},
        images: []
      }
    },
    computed: {
    },
    created() {
      this.getListdata();
    },
    mounted() {
    },
    methods: {
      ...mapActions(['_getInfo']),
      getListdata() {
        this.images = [];
        if(this.$route.params.warningID) {
          this.warningID = this.$route.params.warningID;
        }

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
            this.address = curUserinfo.warningDTO.warningAddress;
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
                    this.images.push('data:image/jpeg;base64,' + imgItem.imgPath);
                  }
                })
              });
            } else if(curUserinfo.warningImgList.length === 1) {
              this.images.push('data:image/jpeg;base64,' + curUserinfo.imgPath);
            }
          }
        });
      },
      toPoint() {
        this.$router.push({ name: 'map', params: { mapData: this.mapData } });
      },
      toPolice() {
        this.$router.push({ name: 'selectPerson', params: {} });
      },
      commitFn() {
        this.$router.push('/dispatchList');
      },
      refrashFn() {
        // this.getListdata();
      }
    },
    updated() {
    },
  }
</script>

<style lang='less' scoped>
  .about {
    .content {
      margin: 0.3rem 0;
      .img {
        // margin-bottom: 1rem;
        .noImg {
          margin: 1rem auto;
        }
      }
      .address {
        border-top: 1px solid #979596;
        border-bottom: 1px solid #979596;
        padding: 0.4rem;
        .left {
          width: 1.2rem;
          img {
            width: 1rem;
            height: 1rem;
          }
        }
        .right {
          padding-top: 0.12rem;
          h3 {
            font-size: 0.3rem;
            color: #000;
            font-weight: bold;
          }
          h5 {
            font-size: 0.26rem;
            color: #929292;
          }
        }
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
