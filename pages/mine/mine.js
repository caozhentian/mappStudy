//logs.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({
  data: {
    grids: [0, 1, 2, 3]
  },
  userInfo: app.userInfo, //用户
  loginRegister:function(){ //登录或者注册
   wx.navigateTo({
     url: '/pages/userlogin/userlogin',
   })
  },
  agentLogin:function(){
    this.userInfo
    wx.navigateTo({
      url: '/pages/agentlogin/agentlogin',
    })
  },
  gotoMineOrder:function(){
    wx.navigateTo({
      url: '/pages/orderlist/orderlist',
    })
  }
})
