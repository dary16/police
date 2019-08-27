<template>
  <div class='list'>
    <v-header :title="title"></v-header>
    <v-title :content="content"></v-title>
    <div>
      <van-cell-group>
        <van-field
          v-model="objData.address"
          required
          clearable
          label="项目位置:"
          placeholder="（必填）项目位置"
        />

        <van-field
          v-model="objData.number"
          type="number"
          label="项目编号:"
          placeholder="（必填）项目编号"
          required
        />

        <van-field
          v-model="objData.name"
          required
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
          required
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
            v-model="currentDate_end"
            type="datetime"
            @cancel="chooseTime = false"
            @confirm="chooseTime = false"
            @change="timeChange"
          />
        </van-popup>

        <van-field
          v-model="objData.structure"
          required
          clearable
          label="建筑结构:"
          placeholder="（必填）建筑结构"
        />

        <van-field
          v-model="objData.progress"
          required
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
      </van-cell-group>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      //这里存放数据
      return {
        title: '派警回执',
        content: '派警回执（处理中）',
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
        currentDate_end: ''
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
      timeChange(e) {
        let timeArr = e.getValues();
        this.objData.time = `${timeArr[0]}-${timeArr[1]}-${timeArr[2]} ${timeArr[3]}:${timeArr[4]}`;
        console.log(this.objData.time);
      }
    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
</style>