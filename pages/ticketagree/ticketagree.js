
Page({
  data: {
    
  },
  onLoad: function () {
    
  },
  gotobuy:function(){ //进入购买界面
   wx.navigateTo({
     url: '../../pages/ticketpayinfo/ticketpayinfo',
   })
  },
  gotosightspotlist:function(){//进入景区列表
    wx.navigateTo({
      url: '../sightspotlist/sightspotlist',
    })
  }
})
