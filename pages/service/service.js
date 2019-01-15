// pages/service/service.js
let {
  url
} = require("../../config/index");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    rows: 4,
    service: [],
    pagination: {},
    url
  },
  show() {
    wx.request({
      url: url + "/wxgoods/service",
      method: "get",
      data: {
        page: this.data.page,
        rows: this.data.rows
      },
      success: (res) => {
        console.log(res.data.rows);
        this.setData({
          service: [...this.data.service, ...res.data.rows],
          pagination: res.data
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.show();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  loadMore() {
    console.log(this.data.pagination.maxpage);
    if (this.data.page <= this.data.pagination.maxpage) {
      this.setData({
        page: this.data.pagination.curpage + 1
      });
      this.show();
    } else {
      return;
    }
  }

})