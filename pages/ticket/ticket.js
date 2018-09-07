
Page({
  data: {
    url: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg" ,
    price:100 ,
    name:"最美秦岭"
  },
  onLoad: function () {
    
  },
  onTicketAgree:function(){ //进入购买协议界面
    // this.setData({ price: 200 })
    //进入购买协议界面
    wx.navigateTo({
      url: '../../pages/ticketagree/ticketagree'
    });
  }
})
