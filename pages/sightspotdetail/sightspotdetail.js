var network_util = require('../../utils/network_util.js');
//获取应用实例
const app = getApp()
Page({
  data: {
    spotId:"-1" ,
    name:"" ,
    image:"",
    intro:"",
    traffic:"",
    gaikuang:"",
    kandian:""
  },
  onLoad: function (option) {
    this.data.spotId = option.id;
    this.getSpotdetail(this.data.spotId) 
  },
  getSpotdetail: function (spotId){
    var that = this ;
    network_util._post1('Api/scenicDetail', {
      sid: that.data.spotId
    },
      function (netdata) {
        wx.setNavigationBarTitle({
          title: netdata.data.name
        });
        let picUrl = network_util.BASE_PIC_URL + netdata.data.image;
        that.setData({
          name: netdata.data.name,
          image: picUrl,
          intro: netdata.data.intro,
          traffic: netdata.data.traffic,
          gaikuang: netdata.data.gaikuang,
          kandian: netdata.data.kandian
        });
      },
      function (res) {
        console.log(res);
      })
  },
  gotoComment:function(){
    wx.navigateTo({
      url: '/pages/comment/comment?id=' + this.data.spotId ,
    })
  }
})
