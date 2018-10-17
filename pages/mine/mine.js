//logs.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
const curUserInfo = app.globalData.userInfo
Page({
  data: {
    grids: [0, 1, 2, 3],
    visible: false,
    userInfo: curUserInfo, //用户
    mobileHidden: ""
  },
  loginRegister:function(){ //登录或者注册
   wx.navigateTo({
     url: '/pages/userlogin/userlogin',
   })
  },
  logout:function(){
    curUserInfo.logout() ;
    wx.navigateTo({
      url: '/pages/userlogin/userlogin',
    })
  },
  gotoMineOrder:function(){
    if (!curUserInfo.isMember){
      this.setData({
        visible: true
      })
      return ;  
    }
    wx.navigateTo({
      url: '/pages/orderlist/orderlist',
    })
  },
  onShow:function(){
    this.setData({
      userInfo: curUserInfo, //用户
      mobileHidden: util.hideTel(curUserInfo.mobile)
    })
    
  },
  handleOK:function(){
    this.setData({
      visible: false
    })
    wx.navigateTo({
      url: '/pages/userlogin/userlogin',
    })
  },
  handleCancel:function(){
    this.setData({
      visible:false 
    })
  },
  //代理操作
  agentLogin:function(){
    wx.navigateTo({
      url: '/pages/agentlogin/agentlogin',
    })
  },
  gotoAgentProduct:function(){
    wx.navigateTo({
      url: '/pages/agentproduct/agentproduct',
    })
  },
  gotoQrCode: function () {
    wx.navigateTo({
      url: '/pages/agentProduct/agentProduct',
    })
  },
  gotoMyTeam: function () {
    wx.navigateTo({
      url: '/pages/myteam/myteam',
    })
  },
  gotoMyincome: function () {
    wx.navigateTo({
      url: '/pages/myincome/myincome',
    })
  },
})
