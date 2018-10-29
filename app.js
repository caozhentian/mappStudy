//app.js
const openIdUrl = require('./config').openIdUrl
App({
  onLaunch: function () {
    //Debug start
    // this.globalData.userInfo.token = '7af537ee3bc8525a90b5cc6f3ba3e714'
    // this.globalData.userInfo.member_id = 3
    // this.globalData.userInfo.isMember  = true
    //Debug end
    //getUserOpenId() ;
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
  
  getUserOpenId: function () {
    wx.login({
      success: function (data) {
      },
      fail: function (err) {
      }
    })
  }
})