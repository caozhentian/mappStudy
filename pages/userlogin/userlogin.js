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
  },

  register:function(){
    let idcard = this.data.idcard
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
    
    network_util._post1('/abdn', this.data,
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

})

