const changePasswordUrl = require('../../config').changePasswordUrl
const identitycode = require('../../utils/identitycode.js')
const phonevaliate = require('../../utils/phonevaliate.js')
var network_util = require('../../utils/network_util.js');
var app = getApp()
  Page({
    data: {
      password: "123456",
      newPassword:'dsds',
      confirmPassword: "123456"
    },

    changepassword: function() {
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
      let newPassword = this.data.newPassword
      if (newPassword == '' || newPassword == undefined) {
        wx.showToast({
          title: '请输入新密码',
          icon: 'none',
        })
        return
      }
      if (newPassword.length < 6) {
        wx.showToast({
          title: '新密码长度小于6',
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
      
      if (newPassword != confirmPassword) {
        wx.showToast({
          title: '两次输入的密码不一致',
          icon: 'none',
        })
        return
      }
      network_util._post1(changePasswordUrl, {
          1: password,
          1: newPassword,
          1: confirmPassword,
        },
        function(res) {
          wx.showToast({
            title: '密码已修改',
            icon: 'none',
          })
          //关闭当前页面
          wx.navigateBack({

          })
        })

    },

    bindPasswordKeyInput: function(e) {
      this.setData({
        'password': e.detail.value
      })
    },
    bindConfirmPasswordKeyInput: function(e) {
      this.setData({
        'confirmPassword': e.detail.value
      })
    },
    bindNewPasswordKeyInput: function(e) {
      this.setData({
        'newPassword': e.detail.value
      })
    }

  })