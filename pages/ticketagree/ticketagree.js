let network_util = require('../../utils/network_util.js');
let agreeUrl = require('../../config.js').agreeUrl;
Page({
  data: {
    ticketId: '',
    title: '',
    content: '',
  },
  onLoad: function(option) {
    this.ticketId = option.id;
    this.refresh();
  },

  refresh: function() {
    var that = this;
    network_util._post1(agreeUrl, {},
      function(res) {
        that.setData({
          content: res.data.detail.content,
          title: res.data.detail.title
        });
      })
  },
})