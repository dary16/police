<template>
  <div class='list'>
    <v-header :title="title"></v-header>
    <div class="content">
      <van-loading
        color="#1989fa"
        v-show="notFinish"
      />
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
              v-for="(image, index) in objData.images"
              :key="index"
            >
              <van-image
                :src="image"
                fit="contain"
                v-lazy="image"
                class="fixedHeight"
                @click="swiperImgClick()"
              />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="address clearfix">
          <van-cell-group>
            <van-field
              v-model="objData.content"
              id="textarea"
              label="告警内容:"
              type="text"
              label-width="100%"
              label-align="left"
              readonly
              autosize
            />

          </van-cell-group>
        </div>
      </div>
    </div>
</template>

<script>
  import { getPostData, getParams } from '@/utils/common.js';
  import { mapActions, mapState } from 'vuex';
  import { ImagePreview } from 'vant';

  export default {
    data() {
      //这里存放数据
      return {
        title: '派警回执（已处理）',
        dispatchId: '',
        photoName: '',
        chooseTime: false,
        length: 2,
        objData: {
          content: '',
          images: []
        },
        notFinish: false
      };
    },
    props: [],
    //监听属性 类似于data概念
    computed: {
      ...mapState(['disptId'])
    },
    //监控data中的数据变化
    watch: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.notFinish = true;
      if(this.$route.params.dispatchId) {
        this.dispatchId = this.$route.params.dispatchId;
      } else {
        this.dispatchId = this.disptId;
      }
      this.init();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    //方法集合
    methods: {
      ...mapActions(['_getInfo']),
      init() {
        const params = getPostData('viewDispatchPolice ', [this.dispatchId, this.photoName]);
        this._getInfo({
          ops: params,
          method: 'post',
          api: 'viewDispatchPolice',
          callback: res => {
            var div = document.createElement("div");
            div.innerHTML = res;
            let data = JSON.parse(div.querySelector("return").innerHTML);
            this.objData.content = data.dispatchPoliceDTO.verifyContent;
            this.length = data.dispatchPolicePhotoList.length;

            if(this.length > 1) {
              data.dispatchPolicePhotoList.forEach(item => {
                let params2 = getPostData("viewDispatchPolice", [this.dispatchId, item]);
                this._getInfo({
                  ops: params2,
                  methods: "post",
                  api: "viewDispatchPolice",
                  callback: res => {
                    var div = document.createElement("div");
                    div.innerHTML = res;
                    let imgItem = JSON.parse(div.querySelector("return").innerHTML);
                    this.objData.images.push(imgItem.imgPath);
                    this.notFinish = false;
                  }
                })
              });
            } else if(this.length === 1) {
              this.objData.images.push(data.dispatchPolicePhotoList);
            } else {
              this.images = [];
            }
          }
        });
      },
      swiperImgClick() {
        ImagePreview(this.objData.images);
      }
    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
  .content {
    margin: 0.3rem 0.44rem;
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
    .img {
      height: 5rem;
    }
    .address {
      padding: 0.4rem 0 0;
      .left {
        width: 1.2rem;
        img {
          width: 1rem;
          height: 1rem;
        }
      }
      .van-cell {
        padding: 0.266667rem 0;
      }
    }
    #textarea {
      color: #969799;
    }
  }
</style>