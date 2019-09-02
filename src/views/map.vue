<template>
  <div class='map'>
    <v-header :title="title"></v-header>
    <div id="container" :class="active"></div>
    <div class="info" v-if="isShowPointInfo">{{name}}<van-button plain hairline type="primary" @click="showMapAppList">查看导航</van-button></div>
    <div class="mapAppList" v-if="isShowMapApp">
      <ul>
        <li v-for="(i,index) in mapAppList" :key="index" @click="navFn(i.name)">{{i.title}}</li>
      </ul>
    </div>
    <van-overlay
      :show="isShowMapApp"
      @click="isShowMapApp = false"
    />
  </div>
</template>
<script>
import {
    openMapApp
} from '../utils/browser.js';
  export default {
    data() {
      //这里存放数据
      return {
        title: '地图',
        name:'',
        active:'',
        index:'0',
        isShowPointInfo:false,
        isShowMapApp:false,
        list:[{
          lon:108.95217,
          lat:34.262726,
          name:"预置位1"
        },{
          lon:108.952295,
          lat:34.261495,
          name:"预置位2"
        },{
          lon:108.952753,
          lat:34.260302,
          name:"预置位3"
        }],
        mapAppList:[{
          name:'baidumap',
          title:"百度地图",
          status:false
        },{
          name:'amap',
          title:"高德地图",
          status:false
        },{
          name:'qqmap',
          title:"腾讯地图",
          status:false
        }]
      };
    },
    props: [],
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
      this.init();
    },
    //方法集合
    methods: {
      init() {
        //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
        //设置地图中心点
        var myLatlng = new qq.maps.LatLng(34.260302,108.952295);
        //定义工厂模式函数
        var myOptions = {
          zoom: 16,               //设置地图缩放级别
          center: myLatlng,      //设置中心点样式
          mapTypeId: qq.maps.MapTypeId.ROADMAP  //设置地图样式详情参见MapType
        };
        //获取dom元素添加地图信息
        var map = new qq.maps.Map(document.getElementById("container"), myOptions);    
        var lists = this.list;
        for(var i=0;i<lists.length;i++){
          ((n)=>{
            var myLatlng = new qq.maps.LatLng(lists[n].lat,lists[n].lon);
            var curName = lists[n].name;
            var marker = new qq.maps.Marker({
              position:myLatlng ,
              map:map
            });
            qq.maps.event.addListener(marker, 'click', ()=> {
              this.name = curName;
              this.index = n;
              this.active = "active";
              this.isShowPointInfo = true;
            })
          })(i);
        }
      },
      showMapAppList(){
        this.isShowMapApp =true;
      },
      navFn(name){
        openMapApp(this.list[this.index].lat,this.list[this.index].lon,"");
        this.isShowMapApp =false;
      }
    },
    updated() { }, //生命周期 - 更新之后
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang='less' scoped>
.map{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .mapAppList{
      position: absolute;
      top: 45%;
      left: 50%;
      width: 85%;
      background-color: #fff;
      border-radius: 4px;
      -webkit-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
      backface-visibility: hidden;
      -webkit-transition: 0.3s;
      transition: 0.3s;
      z-index: 2042;
      ul{
        li{
          text-align: left;
          line-height: 0.6rem;
          margin:0 0.1rem;
          padding: 0 0.1rem;
          border-bottom: 1px solid #e2e2e2;
        }
        li:last-child{
          border-bottom: none;
        }
        li:active{
          background-color: #eee;
        }
      }
    }
}
#container{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}
#container.active{
  bottom: 0.5rem;
}
.info{
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height:0.5rem;
  background-color: #fff;
  border-top: 1px solid #eee;
  line-height: 0.5rem;
  text-align: left;
  padding-left: 0.2rem;
  .van-button{
    float: right;
    margin: 0.06rem;
    height: 0.38rem;
    line-height: 0.36rem;
    border-radius: 4px;
  }
}
</style>