var util2 = require('../../utils/util2.js');
Page({
  data:{
    inputShowed: false,
    inputVal: "",
    startDate:"2018/09/27",
    endDate: "2018/09/27",
  },
  bindStartDateChange: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onLoad: function (options) {
    var nowDate = util2.getNowFormatSimpleDate()
    this.setData({
      startDate: nowDate
    })
    this.setData({
      endDate: nowDate
    })
  },
}
  
)