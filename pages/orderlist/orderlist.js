var network_util = require('../../utils/network_util.js');
let actualUrl = "Order/orderList"
var app = getApp()
const curUserinfo = app.globalData.userInfo
Page({
  data:{
    url: actualUrl,
    page: 1,
    pageSize: 10,
    hasMore: true,
    loadMoreing: false, //是否正在加载更多中
    list: [],
    currentType:0,
  },
  handleChange({ detail }) {
    this.setData({
      currentType: detail.key
    });
    if(this.data.currentType == '1'){
      this.setData({
        list: [{ status: '0' }, { status: '0' }, { status: '0' }]
      });
    }
    wx.startPullDownRefresh({})
  },
 
  orderDetail : function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/order-details/index?id=" + orderId
    })
  },
  cancelOrderTap:function(e){
    var that = this;
    var orderId = e.currentTarget.dataset.id;
     wx.showModal({
      title: '确定要取消该订单吗？',
      content: '',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading();
          wx.request({
            url: 'https://api.it120.cc/' + app.globalData.subDomain + '/order/close',
            data: {
              token: app.globalData.token,
              orderId: orderId
            },
            success: (res) => {
              wx.hideLoading();
              if (res.data.code == 0) {
                that.onShow();
              }
            }
          })
        }
      }
    })
  },
  toPayTap:function(e){
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    var money = e.currentTarget.dataset.money;
    
  },
  onLoad: function (options) {
    wx.startPullDownRefresh({})
  },
  onPullDownRefresh: function () {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    })
    this.refresh()
  },
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
        wx.hideToast()
      }
    })
  },
  refresh: function () {
    var that = this;
    let startPageIndex = 0
    var url = this.data.url
    network_util._post1(url, {
      token: curUserinfo.token,
      pay_status: that.data.currentType,
      page: startPageIndex,
      page_size: that.data.pageSize
    },
      function (res) {
        that.stopPullDownRefresh()
        that.data.list = []
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

  loadMore: function () {
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
      token: curUserinfo.token,
      pay_status: that.data.currentType,
      page: ++that.data.page,
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
  },
  onReachBottom: function () {
    this.loadMore()
  }
 
 
  

})