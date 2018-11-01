const resetPasswordUrl = require('../../config').resetPasswordUrl
const getSmscodeUrl = require('../../config').getSmscodeUrl
const identitycode = require('../../utils/identitycode.js')
const phonevaliate = require('../../utils/phonevaliate.js')
var network_util = require('../../utils/network_util.js');
var app = getApp()
const resetUrl =
  Page({
    data: {
      idcard: "",
      tel: "",
      password: "",
      confirmPassword: "",
      smscode: "",
      hidenSmscode: false,
      hideCountDown: true,
    },

    onLoad() {
      this.setData({
        hidenSmscode: false,
        hideCountDown: true,
      });
    },
    // 倒计时
    count_down: function(countDown_time) {
      var that = this;
      var time = countDown_time.split(':')
      var hhh = parseInt(time[0])
      var mmm = parseInt(time[1])
      var sss = parseInt(time[2])
      this.setData({
        sss: (sss < 10) ? '0' + sss : sss,
        mmm: (mmm < 10) ? '0' + mmm : mmm,
        hhh: (hhh < 10) ? '0' + hhh : hhh
      })
      var Interval = setInterval(function() {
        if (sss > 0) {
          sss--
        } else {
          console.log('时间到')
          clearInterval(Interval)
          that.setData({
            hidenSmscode: false,
            hideCountDown: true,
          });
        }
        if (sss == 0) {
          if (mmm > 0) {
            mmm--
            sss = 59;
          }
          if (mmm == 0 && hhh > 0) {
            hhh--
            sss = 59;
            mmm = 59;
          }
        }
        that.setData({
          sss: (sss < 10) ? '0' + sss : sss,
          mmm: (mmm < 10) ? '0' + mmm : mmm,
          hhh: (hhh < 10) ? '0' + hhh : hhh
        })
      }, 1000)
    },
    getSmsCode: function() {
      let tel = this.data.tel
      if (tel.length == 0 || tel == undefined) {
        wx.showToast({
          title: '请输入手机号码',
          icon: 'none',
        })
        return
      }
      if (!phonevaliate.isPhoneAvailable(tel)) {
        wx.showToast({
          title: '手机号输入有误',
          icon: 'none',
        })
        return
      }
      this.setData({
        hidenSmscode: true,
        hideCountDown: false,
      });
      var countDown_time = '00:00:59';
      this.count_down(countDown_time);
      network_util._post1(getSmscodeUrl, {
          mobile: tel
        },
        function(res) {
          wx.setStorageSync('vcode',res.data.vcode);
          wx.showToast({
            title: '验证码已发送',
            icon: 'none',
          })
        })
    },
    register: function() {
      // let idcard = this.data.idcard
      // if (idcard.length == 0 || idcard == undefined) {
      //   wx.showToast({
      //     title: '请输入身份证',
      //     icon: 'none',
      //   })
      //   return
      // }
      // //校验身份证
      // if (!identitycode.identityCodeValid(idcard)) {
      //   wx.showToast({
      //     title: '身份证输入有误',
      //     icon: 'none',
      //   })
      //   return
      // }
      let tel = this.data.tel
      if (tel.length == 0 || tel == undefined) {
        wx.showToast({
          title: '请输入手机号码',
          icon: 'none',
        })
        return
      }
      if (!phonevaliate.isPhoneAvailable(tel)) {
        wx.showToast({
          title: '手机号输入有误',
          icon: 'none',
        })
        return
      }
      let smscode = this.data.smscode
      if (smscode.length == 0 || smscode == undefined) {
        wx.showToast({
          title: '请输入验证码',
          icon: 'none',
        })
        return
      }
      let password = this.data.password
      if (password == '' || password == undefined) {
        wx.showToast({
          title: '请输入密码',
          icon: 'none',
        })
        return
      }
      if (password.length < 6) {
        wx.showToast({
          title: '密码长度小于6',
          icon: 'none',
        })
        return
      }
      let confirmPassword = this.data.confirmPassword
      if (confirmPassword == '' || confirmPassword == undefined) {
        wx.showToast({
          title: '请输入确认密码',
          icon: 'none',
        })
        return
      }
      if (confirmPassword.length < 6) {
        wx.showToast({
          title: '确认密码长度小于6',
          icon: 'none',
        })
        return
      }
      if (password != confirmPassword) {
        wx.showToast({
          title: '两次输入的密码不一致',
          icon: 'none',
        })
        return
      }
      let vcode = wx.getStorageSync('vcode')
      network_util._post1(resetPasswordUrl, {
          mobile: tel,
          sms_code: smscode,
          vcode: vcode,
          password: password,
          password_confirm: confirmPassword,
        },
        function(res) {
          wx.showToast({
            title: '密码已重置',
            icon: 'none',
          })
          //关闭当前页面
          wx.navigateBack({

          })
        })

    },

    bindIdcardKeyInput: function(e) {
      this.data.idcard = e.detail.value
    },

    bindTelKeyInput: function(e) {
      this.data.tel = e.detail.value
    },

    bindPasswordKeyInput: function(e) {
      this.data.password = e.detail.value
    },
    bindConfirmPasswordKeyInput: function(e) {
      this.data.confirmPassword = e.detail.value
    },
    bindSmsCodeKeyInput: function(e) {
      this.data.smscode = e.detail.value
    }

  })