const paymentUrl = require('../../config').paymentUrl
const identitycode = require('../../utils/identitycode.js')
const phonevaliate = require('../../utils/phonevaliate.js')

var app = getApp()

Page({
  data: {
    items: [
      { value: '1', name: '本地（身份证号码1427,1408,4112开头；         或者住址为运城市、三门峡市）', checked: true },
      { value: '2', name: '外地身份证', checked: false},
    ],
    ticketInfo:{
      prince:100 ,
      idcard:""  ,
      tel:""     ,
    }
  },

  gopay:function(){
    let idcard = this.data.ticketInfo.idcard
    if (idcard.length == 0 || idcard == undefined){
      wx.showToast({
        title: '请输入身份证',
      })
      return 
    }
    //校验身份证
    if (!identitycode.identityCodeValid(idcard)){
      wx.showToast({
        title: '身份证输入有误',
      })
        return 
    }
    let tel = this.data.ticketInfo.tel
    if (tel.length == 0 || tel == undefined) {
      wx.showToast({
        title: '请输入手机号码',
      })
      return
    }
    if (!phonevaliate.isPhoneAvailable(tel)){
      wx.showToast({
        title: '手机号输入有误',
      })
      return
    }
    wx.navigateTo({
      url: '../../pages/ticketpay/ticketpay',
    })
  },

  bindIdcardKeyInput: function (e) {
    this.setData({
      'ticketInfo.idcard': e.detail.value
    })
  },

  bindTelKeyInput: function (e) {
    this.setData({
      'ticketInfo.tel': e.detail.value
    })
  },
})

