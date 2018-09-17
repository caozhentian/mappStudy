var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
var md5 = require('../../utils/md5.js');
var util = require('../../utils/util2.js');
let actualUrl = "information/findInformationList" 
let templateId = "sightspotitem"

Page({
  data :{
    url: actualUrl, 
    itemTemplateId: templateId, //列表对应的模版Id
    list: [],
    page: 1,
    size: 20,
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
    let startPageIndex = 0 
    var url = this.data.url 
    network_util._post1(url, {
      nextPage: startPageIndex ,
      pageSize:5
      },
      function (res) {
        that.stopPullDownRefresh()
        let datas = res.data.object
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
      nextPage: ++that.data.page ,
      pageSize: 5
    },
      function (res) {
        that.setData({
          list: that.data.list.concat(res.data.object),
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
    wx.showToast({
      title:""+$data.index
    })
  }
},

)