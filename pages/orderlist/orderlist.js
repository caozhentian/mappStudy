var network_util = require('../../utils/network_util.js');
let actualUrl    = require('../../config').orderListUrl;
const cancelUrl  = require('../../config').orderCancelUrl ;
const rerentUrl  = ""
var app = getApp()
const curUserinfo = app.globalData.userInfo
Page({
  data:{
    visible:false ,
    visibleRerent:false ,
    msg:"继续操作吗?",
    url: actualUrl,
    page: 1,
    pageSize: 10,
    hasMore: true,
    loadMoreing: false, //是否正在加载更多中
    list: [],
    currentType:0,
    curOrderId:"" ,
    curOrderPrice:0 ,
    cur_pay_status:0 ,
    cur_status:''
  },
  handleChange({ detail }) {
    this.setData({
      currentType: detail.key
    });
    if(this.data.currentType == '0'){
      this.data.cur_pay_status = 0 ;
      this.data.cur_status ='';
    } else if (this.data.currentType == '1') {
      this.data.cur_pay_status = 1;
      this.data.cur_status = 'pending';
    } else if (this.data.currentType == '2') {
      this.data.cur_pay_status = 1;
      this.data.cur_status = 'active';
    } else if (this.data.currentType == '3') {
      this.data.cur_pay_status = 1;
      this.data.cur_status = 'dead';
    }
    wx.startPullDownRefresh({})
  },
  //取消订单
  showDlg:function(e){
    this.setData({
      visible:true ,
    }) 
    this.data.curOrderId = e.currentTarget.dataset.orderid;
  },
  cancleDlg:function(){
    this.setData({
      visible: false,
    }) 
  },
  cancelOrder:function(){//取消订单的请求
    var that = this;
    this.setData({
      visible: false,
    }) 
    var that = this;
    this.setData({
      visibleRerent: false,
    })
    network_util._post1(cancelUrl, {
      order_id: that.data.curOrderId,
    },
      function (res) {
        //取消订单成功 刷新订单
        wx.startPullDownRefresh({})
      })
  },
  //续租订单
  showRerentDlg: function (e) {
    this.setData({
      visibleRerent: true,
    })
    this.data.curOrderId = e.currentTarget.dataset.orderid;
  },
  cancleRerentDlg: function () {
    this.setData({
      visibleRerent: false,
    })
  },
  rerentOrder: function () {//续租的实际请求
    var that = this;
    this.setData({
      visibleRerent: false,
    })
    network_util._post1(rerentUrl, {
      orderId: that.data.curOrderId,
    },
      function (res) {
        //续租成功 刷新订单
        wx.startPullDownRefresh({})
      })
  },
  //去支付功能
  toPay:function(e){
    var that = this;
    that.data.curOrderId = e.currentTarget.dataset.orderid;
    that.data.curOrderPrice = e.currentTarget.dataset.orderprice;
    wx.navigateTo({
      url: '../../pages/ticketpay2/ticketpay2?orderId=' + that.data.curOrderId + '&price=' + that.data.curOrderPrice,
    })
  },
  //审核失败 重新上传
  toRetryUpload:function(e){
    var that = this;
    that.data.curOrderId = e.currentTarget.dataset.orderid;
    that.data.curOrderPrice = e.currentTarget.dataset.orderprice;
    wx.navigateTo({
      url: '../../pages/ticketpayinfo/ticketpayinfo?orderId=' + that.data.curOrderId 
    })
  },
  onLoad: function (options) {
    //wx.startPullDownRefresh({})
    //debug​{"code":0,"msg":"success","data":{"member_id":"3","mobile":"13186075367","idcard":"132330198109142478","token":"7af537ee3bc8525a90b5cc6f3ba3e714"}}
    
    //
    //
    
  },
  onShow:function(){//支付完成 或者重新上传 返回，刷新订单
    wx.startPullDownRefresh({})
  },
  // 下拉刷新功能
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
      pay_status: that.data.cur_pay_status,
      status: that.data.cur_status ,
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
      pay_status: that.data.cur_pay_status,
      status: that.data.cur_status,
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