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
      idCardType:1 ,
      prince:100 ,
      idcard:""  ,
      tel:""     ,
    },
    url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg' ,
    isHidden:true 
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

  upload:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
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
          success: function (res) {
            var data = res.data
            //do something
          }
        })
      }
    })
  },

  radioChange: function (e) {
    let value = e.detail.value 
    if(value == 1){
      this.setData({
        isHidden: true  ,
        'ticketInfo.idCardType': e.detail.value
      })
    }
    else{
      this.setData({
        isHidden: false,
        'ticketInfo.idCardType': e.detail.value
      })
    }
  }

  
})

