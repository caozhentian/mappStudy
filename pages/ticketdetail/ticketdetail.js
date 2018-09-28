var util = require('../../utils/util2.js');
var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
import {
  PageData
} from '../list/PageData.js'
Page({
  data: {
    header: {

    },
    //列表相关的数据
    pagedata: new PageData("message/findMessageList"),
  },

  onLoad: function(options) {
    var nowDate = util.getNowFormatSimpleDate()
    this.setData({
      'header.startDate': nowDate
    })
    this.setData({
      'header.endDate': nowDate
    })
    wx.startPullDownRefresh({}) //刷新
  },
  itemClick: function(e) {
    var $data = e.currentTarget.dataset; //item传递参数的写法
    wx.showToast({
      title: "" + $data.index
    })
  },
  //列表下拉 加载相关的数据
  stopPullDownRefresh: function() {
    wx.stopPullDownRefresh({
      complete: function(res) {
        wx.hideToast()
      }
    })
  },
  refresh: function() {
    if (this.data.pagedata.loadMoreing || this.data.pagedata.refreshing) {
      return
    }
    var that = this;
    let startPageIndex = 0
    this.data.pagedata.refreshing = true
    var url = this.data.pagedata.url
    network_util._post1(url, {
        'nextPage': startPageIndex,
        'pageSize': this.data.pagedata.pageSize
      },
      function(res) {
        that.stopPullDownRefresh()
        let datas = res.data.object
        that.setData({
          'pagedata.list': datas,
          'pagedata.pageIndex': startPageIndex,
          'pagedata.refreshing': false,
        });

      },
      function(res) {
        console.log(res);
        that.stopPullDownRefresh()
      })
  },
  onPullDownRefresh: function() {
    // 显示顶部刷新图标   
    this.refresh();
  },
})