// pages/shop/shop.js
let {
  url
} = require("../../config/index");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url,
    store: {},
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    goods: [],
    service: [],
    height: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.show(options.storeId);
  },
  show(shopId) {
    wx.request({
      method: "get",
      url: url + '/wxgoods/storeById',
      data: {
        storeId: shopId
      },
      success: ({
        data
      }) => {
        console.log(data);
        this.setData({
          store: data
        });
      }
    });

    //商品信息
    wx.request({
      method: 'get',
      url: url + '/wxgoods/searchGoodsByStoreId',
      data: {
        storeId: shopId
      },
      success: ({
        data
      }) => {
        this.setData({
          goods: data,
          height: 131 * data.length
        });
      }
    });


    //服务信息
    wx.request({
      method: 'get',
      url: url + '/wxgoods/searchServiceByServiceId',
      data: {
        storeId: shopId
      },
      success: ({
        data
      }) => {
        console.log('服务', data);
        this.setData({
          service: data
        });
      }
    });

    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {
    let {
      current
    } = e.detail;
    let height = 0;
    if (current == 0) {
      height = 131 * this.data.goods.length;
    } else {
      height = 131 * this.data.service.length;
    }
    var that = this;
    that.setData({
      currentTab: current,
      height
    });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
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

  }
})