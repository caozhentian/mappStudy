//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo') ,
    //轮播图
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    //公告内容
    notice: "国庆节，景点大优惠。大家赶紧来看啊！高速随便走，走告诉免费" ,
    visible:false,
  },
  //公告列表
  select_notice:function(){
    wx.navigateTo({
      url: '../noticelist/noticelist',
    })
  },
  gotoMineComment:function(){
    if (app.globalData.member_id == -1){
      this.gotologin();
      return ;
    }
    wx.navigateTo({
      url: '../commentlist/commentlist',
    })
  },
  gotoMineComment2: function () {

  },
  gotoMineTrace: function () {
    if (app.globalData.member_id == -1) {
      this.gotologin();
      return;
    }
    wx.navigateTo({
      url: '../mytrace/mytrace',
    })
  },
  gotoMineTicketFolder: function () {

  },
  //选择年票
  select_ticket: function() {
    wx.navigateTo({
      url: '../ticket/ticket',
    })
  },
  //选择年票问答
  select_ticket_question: function () {
    wx.navigateTo({
      url: '../question/question',
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onTabItemTap: function(item) {
    
  },
  gotologin:function(){
    this.setData({
      visible:true
    })
  },
  handleOK() {
    this.setData({
      visible: false
    });
    wx.navigateTo({
      url: '../userlogin/userlogin',
    })
  },

  handleCancel() {
    this.setData({
      visible: false
    });
  },

})
