let network_util = require('../../utils/network_util.js');
let agreeUrl = require('../../config.js').agreeUrl;
Page({
  data: {
    ticketId:'',
    content:'' ,
  },
  onLoad: function (option) {
    this.ticketId = option.id;
  },

  refresh: function () {
    var that = this;
    network_util._post1(agreeUrl, {
    },
      function (res) {
        that.stopPullDownRefresh()
        that.setData({
          content: res.data.detail.content
        });
      })
  },
})
