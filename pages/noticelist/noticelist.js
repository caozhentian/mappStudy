var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
var md5 = require('../../utils/md5.js');
var util = require('../../utils/util2.js');
Page({
  data: {
    // text:"这是一个页面"
    list: [],
    hidden: false,
    page: 1,
    size: 20,
    hasMore: true,
    loadMoreing: false //是否正在加载更多中
  },
  onLoad: function(options) {
    this.refesh()
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  //事件处理函数
  bindViewTap: function(e) {
    console.log(e.currentTarget.dataset.title);
  },
  onPullDownRefresh: function () {
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
    console.log('onPullDownRefresh', new Date())
  },
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
        wx.hideToast()
      }
    })
  },
  loadMore: function(e) {
    var that = this;
    if (this.data.loadMoreing) 
    {
      return
    }
    else{
      this.data.loadMoreing = true 
    }
    var url = 'http://v.juhe.cn/weixin/query?key=f16af393a63364b729fd81ed9fdd4b7d&pno=' + (++that.data.page) + '&ps=10';
    network_util._get(url,
      function(res) {
        that.setData({
          list: that.data.list.concat(res.data.result.list),
          hidden: true,
          hasRefesh: false,
          loadMoreing:false
        });
      },
      function(res) {
        that.setData({
          loadMoreing: false
        });
      })
  },
  onReachBottom: function () {
    this.loadMore()
  },
  refesh: function(e) {
    var that = this;
    wx.startPullDownRefresh()
    var url = 'http://v.juhe.cn/weixin/query?key=f16af393a63364b729fd81ed9fdd4b7d&pno=1&ps=10';
    network_util._get(url,
      function(res) {
        that.setData({
          list: res.data.result.list,
          hidden: true,
          page: 1,
          hasRefesh: false,
        });
        that.stopPullDownRefresh()
      },
      function(res) {
        console.log(res);
        that.stopPullDownRefresh()
      })
  },
})