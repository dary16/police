<template>
  <div class='main'>
    <v-header
      :title="title"
      :isShow="isShow"
    ></v-header>
    <van-tabs
      v-model="active"
      swipeable
      background="#f0f0f0"
      @click="tabFn"
    >
      <van-tab title="未完成">
        <v-list-item
          v-if="showUnfinished"
          :items="unfinished"
          :infoFn="infoFn"
          v-on:infoIdFn="infoIdFn"
        ></v-list-item>
        <div
          v-else
          class="nodata"
        >暂无数据</div>
      </van-tab>
      <van-tab title="已完成">
        <v-list-item
          v-if="showFinished"
          :items="finished"
          v-on:infoIdFn="infoFnFinished"
        ></v-list-item>
        <div
          v-else
          class="nodata"
        >暂无数据</div>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
  import { getPostData, getParams, getLoc, setLoc } from "../utils/common.js";
  import { mapActions, mapMutations, mapState } from "vuex";
  export default {
    data() {
      //这里存放数据
      return {
        title: "派警列表",
        unfinished: [
          {
            address: "西青区天津西琉城",
            dispatchId: "e3df1084-79f0-484d-ad32-80aa7a59dcfd",
            id: "07752d8d-e49e-4e69-939a-f606e3e7b41a",
            info: "发现",
            infoTitle: "",
            presetNo: "2",
            stakeNO: "34",
            time: "2019-04-29 00:09:34",
            title: "监控预警提醒",
          }, {
            address: "西青区天津西琉城",
            dispatchId: "b74062f4-0cc7-445e-b402-9fd7b39cb854",
            id: "0cc5386a-488b-4730-b817-ceb2a8effb09",
            info: "发现",
            infoTitle: "",
            presetNo: "2",
            stakeNO: "34",
            time: "2019-04-21 00:09:34",
            title: "监控预警提醒",
          }, {
            address: "西青区天津西琉城",
            dispatchId: "1e29fb08-9f41-4bd9-b0f5-b57503ad0f1e",
            id: "0fb238cf-8a56-4aa1-b8b4-b841d8e2b596",
            info: "发现",
            infoTitle: "",
            presetNo: "2",
            stakeNO: "34",
            time: "2019-04-25 00:09:34",
            title: "监控预警提醒",
          }, {
            address: "西青区天津西琉城",
            dispatchId: "30517215-0397-484f-8526-ae4e268456fa",
            id: "b110eaf5-f648-4f11-b6d2-d49806fed5eb",
            info: "发现",
            infoTitle: "",
            presetNo: "2",
            stakeNO: "34",
            time: "2019-04-18 00:09:34",
            title: "监控预警提醒",
          }],
        finished: [
          {
            address: "滨海新区新区101号",
            dispatchId: "4db11b02-dc5c-413b-84e2-a559e6d16014",
            id: "bd8cd32c9b3c46fe9870e91555799554",
            info: "发现",
            infoTitle: "",
            presetNo: "282",
            stakeNO: "12",
            time: "2019-05-24 14:48:00",
            title: "监控预警提醒",
          },
          {
            address: "西青区天津西琉城",
            dispatchId: "2e28d36c-a07f-48ea-bba5-9e9a8da50684",
            id: "b110eaf5-f648-4f11-b6d2-d49806fed",
            info: "发现",
            infoTitle: "",
            presetNo: "2",
            stakeNO: "34",
            time: "2019-08-09 00:09:34",
            title: "监控预警提醒",
          },
          {
            address: "碑林区钟楼",
            dispatchId: "52ae7c10-0864-4b09-b211-e91cd625a87e",
            id: "2496a5a4-7c82-486e-99ca-ae17c86cc60f",
            info: "发现",
            infoTitle: "",
            presetNo: "2",
            stakeNO: "34",
            time: "2019-07-22 18:39:45",
            title: "监控预警提醒",
          }
        ],
        showUnfinished: false,
        showFinished: false,
        id: '',
        infoId: '',
        isShow: "hide",
        active: 0
      };
    },
    props: [],
    //监听属性 类似于data概念
    computed: {
      ...mapState(['activeIndex'])
    },
    //监控data中的数据变化
    watch: {},
    //生命周期 - 创建完成（可以访问当前this实例） 
    created() {
      this.active = this.activeIndex;
      //初始化数据
      //   this.initUnfinishedData();
      //   this.initFinishedData();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    //方法集合
    methods: {
      ...mapMutations(['_userInfo', '_warnId', '_disptId', '_activeIndex']),
      ...mapActions(['_getInfo']),
      infoFn() {
        this.$router.push('/unfinishedDetails');
      },
      infoIdFn(val) {
        let warnId = val.id;
        let dispId = val.dispatchId;
        this._warnId(val.id);
        this._disptId(val.dispatchId);
        this.$router.push('/unfinishedDetails');
      },
      //详情
      infoFnFinished(val) {
        this.infoId = val.dispatchId;
        this.$router.push({ name: 'finishedDetails', params: { dispatchId: this.infoId } });
      },
      //未完成
      initUnfinishedData() {
        //提交数据
        const params = getPostData("findDispatchPolice", [
          getLoc('userInfo').userID,
          '已派警'
        ]);

        this._getInfo({
          ops: params,
          method: "post",
          api: "dispatchPolice",
          callback: res => {
            var div = document.createElement("div");
            div.innerHTML = res;
            var listInfoData = div.querySelector("return").innerHTML;
            if(listInfoData != "[]") {
              listInfoData = JSON.parse(listInfoData);
              this.showUnfinished = true;
              this.unfinished = [];
              for(var i = 0; i < listInfoData.length; i++) {
                var newdata = {
                  id: listInfoData[i].warningID,
                  dispatchId: listInfoData[i].dispatchPoliceID,
                  title: "监控预警提醒",
                  time: listInfoData[i].warningTime,
                  info: "发现" + listInfoData[i].warningStatusLabel,
                  infoTitle: listInfoData[i].warningStatusLabel,
                  stakeNO: listInfoData[i].stakeNO,
                  presetNo: listInfoData[i].presetno,
                  address: listInfoData[i].warningAddress
                }
                this.unfinished.push(newdata);
              }
            } else {
              this.showUnfinished = false;
            }
          }
        });
      },
      //已完成
      initFinishedData() {
        //提交数据
        const params = getPostData("findDispatchPolice", [
          getLoc('userInfo').userID,
          '已回执'
        ]);

        this._getInfo({
          ops: params,
          method: "post",
          api: "dispatchPolice",
          callback: res => {
            var div = document.createElement("div");
            div.innerHTML = res;
            var listInfoData = div.querySelector("return").innerHTML;
            if(listInfoData != "[]") {
              listInfoData = JSON.parse(listInfoData);
              this.showFinished = true;
              this.finished = [];
              for(var i = 0; i < listInfoData.length; i++) {
                var newdata = {
                  id: listInfoData[i].warningID,
                  dispatchId: listInfoData[i].dispatchPoliceID,
                  title: "监控预警提醒",
                  time: listInfoData[i].warningTime,
                  info: "发现" + listInfoData[i].warningStatusLabel,
                  infoTitle: listInfoData[i].warningStatusLabel,
                  stakeNO: listInfoData[i].stakeNO,
                  presetNo: listInfoData[i].presetno,
                  address: listInfoData[i].warningAddress
                }
                this.finished.push(newdata);
              }
            } else {
              this.showFinished = true;
            }
          }
        });
      },
      tabFn(val) {
        this.active = val;
        this._activeIndex(val);
      }
    },
    updated() {
      this.active = this.activeIndex;
    },
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
      .nodata {
        position: absolute;
        bottom: 1rem;
        text-align: center;
        color: #999;
        left: 50%;
        width: 1rem;
        margin-left: -0.5rem;
      }
    }
  }
</style>
