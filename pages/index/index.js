//index.js
//获取应用实例
const app = getApp()
const curUserInfo = app.globalData.userInfo 
Page({
  data: {
    motto: 'Hello World',
    userInfo: curUserInfo,
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
    if (curUserInfo.isGuest){
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
    if (curUserInfo.isGuest) {
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
  onShow: function () {
    this.setData({
      userInfo: curUserInfo, //用户
    })
  }

})
