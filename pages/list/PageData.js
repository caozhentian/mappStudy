var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
var md5 = require('../../utils/md5.js');
var util = require('../../utils/util2.js');
class PageData {
  constructor(actualUrl, templateId ) {
    this.data= {
      url : actualUrl , //"http://v.juhe.cn/weixin/query?key=f16af393a63364b729fd81ed9fdd4b7d&",
      itemTemplateId: templateId , //列表对应的模版Id
      list: [],
      hidden:  false,
      page  :  1,
      size  :  5,
      hasMore :true,
      loadMoreing :  false //是否正在加载更多中
    }
    this.refesh = this.refesh.bind(this)
    this.loadMore = this.loadMore.bind(this)
  }

  onLoad(options)  {this.refesh()}
   
  onReady() {
    // 页面渲染完成
  }

  onShow() {
    // 页面显示
    wx.showToast({
      title: ' onShow',
    })
  }
  onHide() {
    // 页面隐藏
    // 页面显示
    wx.showToast({
      title: ' onHide',
    })
  }
  onUnload() {
    // 页面关闭
  }
  //事件处理函数
  bindViewTap(e) {
    console.log(e.currentTarget.dataset.title);
  }

  onPullDownRefresh() {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    })
    console.log('onPullDownRefresh', new Date())
  }

  stopPullDownRefresh() {
    wx.stopPullDownRefresh({
      complete: function(res) {
        wx.hideToast()
      }
    })
  }

  loadMore() {
    var that = this;
    if (this.data.loadMoreing) {
      return
    } else {
      this.data.loadMoreing = true
    }
    var url = this.data.url + 'pno=' + (++that.data.page) + '&ps=10';
    network_util._get(url,
      function(res) {
        Page.prototype.setData({
          list: that.data.list.concat(res.data.result.list),
          hidden: true,
          hasRefesh: false,
          loadMoreing: false
        });
      },
      function(res) {
        Page.prototype.setData({
          loadMoreing: false
        });
      })
  }
  onReachBottom() {
    this.loadMore()
  }

  refesh() {
    var that = this;
    wx.startPullDownRefresh()
    let startPageIndex = 0 
    var url = this.data.url + '?token=ec5b9ed6cdbc2e84081582c158176942&employeeId=1&nextPage={startPageIndex}&pageSize=10';
    network_util._post(url,[],
      function(res) {
        that.stopPullDownRefresh()
        that.setData({
          list: res.object,
          hidden: true,
          page: startPageIndex,
          hasRefesh: false,
        });
        
      },
      function(res) {
        console.log(res);
        that.stopPullDownRefresh()
      })
  }
}

export {
  PageData
}