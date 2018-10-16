const paymentUrl = require('../../config').paymentUrl
var network_util = require('../../utils/network_util.js');
var app = getApp()

Page({
  data: {
    orderId: "",
    price: ""
  },
  onLoad: function(options) {
    this.setData({
      orderId: options.orderId,
      price: options.price
    })
  },
  requestPayment: function() {
    self.setData({
      loading: true
    })
    //微信登录登录 
    var that = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        network_util._post1('Often/getOpenid', {
            js_code: res.code,

          },
          function(netdata) {

          },
          function(res) {

          })
      },
      function() {},
      function() {
        that.setData({
          loading: true
        })
      }
    })


    // 此处需要先调用wx.login方法获取code，然后在服务端调用微信接口使用code换取下单用户的openId
    // 具体文档参考https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html?t=20161230#wxloginobject
    app.getUserOpenId(function(err, openid) {
      if (!err) {
        wx.request({
          url: paymentUrl,
          data: {
            openid
          },
          method: 'POST',
          success: function(res) {
            console.log('unified order success, response is:', res)
            var payargs = res.data.payargs
            wx.requestPayment({
              timeStamp: payargs.timeStamp,
              nonceStr: payargs.nonceStr,
              package: payargs.package,
              signType: payargs.signType,
              paySign: payargs.paySign
            })

            self.setData({
              loading: false
            })
          }
        })
      } else {
        self.setData({
          loading: false
        })
      }
    })
  }
})