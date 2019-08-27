<template>
  <div class="about">
    <v-header :title="title"></v-header>
    <v-title :content="content"></v-title>
    <div class="content">
      <div class="img">
        <img src="../assets/testImg.jpg"/>
        </div>
        <div class="address clearfix">
          <div class="left fl">
            <van-icon
              size="50px"
              name="location-o"
            />
          </div>
          <div class="right fl">
            <h3>告警地点</h3>
            <h5>建国社区</h5>
          </div>
        </div>
        <div class="btns">
          <van-button
            color="#0ab5bd"
            size="small"
          >导航至报警点</van-button>
          <van-button
            color="#e8433f"
            size="small"
            @click="commitFn"
          >结果反馈</van-button>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '查看告警',
        content: '图集'
      }
    },
    mounted() {
      //   this.initMap();
    },
    methods: {
      initMap() {
        // 百度地图API功能
        var map = new BMap.Map("map");    // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
        //添加地图类型控件
        map.addControl(new BMap.MapTypeControl({
          mapTypes: [
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
          ]
        }));
        map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      },
      commitFn() {
        this.$router.push('/list');
      }
    }
  }
</script>

<style lang='less' scoped>
  .about {
    .content {
      margin: 0.3rem 0.44rem;
      .img {
        margin-bottom: 1rem;
      }
      .address {
        border-top: 1px solid #979596;
        border-bottom: 1px solid #979596;
        padding: 0.4rem;
        .left {
          width: 1.2rem;
        }
        .right {
          padding-top: 0.12rem;
          h3 {
            font-size: 0.3rem;
            color: #000;
            font-weight: bold;
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
