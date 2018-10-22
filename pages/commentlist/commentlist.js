var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
var util = require('../../utils/util2.js');
let config = require('../../config.js');
let actualUrl = config.commentListUrl;

Page({
    data: {
      url: actualUrl,
      spotId:'',
      list: [],
      page: 1,
      pageSize: 10,
      hasMore: true,
      loadMoreing: false, //是否正在加载更多中
      scenicDetail: {
        "name": "",
        "image": "",
      }
    },
    onLoad: function(options) {
      this.data.spotId = options.id
      wx.startPullDownRefresh({})
    },
    onPullDownRefresh: function() {
      wx.showToast({
        title: '加载中...',
        icon: 'loading'
      })
      this.refresh()
    },
    stopPullDownRefresh: function() {
      wx.stopPullDownRefresh({
        complete: function(res) {
          wx.hideToast()
        }
      })
    },
    refresh: function() {
      var that = this;
      let startPageIndex = 0
      var url = this.data.url
      network_util._post1(url, {
          sid: this.data.spotId,
          page: startPageIndex,
          page_size: that.data.pageSize
        },
        function(res) {
          that.stopPullDownRefresh()
          that.data.list = []
          let datas = res.data.list;
          that.setData({
            list: datas,
            page: startPageIndex,
            hasRefesh: false,
          });

        },
        function(res) {
          console.log(res);
          that.stopPullDownRefresh()
        })
    },

    loadMore: function() {
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
          sid: this.data.spotId,
          page: ++that.data.page,
          page_size: that.data.pageSize
        },
        function(res) {
          let datas = res.data.list;
          that.setData({
            list: that.data.list.concat(datas),
            hasRefesh: false,
            loadMoreing: false
          });
        },
        function(res) {
          that.setData({
            loadMoreing: false
          });
        })
    },
    onReachBottom: function() {
      this.loadMore()
    }
  },

)