var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
var util = require('../../utils/util2.js');
let actualUrl = require('../../config.js').articleNotificationUrl; 

Page({
  data :{
    url: actualUrl, 
    list: [],
    page: 1,
    pageSize: 20,
    hasMore: true,
    loadMoreing: false //是否正在加载更多中
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
    let startPageIndex = 1 
    var url = this.data.url 
    network_util._post1(url, {
      page: startPageIndex ,
      page_size: that.data.pageSize
      },
      function (res) {
        that.stopPullDownRefresh()
        that.data.list = []
        let datas = res.data;
        that.setData({
          list: datas,
          page: startPageIndex,
          hasRefesh: false,
        });

      },
      function (res) {
        that.stopPullDownRefresh()
      })
  },

  loadMore:function() {
    var that = this;
    if (this.data.loadMoreing) {
      return
    } else {
      this.setData({
        loadMoreing: true
      })
    }
    var url = this.data.url 
    network_util._post1(url, {
      page: ++that.data.page ,
      page_size: that.data.pageSize
    },
      function (res) {
        let datas = res.data;
        that.setData({
          list: that.data.list.concat(datas),
          hasRefesh: false,
          loadMoreing: false
        });
      },
      function (res) {
        that.setData({
          loadMoreing: false
        });
      })
  } ,
  onReachBottom:function() {
    this.loadMore()
  }
},

)