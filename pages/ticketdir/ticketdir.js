var network_util = require('../../utils/network_util.js');
const config = require('../../config.js');
const ticketDirUrl = config.ticketDirUrl
Page({
  data: {
    info: {
      list: [0, 1, 2, 3, 1, 2, 3, 1, 2, 3, 0, 1, 2, 3, 1, 2, 3, 1, 2, 3],
    },
    ticket: {
      ticketId: '',
      ticketPrice: ''
    }
  },
  onLoad: function(options) {
    this.data.ticket.ticketId = options.id;
    this.data.ticket.ticketPrice = options.price;
    getTicketDir(options.id)
  },
  getTicketDir(ticketId) {
    var that = this;
    network_util._post1(ticketDirUrl, {
      ticketId: that.data.ticket.ticketId
      },
      function(netdata) {
        that.setData({
          'info.list': netdata.data.name,
        });
      })
  }
})