var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
var util = require('../../utils/util2.js');
let actualUrl = "Api/ticketList"
const app = getApp()
Page({
    data: {
      url: actualUrl,
      visible: false,
      actions: [{
          name: '会员',
          color: '#2d8cf0',
        },
        {
          name: '代理商',
          color: '#19be6b'
        },
        {
          name: '取消'
        }
      ],
      list: [],
      type: 'year_ticket',
      city: '610100',
      page: 1,
      pageSize: 10,
      hasMore: true,
      loadMoreing: false //是否正在加载更多中
    },
    onTicketDetail: function(event) { //进入购买协议界面
      //进入购买协议界面
      let ticketId = event.currentTarget.dataset.ticketId
      wx.navigateTo({
        url: '../../pages/ticketdetail/ticketdetail?id=' + ticketId
      });
    },
    gotoPay: function(event) {
      // if (app.globalData.member_id == -1) {
      //   this.gotologin();
      //   return;
      // }
      let ticketId = event.currentTarget.dataset.ticketId
      let ticketPrice = event.currentTarget.dataset.ticketPrice
      wx.navigateTo({
        url: '../../pages/ticketpayinfo/ticketpayinfo?id=' + ticketId + '&price=' + ticketPrice
      });
    },
    gotologin: function() {
      this.setData({
        visible: true
      })
    },
    handleClick({
      detail
    }) {
      const index = detail.index;
      if (index === 0) {
        wx.navigateTo({
          url: '../userlogin/userlogin',
        })
      } else if (index === 1) {
        wx.navigateTo({
          url: '../agentlogin/agentlogin',
        })
      }

      this.setData({
        visible: false
      });
    },
    gotoSpots: function(event) {
      //景区列表
      let ticketId = event.currentTarget.dataset.ticketId
      wx.navigateTo({
        url: '../../pages/sightspotlist/sightspotlist?id=' + ticketId
      });
    },
    onLoad: function(options) {
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
          type: that.data.type,
          city: that.data.city,
          page: startPageIndex,
          page_size: that.data.pageSize
        },
        function(res) {
          that.stopPullDownRefresh()
          that.data.list = []
          let datas = res.data.list;
          datas.forEach(function(currentValue) {
            var fullPath = network_util.BASE_PIC_URL + currentValue.image;
            currentValue.image = fullPath;
          })　;　
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
          type: that.data.type,
          city: that.data.city,
          page: ++that.data.page,
          page_size: that.data.pageSize
        },
        function(res) {
          let datas = res.data.list;
          datas.forEach(function(currentValue) {
            var fullPath = network_util.BASE_PIC_URL + currentValue.image;
            currentValue.image = fullPath;
          })　;　
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