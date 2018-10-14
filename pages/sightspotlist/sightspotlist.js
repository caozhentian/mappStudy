var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
var util = require('../../utils/util2.js');
let actualUrl = "scenicList" 

Page({
  data :{
    url: actualUrl, 
    list: [],
    ticketId:"-1" ,
    page: 1,
    pageSize: 20,
    hasMore: true,
    loadMoreing: false //是否正在加载更多中
  } ,
  onLoad:function(options) { 
    this.data.ticketId = options.id;
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
    let startPageIndex = 0 
    var url = this.data.url 
    network_util._post1(url, {
      tid: that.data.ticketId ,
      page: startPageIndex ,
      page_size:that.data.pageSize
      },
      function (res) {
        that.data.list = []
        that.stopPullDownRefresh()
        let datas = res.data.list;
        datas.forEach(function (currentValue) {
          var fullPath = network_util.BASE_PIC_URL + currentValue.image;
          currentValue.image = fullPath;
        })　;　
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
    let startPageIndex = this.data.page++;
    network_util._post1(url, {
      tid: that.data.tid,
      page: startPageIndex,
      page_size: that.data.pageSize
    },
      function (res) {
        let datas = res.data.list;
        datas.forEach(function (currentValue) {
          var fullPath = network_util.BASE_PIC_URL + currentValue.image;
          currentValue.image = fullPath;
        })　;　
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
  },
  sightspotTap:function(e){
    var $data = e.currentTarget.dataset; //item传递参数的写法
    wx.navigateTo({
      url: '../../pages/sightspotdetail/sightspotdetail?id=' + $data.index
    });
  }
},

)