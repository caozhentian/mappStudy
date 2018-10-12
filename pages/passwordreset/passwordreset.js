const paymentUrl = require('../../config').paymentUrl
const identitycode = require('../../utils/identitycode.js')
const phonevaliate = require('../../utils/phonevaliate.js')
var network_util = require('../../utils/network_util.js');
var app = getApp()

Page({
  data: {
    idcard: "132330198109142478",
    tel: "13186075334",
    password:"123456" ,
    confirmPassword:"123456" ,
    smscode:"",
    targetTime: 0,
    myFormat: ['时', '分', '秒'],
    clearTimer: false,
    hidenSmscode:false ,
    hideCountDown:true ,
  },

  onLoad(){
    this.setData({
      hidenSmscode: true,
      hideCountDown: true,
    });
  },
  onUnload() {
    this.setData({
      clearTimer: true
    });
  },
  
  getSmsCode:function(){
    this.setData({
      targetTime: new Date().getTime() + 60000,
      hidenSmscode: true,
      hideCountDown: false,
    });
  },
  myLinsterner:function(){
    this.setData({
      hidenSmscode: false,
      hideCountDown: true
    });
  },
  register:function(){
    let idcard = this.data.idcard
    if (idcard.length == 0 || idcard == undefined){
      wx.showToast({
        title: '请输入身份证',
        icon:'none',
      })
      return 
    }
    //校验身份证
    if (!identitycode.identityCodeValid(idcard)){
      wx.showToast({
        title: '身份证输入有误',
        icon: 'none',
      })
        return 
    }
    let tel = this.data.tel
    if (tel.length == 0 || tel == undefined) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
      })
      return
    }
    if (!phonevaliate.isPhoneAvailable(tel)){
      wx.showToast({
        title: '手机号输入有误',
        icon: 'none',
      })
      return
    }
    let smscode = this.data.smscode
    if (smscode.length == 0 || smscode == undefined) {
      wx.showToast({
        title: '请输入验证码',
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
    if (password.length < 6 ) {
      wx.showToast({
        title: '密码长度小于6',
        icon: 'none',
      })
      return
    }
    let confirmPassword = this.data.confirmPassword
    if (confirmPassword == '' || confirmPassword == undefined) {
      wx.showToast({
        title: '请输入确认密码',
        icon: 'none',
      })
      return
    }
    if (confirmPassword.length < 6) {
      wx.showToast({
        title: '确认密码长度小于6',
        icon: 'none',
      })
      return
    }
    if (password != confirmPassword){
      wx.showToast({
        title: '两次输入的密码不一致',
        icon: 'none',
      })
      return
    }

    network_util._post1('/abdn', this.data,
      function (res) {
        //关闭当前页面
        wx.navigateBack({

        })
      })
   
  },

  bindIdcardKeyInput: function (e) {
    this.setData({
      'idcard': e.detail.value
    })
  },

  bindTelKeyInput: function (e) {
    this.setData({
      'tel': e.detail.value
    })
  },

  bindPasswordKeyInput: function (e) {
    this.setData({
      'password': e.detail.value
    })
  },
  bindConfirmPasswordKeyInput: function (e) {
    this.setData({
      'confirmPassword': e.detail.value
    })
  },
  bindSmsCodeKeyInput:function(e){
    this.setData({
      'smscode': e.detail.value
    })
  }

})

