var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
var md5 = require('../../utils/md5.js');
var util = require('../../utils/util2.js');
class PageData {
  constructor(actualUrl ) {
      this.url = actualUrl ,
      this.isRefreshing  = false,
      this.isLoadingMore= false,
      this.pageIndex =0,
      this.pageSize = 10,
      this.keyword = "",
      this.list = [],
    this.refesh = this.refesh.bind(this)
    this.loadMore = this.loadMore.bind(this)
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
    
  }
  
  refesh() {
    
  }
}

export {
  PageData
}