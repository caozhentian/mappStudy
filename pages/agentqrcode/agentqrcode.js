const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
const curUserInfo = app.globalData.userInfo
Page({
  data:{
    captchaImage:''
  },
  onLoad:function(option){
    const scene = decodeURIComponent(option.scene)
  }
})