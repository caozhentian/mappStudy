var network_util = require('../../utils/network_util.js');
let articleAnswersUrl = require('../../config.js').articleAnswersUrl;

Page({
  data :{ 
    content:''
  } ,
  onLoad:function(options) { 
    wx.startPullDownRefresh({  
    })
  },
  onPullDownRefresh:function() {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    })
    this.refresh()
  },
  stopPullDownRefresh:function() {
    wx.stopPullDownRefresh({
      complete: function (res) {
        wx.hideToast()
      }
    })
  },
  refresh:function() {
    var that = this;
    network_util._post1(articleAnswersUrl, {
      },
      function (res) {
        that.stopPullDownRefresh()
        that.setData({
          content: res.data.detail.content
        });
      })
  },
},

)