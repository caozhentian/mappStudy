//logs.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
var USER_TYPE_COMM = 1 
Page({
  data: {
    userInfo: {}, //关联的微信客户
    isGuest: true,
    platformUser:{
      userType:2, //是否普通用户 , 代理商 ，客服
    }
  },
  onLoad: function () {
     this.getWxUserInfo() 
  },
  loginRegister:function(){ //登录或者注册
    wx.login({
      success: function (res) {
        app.globalData.hasLogin = true
        that.setData({
          hasLogin: true
        })
        that.update()
      }
    })
  },

  getWxUserInfo:function(deal){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
      deal(app.globalData.userInfo)
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
          })
          deal(app.globalData.userInfo)
        }
      })
    }    
  }
})
