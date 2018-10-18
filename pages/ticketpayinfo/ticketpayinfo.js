const paymentUrl = require('../../config').paymentUrl
const identitycode = require('../../utils/identitycode.js')
const phonevaliate = require('../../utils/phonevaliate.js')
var json_util = require('../../utils/json_util.js');
var network_util = require('../../utils/network_util.js');
var app = getApp()
const curUserInfo = app.globalData.userInfo
Page({
  data: {
    items: [{
        value: '1',
        name: '本地（身份证号码1427,1408,4112开头；         或者住址为运城市、三门峡市）',
        checked: true
      },
      {
        value: '2',
        name: '外地身份证',
        checked: false
      },
    ],

    ticketInfo: {
      ticketId: "",
      idCardType: 1,
      prince: 100,
      idcard: "132330198109142478",
      tel: "13186075290",
    },
    urlIdCard: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    urlResidentfrtgh: "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg",
    isHidden: true
  },
  onLoad: function(options) {
    this.data.ticketInfo.ticketId = options.id;
  },
  createOrder: function() {
    //创建订单
    let member_id = curUserInfo.member_id;
    let token = curUserInfo.token;
    if (curUserInfo.isGuest) {
      member_id = ""
      token = ""
    }
    this.formSubmit({
      member_id: member_id,
      tid: this.data.ticketInfo.ticketId,
      token: token,
      openid: curUserInfo.openid,
      id_card: this.data.ticketInfo.idcard,
      mobile: this.data.ticketInfo.tel,
      id_card_image1: "abc",
      id_card_image2: "abc",

    }) ;
    // network_util._post_json('Order/createOrder', {
    //     member_id: member_id,
    //     tid: this.data.ticketInfo.ticketId,
    //     token: token,
    //     openid: curUserInfo.openid,
    //     id_card: this.data.ticketInfo.idcard,
    //     mobile: this.data.ticketInfo.tel,
    //     id_card_image1: "abc",
    //     id_card_image2: "abc",

    //   },
    //   function(netdata) {
    //     wx.navigateTo({
    //       url: '../../pages/ticketpay/ticketpay?orderId=' + 1 + 'price:' + 10,
    //     })
    //   },
    //   function(res) {
    //     console.log(res);
    //   })

  },
  gopay: function() {
    let idcard = this.data.ticketInfo.idcard
    if (idcard.length == 0 || idcard == undefined) {
      wx.showToast({
        title: '请输入身份证',
      })
      return
    }
    //校验身份证
    if (!identitycode.identityCodeValid(idcard)) {
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
    if (!phonevaliate.isPhoneAvailable(tel)) {
      wx.showToast({
        title: '手机号输入有误',
      })
      return
    }
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     network_util._post1('Often/getOpenid', {
    //       js_code: res.code,
    //       },
    //       function(netdata) {
    //         createOrder()
    //       },
    //       function(res) {

    //       })
    //   },
    //   function() {},
    //   function() {}
    // })
    var that = this;
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
              that.createOrder()
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  formSubmit: function (formData) {
    var that = this;
    wx.request({
      url: 'https://www.xazhihe.cn/Order/createOrder',
      data: formData,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        /*if (res.data.flag == 'error') {
          that.checkValue1(res.data.msg);
        } else {
          that.confirm_one();
        }*/
        console.log(res);
        if (res.data.msg == "success") {
          wx.requestPayment(
            {
              'timeStamp': res.data.data.timeStamp,
              'nonceStr': res.data.data.nonceStr,
              'package': res.data.data.package,
              'signType': 'MD5',
              'paySign': res.data.data.paySign,
              'success': function (res) {
                console.log('成功:' + res);
              },
              'fail': function (res) {
                console.log('失败:' + res);
              },
              'complete': function (res) {
                console.log('完成:' + res);
              }
            })
        }
      }
    })
  },
  
  bindIdcardKeyInput: function(e) {
    this.setData({
      'ticketInfo.idcard': e.detail.value
    })
  },

  bindTelKeyInput: function(e) {
    this.setData({
      'ticketInfo.tel': e.detail.value
    })
  },

  uploadIdcard: function() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        //上传图片
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function(res) {
            var data = res.data
            //do something
          }
        })
      }
    })
  },

  radioChange: function(e) {
    let value = e.detail.value
    if (value == 1) {
      this.setData({
        isHidden: true,
        'ticketInfo.idCardType': e.detail.value
      })
    } else {
      this.setData({
        isHidden: false,
        'ticketInfo.idCardType': e.detail.value
      })
    }
  }


})