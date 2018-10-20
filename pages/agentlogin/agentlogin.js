const agentLoginUrl = require('../../config').agentLoginUrl
var network_util = require('../../utils/network_util.js');
const app = getApp()
const curUserInfo = app.globalData.userInfo
Page({
  data: {
    idcard: "132330198109142478",
    password:"123456" ,
  },

  login:function(){
    curUserInfo.isAgent = true   ;
    curUserInfo.isMember = false ;
    curUserInfo.isGuest = false  ;
    wx.navigateBack({

    })
    let idcard = this.data.idcard
    if (idcard.length == 0 || idcard == undefined){
      wx.showToast({
        title: '请输入账号',
        icon:'none',
      })
      return 
    }
   
    let password = this.data.password
    if (password == '' || password == undefined) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
      })
      return
    }
    
    network_util._post1(agentLoginUrl,{
      
    },
      function (res) {
        //关闭当前页面
        wx.navigateBack({

        })
      },
      function (res) {
        console.log(res);
      })
   
  },

  bindIdcardKeyInput: function (e) {
    this.setData({
      'idcard': e.detail.value
    })
  },
  bindPasswordKeyInput: function (e) {
    this.setData({
      'password': e.detail.value
    })
  }
})

