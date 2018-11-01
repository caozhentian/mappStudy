const againUploadCardUrl = require('../../config').againUploadCardUrl
var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
var util = require('../../utils/util.js');
var app = getApp()
const curUserInfo = app.globalData.userInfo
Page({
  data: {
    orderId: '',
    tel: '',
    telHide: '',
    idcard: '',
    idcardHide: '',
    urlIdCard: '',
    urlResidentfrtgh: "",
    isUploadIdCard: false,
    isResidentfrtgh: false,
  },
  onLoad: function(options) {
    this.setData({
      'orderId': options.orderId,
      'tel': options.mobile,
      telHide: util.hideTel(options.mobile),
      idcardHide: util.hideIdCard(options.idcard),
      'idcard': options.idcard,
    })
  },
  goUploadPic: function() {
    if (!this.data.isUploadIdCard && !this.data.isResidentfrtgh) {
      wx.showToast({
        title: '请上传至少一张身份证或者居住证正面照片',
        icon: 'none',
      })
      return;
    }
    wx.showLoading({
      title: '重新上传中',
    })
    this.formSubmit()
  },
  formSubmit: function() {
    var that = this;
    network_util._post1(againUploadCardUrl, {
        order_id: that.data.orderId,
        id_card_image1: that.data.urlIdCard,
        id_card_image2: that.data.urlResidentfrtgh,
      },
      function(netdata) {
        wx.showToast({
            title: '上传成功',
            icon: 'none'
          }),
          wx.navigateBack({

          })
      })
  },
  //上传照片
  uploadIdcard: function(event) {
    let imgType = event.currentTarget.dataset.imgType
    this.uploadImg(imgType)
  },
  uploadResidentfrtgh: function(event) {
    let imgType = event.currentTarget.dataset.imgType
    this.uploadImg(imgType)
  },
  uploadImg: function(imgType) {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        //上传图片
        wx.showLoading({
          title: '',
        });
        wx.uploadFile({
          url: network_util.BASE_PIC_UPLOAD_URL  + 'Api/uploadImg',
          filePath: tempFilePaths[0],
          name: 'image',
          success: function(res) {
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
          fail: function({
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
  }

})