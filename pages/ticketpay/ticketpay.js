const paymentUrl = require('../../config').paymentUrl
var network_util = require('../../utils/network_util.js');
var app = getApp()

Page({
  data: {
    orderId: "",
    price: "",
    payinfo: {
      timeStamp: '',
      nonceStr: '',
      package2: '',
      signType: '',
      paySign: '',
    }
  },
  onLoad: function(options) {
    this.setData({
       orderId: options.orderId,
       price: options.price,
      'payinfo.timeStamp': options.timeStamp,
      'payinfo.nonceStr': options.nonceStr,
      'payinfo.package2': options.package,
      'payinfo.signType': options.signType,
      'payinfo.paySign': options.paySign,
    })
  },
  requestPayment: function() {
    let self = this;
    self.setData({
      loading: true
    })
    wx.requestPayment({
      'timeStamp': self.data.payinfo.timeStamp,
      'nonceStr': self.data.payinfo.nonceStr,
      'package': self.data.payinfo.package2,
      'signType': self.data.payinfo.signType,
      'paySign': self.data.payinfo.paySign,
      'success': function(res) {
        console.log('成功:' + res);
      },
      'fail': function(res) {
        console.log('失败:' + res);
      },
      'complete': function(res) {
        self.setData({
          loading: false
        })
      }
    })
  }
})