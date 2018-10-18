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
      price: "",
      idcard: curUserInfo.idcard,
      tel: curUserInfo.mobile,
    },
    urlIdCard: '',
    urlResidentfrtgh: "",
    isUploadIdCard:false,
    isResidentfrtgh:false  ,
    isHidden: true,
    isAgree: false,
  },
  onLoad: function(options) {
    this.setData({
      'ticketInfo.ticketId': options.id,
      'ticketInfo.price': options.price
    })
  },
  onShow: function() {
    this.setData({
      'ticketInfo.idcard': curUserInfo.idcard,
      'ticketInfo.tel': curUserInfo.mobile
    })
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
      id_card_image1: this.data.urlIdCard,
      id_card_image2: this.data.urlResidentfrtgh,
    });
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
        icon: 'none',
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
    let type = this.data.ticketInfo.type ;
    if(type == 2){
      if(!this.data.isUploadIdCard){
        wx.showToast({
          title: '请先上传身份证正面照片',
        })
        return ;
      }
      if (!this.data.isResidentfrtgh) {
        wx.showToast({
          title: '请先上传居住证照片',
        })
        return;
      }
    }
    if (!this.data.isAgree) {
      wx.showToast({
        title: '请同意《相关条款》内容',
        icon: 'none',
      })
      return
    }
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
  formSubmit: function(formData) {
    var that = this;
    wx.request({
      url: 'https://www.xazhihe.cn/Order/createOrder',
      data: formData,
      header: {
        'Content-Type': 'application/json'
      },
      responseType:'application/json',
      success: function(res) {
        if (res.data.msg == "success") {
          wx.navigateTo({
            url: '../../pages/ticketpay/ticketpay?orderId=' + "" + '&price=' + that.data.ticketInfo.price
              + '&timeStamp=' + res.data.data.timeStamp 
              + '&nonceStr=' + res.data.data.nonceStr 
              + '&package=' + res.data.data.package 
              + '&signType=' + res.data.data.signType 
              + '&paySign=' + res.data.data.paySign,
          })
        }
      }
    })
  },

  //UI事件
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
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

  //上传照片
  uploadIdcard: function (event) {
    let imgType = event.currentTarget.dataset.imgType
    this.uploadImg(imgType)
  },
  uploadResidentfrtgh: function (event) {
    let imgType = event.currentTarget.dataset.imgType
    this.uploadImg(imgType)
  },
  uploadImg: function (imgType) {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        //上传图片
        wx.uploadFile({
          url: 'https://www.xazhihe.cn/Api/uploadImg',
          filePath: tempFilePaths[0],
          name: 'image',
          success: function (res) {
            var data = json_util.stringToJson(res.data);
            if (data.code == 0) {
              if (imgType == '1') {
                that.setData({
                  urlIdCard: network_util.BASE_PIC_UPLOAD_URL + data.data.img_url,
                  isUploadIdCard: true
                });
              } else {
                that.setData({
                  urlResidentfrtgh: network_util.BASE_PIC_UPLOAD_URL + data.data.img_url,
                  isResidentfrtgh: true
                });
              }
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 1000
              })
            } else {
              wx.showToast({
                title: data.msg,
                icon: 'fail',
                duration: 1000
              })
              if (imgType == 1) {
                that.setData({
                  urlIdCard: '',
                  isUploadIdCard: false
                });
              } else {
                that.setData({
                  urlResidentfrtgh: '',
                  isResidentfrtgh: false
                });
              }
            }
          },
          fail: function ({
            errMsg
          }) {
            wx.showToast({
              title: '上传失败',
              icon: 'success',
              duration: 1000
            });
            if (imgType == 1) {
              that.setData({
                urlIdCard: '',
                isUploadIdCard: false
              });
            } else {
              that.setData({
                urlResidentfrtgh: '',
                isResidentfrtgh: false
              });
            }
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