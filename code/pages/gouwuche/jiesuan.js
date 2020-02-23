// pages/gouwuche/jiesuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    user_id: "",
    gwc: [],
    zongfeiyong: 0
  },

  xiadan: function (e) {
    var that = this
    //console.log(e.detail)
    if (e.detail.target.id == "xiadan") {
      console.log("下单处理")
      console.log(e.detail.value)
      console.log("用户id:" + this.data.user_id)

      wx.request({
        url: 'http://116.yaoyiwangluo.com/wx_gwc_xiadan.asp',
        data: {
          cs_uid: that.data.user_id,
          cs_dizhiid:"123",
          cs_liuyan: e.detail.value.liuyan
        },
        success: function () {
          wx.reLaunch({
            url: '/pages/mine/dingdan/dingdan',
          })
        },
      })

    } 
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取系统信息，手机的屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        })
      },
    })

    //获取用户id和远程数据
    wx.getStorage({
      key: 'u_id',
      success: function (res) {
        console.log(res.data)
        that.setData({ user_id: res.data })
        //获取远程数据
        wx.request({
          url: 'http://116.yaoyiwangluo.com/wx_gwc_list.asp',
          data: { uid: res.data },
          success: function (res2) {
            that.setData({ gwc: res2.data })
          }
        })
        //获取购物车费用
        wx.request({
          url: 'http://116.yaoyiwangluo.com/wx_gwc_feiyong.asp',
          data: { uid: res.data },
          success: function (res2) {
            that.setData({ zongfeiyong: res2.data })
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