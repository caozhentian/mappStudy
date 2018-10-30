var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
var util = require('../../utils/util2.js');
let actualUrl = "Api/ticketList" 

Page({
  data :{
    url: actualUrl, 
    list: [],
    page: 1,
    pageSize: 20,
    hasMore: true,
    loadMoreing: false ,//是否正在加载更多中
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
      type: 'year_ticket',
      city: '610100',
      nextPage: startPageIndex ,
      pageSize: that.data.pageSize
      },
      function (res) {
        that.stopPullDownRefresh();
        let datas = res.data.list;
        that.setData({
          list: datas,
          page: startPageIndex,
          hasRefesh: false,
        });

      },
      function (res) {
        console.log(res);
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
      type: 'year_ticket',
      city: '610100',
      nextPage: ++that.data.page ,
      pageSize: that.data.pageSize
    },
      function (res) {
        that.setData({
          list: that.data.list.concat(res.data.list),
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