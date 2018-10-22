//app.js
const openIdUrl = require('./config').openIdUrl
App({
  onLaunch: function () {
    //Debug start
    this.globalData.userInfo.token = '7af537ee3bc8525a90b5cc6f3ba3e714'
    this.globalData.userInfo.member_id = 3
    this.globalData.userInfo.isMember  = true
    //Debug end
  },

  globalData: {
    userInfo:{
      isGuest: true,
      isMember: false,
      isAgent: false,
      openid: "",
      token: '',
      member_id: -1 ,
      mobile:"",
      idcard:"",

      setUserinfo: function (isGuest, isMember, isAgent, token, member_id, mobile, idcard) {
        this.isGuest  =  isGuest   ;
        this.isMember =  isMember  ;
        this.isAgent  =  isAgent   ;
        this.member_id = member_id ;
        this.token    = token ;
        this.mobile = mobile;
        this.idcard = idcard;

      },

      logout:function(){
        this.isGuest = true;
        this.isMember = false;
        this.isAgent = false;
        this.member_id = -1;
        this.token = "";
        this.openid="";
        this.mobile = "";
        this.idcard = "";
      }
    } 

     
  },
  
  // lazy loading openid
  getUserOpenId: function (callback) {
    var self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function (data) {
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success: function (res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail: function (res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function (err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  }
})