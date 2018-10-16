var network_util = require('../../utils/network_util.js');
const app = getApp()
Page({
  data: {
    starIndex: 5,
    inputValue: "",
    sid: ""
  },
  onLoad: function(option) {
    this.data.sid = option.id;
  },

  comment: function() {
    wx.navigateTo({
      url: '/pages/orderlist/orderlist',
    })
  },
  onChange: function(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex': index
    })
  },
  handleChange: function (e) {
    this.data.inputValue = e.detail.detail.value;
  },
  handleClick: function() {
    if (app.globalData.userInfo.token == '') {
      //跳转到登陆界面
      if (!app.globalData.isUserLoign) {
        wx.navigateTo({
          url: '/pages/userlogin/userlogin',
        })
      }
      return;
    }
    if (this.data.inputValue == '') {
      wx.showToast({
        title: '请输入评论内容',
        icon:'none',
      })
      return ;
    }
    if (this.data.starIndex == 0) {
      wx.showToast({
        title: '请选择评论星级',
        icon: 'none',
      })
      return;
    }
    var that = this;
    network_util._post1('Api/comment', {
        token: app.globalData.userInfo.token,
        sid: that.data.sid,
        content: that.data.inputValue 
      },
      function(netdata) {
        wx.showToast({
          title: '评论成功',
          icon:'none',
        })
        wx.navigateBack({
          
        })
      })
  }
})