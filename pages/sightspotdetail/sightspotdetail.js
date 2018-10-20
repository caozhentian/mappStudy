var network_util = require('../../utils/network_util.js');
//获取应用实例
const app = getApp()
Page({
  data: {
    spotId: "-1",
    name: "",
    image: "",
    intro: "",
    traffic: "",
    gaikuang: "",
    kandian: "",
    ticketId: '1',
    ticketPrice: '',
    comment: '',
    mobile: '',
    pubtime: '',
    rate:5,
    isShowComment:false 
  },
  onLoad: function(option) {
    this.data.spotId = option.id;
  },
  onShow: function() {
    this.getSpotdetail(this.data.spotId)
  },
  getSpotdetail: function(spotId) {
    var that = this;
    network_util._post1('Api/scenicDetail', {
        sid: that.data.spotId
      },
      function(netdata) {
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
          ticketId: netdata.data.tid,
          ticketPrice: netdata.data.price,

        });
        if (netdata.data.comment != null) { //存在评论
          that.setData({
            comment: netdata.data.comment,
            mobile: netdata.data.mobile,
            pubtime: netdata.data.pubtime,
            rate: netdata.data.level ,
            isShowComment:true
          })
        }
        else{
          that.setData({
            isShowComment: false
          })
        }
      },
      function(res) {
        console.log(res);
      })
  },
  gotoComment: function() {
    wx.navigateTo({
      url: '/pages/comment/comment?id=' + this.data.spotId,
    })
  },
  more: function() {
    wx.navigateTo({
      url: '/pages/commentlist/commentlist?id=' + this.data.spotId,
    })
  },
  gotoPay: function() {
    let ticketId = this.data.ticketId;
    let ticketPrice = this.data.ticketPrice;
    wx.navigateTo({
      url: '../../pages/ticketpayinfo/ticketpayinfo?id=' + ticketId + '&price=' + ticketPrice
    });
  }

})