var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
var util = require('../../utils/util.js');
let actualUrl = "Api/ticketList"
const app = getApp()
Page({
    data: {
      item: {
        ticketId: '',
        spotId: '',
        url: '',
        price: '0.01',
        idcard: '132330198109253427',
        hideidcard: '',
        tel: '16789999928',
        hideTel: '',
        effectiveDate: '2018/01 - 2018/12',
        status: '正常',
        spotName: '秦始皇兵马俑博物院',
        curCheckStatus: '未验票',
        playTimes: '2',
      }
    },
    checkticket: function(event) {
      //验票
      wx.showToast({
        title: '功能开发中',
        icon: 'none'
      })
    },
    onLoad: function(options) {
      this.data.ticketId = options.id;
      let hideIdCard = util.hideIdCard(this.data.item.idcard);
      let hideTel = util.hideTel(this.data.item.tel);
      this.setData({
        'item.hideidcard': hideIdCard,
        'item.hideTel': hideTel,
      })
      //
    },
    getCheckInfo: function() {
      var that = this;
      network_util._post1(actualUrl, {
          token: app.globalData.userInfo.token,
          sid: that.data.sid,
          ticketId: that.data.item.ticketId
        },
        function(netdata) {
          this.setData({
            'item.url': hideIdCard,
            'item.price': hideTel,
            'item.hideidcard': util.hideIdCard(this.data.item.idcard),
            'item.hideTel': util.hideTel(this.data.item.tel),
            'item.effectiveDate': hideIdCard,
            'item.status': hideTel,
            'item.spotName': hideIdCard,
            'item.curCheckStatus': hideTel,
            'item.playTimes': hideIdCard,
          })
        })
    },
    gotoSpot: function(event) {
      let spotId = event.currentTarget.dataset.spotId;
      wx.navigateTo({
        url: '/pages/sightspotdetail/sightspotdetail?id=' + spotId,
      })
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