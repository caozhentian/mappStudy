const paymentUrl = require('../../config').paymentUrl
const identitycode = require('../../utils/identitycode.js')
const phonevaliate = require('../../utils/phonevaliate.js')
var network_util = require('../../utils/network_util.js');
var app = getApp()

Page({
  data: {
    mobile: "132330198109142478",
    password:"123456" 
  },

  login:function(){
    let idcard = this.data.mobile
    if (idcard.length == 0 || idcard == undefined){
      wx.showToast({
        title: '请输入身份证或者手机号',
        icon:'none',
      })
      return 
    }
    //校验身份证
    if (!identitycode.identityCodeValid(idcard) && !phonevaliate.isPhoneAvailable(idcard)){
      wx.showToast({
        title: '身份证或者手机号输入有误',
        icon: 'none',
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
    
    network_util._post1('Api//login', this.data,
      function (netdata) {
        //关闭当前页面.data.token
        app.globalData.userInfo.setUserinfo(false, true, false, netdata.data.token, netdata.data.member_id, netdata.data.mobile, netdata.data.idcard) ;
        wx.showToast({
          title: '登录成功',
        })
        wx.navigateBack({
          delta: -1
        });
      },
      function (res) {
        console.log(res);
      })
   
  },
  //微信登录
  wxlogin:function(){
     wx.navigateBack({
       
     })
  },
  register:function(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  bindIdcardKeyInput: function (e) {
    this.setData({
      'mobile': e.detail.value
    })
  },
  bindPasswordKeyInput: function (e) {
    this.setData({
      'password': e.detail.value
    })
  }

})

