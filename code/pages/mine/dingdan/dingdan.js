// pages/mine/dingdan/dingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    currentTab: 0,
    ddcps: [],
    user_id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取系统信息，手机的屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        })
      },
    })
    wx.getStorage({
      key: 'u_id',
      success: function (res) {
        that.setData({
          user_id: res.data
        })
        wx.request({
          url: 'http://116.yaoyiwangluo.com/wx_dingdan_list.asp',
          data: {
            cs_uid: res.data
          },
          success: function (res2) {
            console.log(res2.data)
            that.setData({
              ddcps: res2.data
            })
          }
        })
      },
    })

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