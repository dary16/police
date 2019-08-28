<template>
  <div class='list'>
    <v-header :title="title"></v-header>
    <div class="cell-wrap">
      <van-cell-group>
        <van-field
          v-model="objData.address"
          clearable
          label="项目位置:"
          placeholder="（必填）项目位置"
        />

        <van-field
          v-model="objData.number"
          type="number"
          label="项目编号:"
          placeholder="（必填）项目编号"
        />

        <van-field
          v-model="objData.name"
          clearable
          label="项目名称:"
          placeholder="（必填）项目名称"
        />

        <v-van-field-select
          v-model="objData.unit"
          label="用地单位:"
          placeholder="（必填）请选择"
          :columns="['行政处罚','刑事处罚','行政处分']"
        />

        <van-field
          v-model="objData.area"
          clearable
          label="占地面积(㎡):"
          placeholder="（必填）占地面积"
        />

        <van-field
          v-model="objData.time"
          label="开工时间:"
          placeholder="（必填）选择时间"
          readonly
          @click="chooseTime = true"
        />
        <van-popup
          v-model="chooseTime"
          label="开工时间"
          position="bottom"
          :overlay="true"
        >
          <van-datetime-picker
            v-model="currentTime"
            type="datetime"
            :max-date="currentTime"
            :formatter="formatter"
            @cancel="chooseTime = false"
            @confirm="confirmFn"
            @change="timeChange"
          />
        </van-popup>

        <van-field
          v-model="objData.structure"
          clearable
          label="建筑结构:"
          placeholder="（必填）建筑结构"
        />

        <van-field
          v-model="objData.progress"
          clearable
          label="建筑进度:"
          placeholder="（必填）建筑进度"
        />

        <v-van-field-select
          v-model="objData.breakRule"
          label="违法性质:"
          placeholder="（必填）请选择"
          :columns="['未报即用','边报边用']"
        />

        <v-van-field-select
          v-model="objData.methods"
          label="已采取措施:"
          placeholder="（必填）请选择"
          :columns="['事业单位','个人']"
        />

        <van-field
          v-model="objData.infoContent"
          id="textarea"
          label="是否符合土地利用总体规划:"
          type="textarea"
          placeholder="请填写具体内容"
          rows="1"
          label-width="100%"
          label-align="left"
          autosize
        />

      </van-cell-group>

      <div class="loader-wrap">
        <h3>现场照片</h3>
        <van-uploader
          v-model="fileList"
          multiple
          :after-read="afterRead"
        />
      </div>
      <div class="footer-btn">
        <van-button
          color="#0ab5bd"
          size="small"
          @click="commitFn"
        >提交</van-button>
        <van-button
          color="#e8433f"
          size="small"
          @click="cancelFn"
        >关闭</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '../utils/common.js';
  export default {
    data() {
      //这里存放数据
      return {
        title: '派警回执（处理中）',
        objData: {
          address: '',
          number: '',
          name: '',
          unit: '',
          area: '',
          time: '',
          structure: '',
          progress: '',
          breakRule: '',
          methods: '',
          infoContent: '',
          url: ''
        },
        chooseTime: false,
        currentDate_end: '',
        currentTime: new Date(),
        fileList: [
          { url: 'https://img.yzcdn.cn/vant/cat.jpeg' }
          // Uploader 根据文件后缀来判断是否为图片文件
          // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        ]
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
    mounted() {

    },
    //方法集合
    methods: {
      confirmFn(e) {
        let time = formatDate(e.getTime(), 3);
        console.log(time);
        this.objData.time = time;
        this.chooseTime = false;
      },
      timeChange(e) {
        let timeArr = e.getValues();
        this.objData.time = `${timeArr[0]}-${timeArr[1]}-${timeArr[2]} ${timeArr[3]}:${timeArr[4]}`;
        console.log(this.objData.time);
      },
      //文字进行格式化处理
      formatter(type, value) {
        if(type === "year") {
          return `${value}年`
        } else if(type === "month") {
          return `${value}月`
        } else if(type === "day") {
          return `${value}日`
        } else if(type === "hour") {
          return `${value}时`
        } else if(type === "minute") {
          return `${value}分`
        }
        return value;
      },
      //提交
      commitFn() {
        console.log(this.objData);
      },
      //关闭
      cancelFn() {
        this.$router.back(-1);
      },
      afterRead(file) {
        console.log(file);
      }
    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
  .list {
    .cell-wrap {
      position: fixed;
      top: 46px;
      left: 0;
      bottom: 0;
      right: 0;
      overflow-y: auto;
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
        padding: 0.1rem 0.36rem;
        text-align: left;
        h3 {
          color: #323233;
          font-size: 14px;
          height: 0.6rem;
          line-height: 0.6rem;
        }
      }
      .footer-btn {
        padding: 0.3rem 0.36rem;
        button {
          margin-right: 0.2rem;
        }
      }
    }
  }
</style>