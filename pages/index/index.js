//index.js
const network_util = require('../../utils/network_util.js');
const config = require('../../config');
//获取应用实例
const app = getApp()
const curUserInfo = app.globalData.userInfo
Page({
  data: {
    userInfo: curUserInfo,
    //轮播图
    imgUrls: [
      
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    //公告内容
    notice: "",
  },
  onLoad: function() {
    wx.authorize({
      scope: "scope.userInfo"
    })
    this.getHomeData()
  },
  //获取首页数据
  getHomeData: function() {
    var that = this;
    network_util._post1(config.articleSlide, {},
      function (netdata) {
        var newarray = netdata.data.map(function (item, index, input) {
          return (network_util.BASE_PIC_URL + item.image);
        })
        that.setData({
          'imgUrls': newarray
        })
      })
    network_util._post1(config.articleNotificationUrl, {
      page: 0,
      page_size: 1
    },
      function (netdata) {
        if (netdata.data[0].title != undefined) {
          that.setData({
            'notice': netdata.data[0].title,
          })
        }
      })
  },
  //公告列表
  select_notice: function() {
    wx.navigateTo({
      url: '../noticelist/noticelist',
    })
  },
  gotoMineComment: function() {
    wx.showToast({
      title: '功能开发中，敬请期待！',
      icon: 'none'
    })
    // if (curUserInfo.isGuest) {
    //   this.gotologin();
    //   return;
    // }
    // wx.navigateTo({
    //   url: '../commentlist/commentlist',
    // })
  },
  mypublish: function() {
    wx.showToast({
      title: '功能开发中，敬请期待！',
      icon: 'none'
    })
  },
  gotoMineTrace: function() {
    if (curUserInfo.isGuest) {
      this.gotologin();
      return;
    }
    wx.navigateTo({
      url: '../mytrace/mytrace',
    })
  },
  gotoMineTicketFolder: function() {
    if (curUserInfo.isGuest) {
      this.gotologin();
      return;
    }
    wx.navigateTo({
      url: '../myticketfolder/myticketfolder',
    })
  },
  //选择年票
  select_ticket: function() {
    wx.navigateTo({
      url: '../ticket/ticket',
    })
  },
  commTicket: function() {
    wx.showToast({
      title: '功能开发中，敬请期待！',
      icon: 'none'
    })
  },
  stay: function() {
    wx.showToast({
      title: '功能开发中，敬请期待！',
      icon: 'none'
    })
  },
  game: function() {
    wx.showToast({
      title: '功能开发中，敬请期待！',
      icon: 'none'
    })
  },
  //选择年票问答
  select_ticket_question: function() {
    wx.navigateTo({
      url: '../question/question',
    })
  },
  onTabItemTap: function(item) {

  },
  gotologin: function() {

    const that = this;
    wx.showModal({
      content: "请先登录",
      confirmText: "确定",
      cancelText: "取消",
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../userlogin/userlogin',
          })
        }
      }
    })
  },
  onShow: function() {
    this.setData({
      userInfo: curUserInfo, //用户
    })
  }

})