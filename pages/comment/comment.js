const util = require('../../utils/util.js')
Page({
  data: {
    starIndex: 0,
    inputValue:""
  },
  onLoad: function (option) {
     
  },
  
  comment:function(){
    wx.navigateTo({
      url: '/pages/orderlist/orderlist',
    })
  },
  onChange2:function(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex': index
    })
  },
})
