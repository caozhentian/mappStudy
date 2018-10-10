const paymentUrl = require('../../config').paymentUrl
const identitycode = require('../../utils/identitycode.js')
const phonevaliate = require('../../utils/phonevaliate.js')
var network_util = require('../../utils/network_util.js');
var app = getApp()

Page({
  data: {
    id_card: "512501197203035172",
    mobile: "13186075334",
    password:"123456" ,
    password_confirm:"123456" ,
  },

  register:function(){
    let idcard = this.data.id_card
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
    let tel = this.data.mobile
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
    let confirmPassword = this.data.password_confirm
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

    network_util._post1('register', this.data,
      function (netdata) {
        //关闭当前页面
        app.globalData.hasLogin = true;
        app.globalData.token = netdata.data.token;
        app.globalData.member_id = netdata.data.member_id;
        wx.showToast({
          title: '注册成功',
        })
        wx.navigateBack({

        })
      },
      function (res) {
        console.log(res);
      })
   
  },

  bindIdcardKeyInput: function (e) {
    this.setData({
      'id_card': e.detail.value
    })
  },

  bindTelKeyInput: function (e) {
    this.setData({
      'mobile': e.detail.value
    })
  },

  bindPasswordKeyInput: function (e) {
    this.setData({
      'password': e.detail.value
    })
  },
  bindConfirmPasswordKeyInput: function (e) {
    this.setData({
      'password_confirm': e.detail.value
    })
  },

})

