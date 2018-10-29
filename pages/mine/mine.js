//logs.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
const curUserInfo = app.globalData.userInfo
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    grids: [0, 1, 2, 3],
    userInfo: curUserInfo, //用户
    mobileHidden: "",
  },
  // onLoad: function () {
  //   // 查看是否授权
  //   wx.getSetting({
  //     success(res) {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称
  //         wx.getUserInfo({
  //           success: function (res) {
  //             console.log(res.userInfo)
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  // bindGetUserInfo(e) {
  //   console.log(e.detail.userInfo)
  // },
  loginRegister: function() { //登录或者注册
    wx.navigateTo({
      url: '/pages/userlogin/userlogin',
    })
  },
  //退出登录
  logout: function() {
    const that = this;
    wx.showModal({
      content: "确认退出登录吗?",
      confirmText: "确定",
      cancelText: "取消",
      success: function(res) {
        if (res.confirm) {
          curUserInfo.logout();
          that.setData({
            userInfo: curUserInfo, //用户
            mobileHidden: util.hideTel(curUserInfo.mobile)
          })
        }
      }
    })
  },
  gotoMineOrder: function() {
    if (!curUserInfo.isMember) {
      this.gotologin();
      return;
    }
    wx.navigateTo({
      url: '/pages/orderlist/orderlist',
    })
  },
  onShow: function() {
    this.setData({
      userInfo: curUserInfo, //用户
      mobileHidden: util.hideTel(curUserInfo.mobile)
    })

  },
  gotologin: function () {
    const that = this;
    wx.showModal({
      content: "确认登录吗?",
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../userlogin/userlogin',
          })
        }
      }
    })
  },
  //代理操作
  agentLogin: function() {
    wx.navigateTo({
      url: '/pages/agentlogin/agentlogin',
    })
  },
  gotoAgentProduct: function() {
    wx.navigateTo({
      url: '/pages/agentproduct/agentproduct',
    })
  },
  gotoQrCode: function() {
    wx.navigateTo({
      url: '/pages/agentqrcode/agentqrcode',
    })
  },
  gotoMyTeam: function() {
    wx.navigateTo({
      url: '/pages/myteam/myteam',
    })
  },
  gotoMyPoster:function(){
    wx.navigateTo({
      url: '/pages/agentposter/agentposter',
    })
  },
  gotoMyincome: function() {
    wx.navigateTo({
      url: '/pages/myincome/myincome',
    })
  }, 
  gotoAgentOrder: function() {
    wx.navigateTo({
      url: '/pages/agentorder/agentorder',
    })
  },
})