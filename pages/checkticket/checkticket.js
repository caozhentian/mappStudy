var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
var util = require('../../utils/util2.js');
let actualUrl = "Api/ticketList"
const app = getApp()
Page({
    data: {
      ticketId:'',
    },
    checkticket: function(event) {
      //验票
      
    },
    onLoad: function(options) {
      this.data.ticketId = options.id
    },
    stopPullDownRefresh: function() {
      wx.stopPullDownRefresh({
        complete: function(res) {
          wx.hideToast()
        }
      })
    },
    
    
  },


)