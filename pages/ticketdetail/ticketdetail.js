var util = require('../../utils/util2.js');
var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
Page({
  data: {
    info:{
      list: [0, 1, 2, 3, 1, 2, 3, 1, 2, 3],
      content:'内容如下 美丽的中国',
      otherDesc:'其它介绍 主要时间'
    },
    ticket:{
      ticketId:'',
      ticketPrice:''
    }
  },

  onLoad: function(options) {
    this.data.ticket.ticketId = options.id ;
    this.data.ticket.ticketPrice = options.price;
  },

  gotopay:function() {
    let ticketId = this.data.ticket.ticketId ;
    let ticketPrice = this.data.ticket.ticketPrice ;
    wx.navigateTo({
      url: '../../pages/ticketpayinfo/ticketpayinfo?id=' + ticketId + '&price=' + ticketPrice
    });
  },
  allIntro:function(){

  }
})