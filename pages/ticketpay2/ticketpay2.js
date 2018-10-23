const orderPayUrl = require('../../config').orderPayUrl
var network_util = require('../../utils/network_util.js');
var app = getApp()
const curUserInfo = app.globalData.userInfo
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
    var that = this;
    wx.showLoading({
      title: '',
    })
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://www.xazhihe.cn/Often/getOpenid',
            data: {
              js_code: res.code
            },
            success: function(res) {
              console.log(res);
              curUserInfo.openid = res.data.data.openid
              that.payorder(res.data.data.openid)
            }
          })
        } else {
          wx.showToast({
            title: '无法获取openId，请重试！',
            icon: 'none'
          })
        }
      }
    });
  },

  payorder: function(openid) {
    var that = this ;
    network_util._post1(orderPayUrl, {
        token: curUserInfo.token,
        openid: openid,
        order_id: this.data.orderId
      },
      function(res) {
        that.pay(res);
      },
      function(res) {
        wx.showToast({
          title: '支付失败',
          icon: 'none'
        });
      })
  },

  pay: function (respay){
    wx.requestPayment({
      'timeStamp': respay.data.timeStamp,
      'nonceStr': respay.data.nonceStr,
      'package': respay.data.package,
      'signType': respay.data.signType,
      'paySign': respay.data.paySign,
      'success': function (res) {
        wx.showToast({
          title: '微信支付成功',
          icon: 'none'
        })
        wx.navigateBack({
          delta: 1
        });
      },
      'fail': function (res) {
        wx.showToast({
          title: '微信支付失败',
          icon: 'none'
        })
      },
      'complete': function (res) {
        self.setData({
          loading: false
        })
      }
    })
  }
})