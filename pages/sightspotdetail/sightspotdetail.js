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
    kandian:"",
    ticketId:'1'
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
          kandian: netdata.data.kandian,
          ticketId:'1'
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
  },
  more:function(){
    wx.navigateTo({
      url: '/pages/commentlist/commentlist?id=' + this.data.spotId,
    })
  },
  gotoPay:function(){
    let ticketId = this.data.ticketId
    let ticketPrice = "10"
    wx.navigateTo({
      url: '../../pages/ticketpayinfo/ticketpayinfo?id=' + ticketId + '&price=' + ticketPrice
    });
  }

})
