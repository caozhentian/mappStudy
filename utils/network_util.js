import util from 'util.js';

//const BASE_URL = 'http://jsjr.3tichina.com:80/jinshangjinrong/jinshangjinrong/'
const BASE_URL = 'https://np.xazhihe.cn/'
const BASE_PIC_URL = 'https://np.xazhihe.cn/data/'
const BASE_PIC_UPLOAD_URL = 'https://np.xazhihe.cn/'
/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _get(url, success, fail) {

  console.log("------start---_get----");
  wx.request({
    url: url,
    header: {
      // 'Content-Type': 'application/json'
    },
    success: function(res) {
      success(res);
    },
    fail: function(res) {
      fail(res);
    }
  });

  console.log("----end-----_get----");
}

/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _post(url, data, success, fail) {
  console.log("----_post--start-------");
  wx.request({
    url: url,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data: {
      data: data
    },
    success: function(res) {
      success(res.data);
    },
    fail: function(res) {
      fail(res);
    }
  });
  console.log("----end-----_get----");
}


/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _post1(url, data, success, fail) {
  console.log("----_post--start-------");
  //增加共同的参数
  let app = getApp()
  if (app.globalData.userInfo.token == undefined) {
    data.token = ''
  } else {
    data.token = app.globalData.userInfo.token
  }
  if (app.globalData.userInfo.member_id == undefined) {
    data.member_id = ''
  } else {
    data.member_id = app.globalData.userInfo.member_id
  }
  wx.showLoading({
    title: '请稍后...',
  })
  wx.request({
    url: BASE_URL + url,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data: data,
    success: function(res) {
      if (res.statusCode == 200) {
        if (res.data.code == 0) {
          success(res.data);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }

      } else {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      }
    },
    fail: function(res) {
      fail(res);
      wx.showToast({
        title: '网络异常',
        icon: 'none'
      })
    },
    complete: function() {
      wx.hideLoading()
    }
  });
  console.log("----end-----_get----");
}
/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _post_json(url, data, success, fail) {
  console.log("----_post--start-------");
  wx.request({
    url: BASE_URL + url,
    header: {
      'content-type': 'application/json',
    },
    method: 'POST',
    data: data,
    success: function(res) {
      success(res);
    },
    fail: function(res) {
      fail(res);
    }
  });

  console.log("----end----_post-----");
}
module.exports = {
  BASE_PIC_URL: BASE_PIC_URL,
  BASE_PIC_UPLOAD_URL,
  _get: _get,
  _post: _post,
  _post1: _post1,
  _post_json: _post_json
}