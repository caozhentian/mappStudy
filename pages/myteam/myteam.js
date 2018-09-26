var util2 = require('../../utils/util2.js');
Page({
  data: {
    header:{
      inputShowed: false,
      inputVal: "",
      startDate: "2018/09/27",
      endDate: "2018/09/27",
    },
    //列表相关的数据
    isRefreshing:false ,
    isLoadingMore:false ,
    page:0 ,
    pageSize:10 ,
    keyword:"",
    list:[1,2,34] ,
  },
  bindStartDateChange: function(e) {
    this.setData({
      'header.startDate': e.detail.value})
  },
  bindEndDateChange: function(e) {
    this.setData({
      'header.endDate': e.detail.value
    })
  },
  showInput: function() {
    this.setData({
      'header.inputShowed': true
    });
  },
  hideInput: function() {
    this.setData({
      'header.inputVal': "",
      'header.inputShowed': false
    });
  },
  clearInput: function() {
    this.setData({
      'header.inputVal': ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      'header.inputVal': e.detail.value
    });
  },
  onLoad: function(options) {
    var nowDate = util2.getNowFormatSimpleDate()
    this.setData({
      'header.startDate': nowDate
    })
    this.setData({
      'header.endDate': nowDate
    })
  },

  //列表下拉 加载相关的数据
  onPullDownRefresh: function() {
    // 显示顶部刷新图标   
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://xxx/?page=0',
      method: "GET",
      success: function(res) {
        // 设置数组元素      
        that.setData({
          list: that.data.moment
        });
        console.log(that.data.moment);
        // 隐藏导航栏加载框       
        wx.hideNavigationBarLoading();
        // 停止下拉动作        
        wx.stopPullDownRefresh();
      }
    })
  },
  /**  
  页面上拉触底事件的处理函数   */
  onReachBottom: function () {
    var that = this;
    // 页数+1    
    this.data.page++;
    that.setData({
      isLoadingMore:true 
    })
    wx.request({
      url: 'https://xxx/?page=' + this.data.page,
      method: "GET",
      success: function (res) {
        // 回调函数       
        var moment_list = that.data.list;
        for (var i = 0; i < res.data.data.length; i++) {
          moment_list.push(res.data.data[i]);
        } // 设置数据        
        that.setData({
          list: that.data.list
        })
        // 隐藏加载框        
      }
    })
  }

}
)