var util = require('../../utils/util2.js');
var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
const config = require('../../config.js');
const ticketDetailUrl = config.ticketDetailUrl
Page({
  data: {
    info: {
      list: [0, 1, 2, 3, 1, 2, 3, 1, 2, 3],
      content: '',
      otherDesc: ''
    },
    ticket: {
      ticketId: '',
      ticketPrice: ''
    }
  },
  onLoad: function(options) {
    this.data.ticket.ticketId = options.id;
    this.data.ticket.ticketPrice = options.price;
    getTicketDetail(options.id)
  },
  getTicketDetail(ticketId) {
    var that = this;
    network_util._post1(ticketDetailUrl, {
        tid: that.data.ticket.ticketId
      },
      function(netdata) {
        that.setData({
          'info.list': netdata.data.scenic,
          'info.content': netdata.data.ticket.intro,
          'info.otherDesc': '',
        });
      })
  },
  gotopay: function() {
    let ticketId = this.data.ticket.ticketId;
    let ticketPrice = this.data.ticket.ticketPrice;
    wx.navigateTo({
      url: '../../pages/ticketpayinfo/ticketpayinfo?id=' + ticketId + '&price=' + ticketPrice
    });
  },
  allIntro: function() {
    let ticketId = this.data.ticket.ticketId;
    wx.navigateTo({
      url: '../../pages/ticketdir/ticketdir?id=' + ticketId
    });
  }
})