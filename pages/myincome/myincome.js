var util = require('../../utils/util2.js');
var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
import {
  PageData
} from '../list/PageData.js'
Page({
  data: {
    header: {
      startDate: "2018/09/27",
      endDate: "2018/09/27",
    },
    //列表相关的数据
    pagedata: new PageData("Api/ticketList"),
  },
  bindStartDateChange: function(e) {
    this.setData({
      'header.startDate': e.detail.value
    })
  },
  bindEndDateChange: function(e) {
    this.setData({
      'header.endDate': e.detail.value
    })
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
        type: 'year_ticket',
        city: '610100',
        'nextPage': startPageIndex,
        'pageSize': this.data.pagedata.pageSize
      },
      function(res) {
        that.stopPullDownRefresh()
        let datas = res.data.list
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

  loadMore: function() {
    var that = this;
    if (this.data.pagedata.loadMoreing || this.data.pagedata.refreshing) {
      return
    } else {
      this.setData({
        'pagedata.loadMoreing': true
      })
    }
    var url = this.data.pagedata.url
    network_util._post1(url, {
        type: 'year_ticket',
        city: '610100',
        nextPage: ++that.data.pagedata.pageIndex,
        pageSize: this.data.pagedata.pageSize
      },
      function(res) {
        that.setData({
          'pagedata.list': that.data.pagedata.list.concat(res.data.list),
          'pagedata.loadMoreing': false
        });
      },
      function(res) {
        that.setData({
          'pagedata.loadMoreing': false
        });
        --that.data.pagedata.pageIndex
      })
  },
  onPullDownRefresh: function() {
    // 显示顶部刷新图标   
    this.refresh();
  },
  /**  
  页面上拉触底事件的处理函数   */
  onReachBottom: function() {
    this.loadMore();
  }

})