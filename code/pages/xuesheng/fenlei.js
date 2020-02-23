// pages/xuesheng/fenlei.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    navList: [],
    foods: [],
    curNav: 0
  },
selectNav: function(event) {
    var that = this;
    var id = event.target.dataset.id
    var xuesheng = [];
    var t = 0;
    var n = 0;
    var p = 0;
    var q = 0;
    var idd = [];
    var all = [];
    var shitang = [];
    //console.log(id)
    that.setData({
      curNav: id
    })
    wx.request({
        url: 'http://116.yaoyiwangluo.com/wx_fenlei_chanpin.asp',
        data: {
          int_lxid1: id
        },
        success: function(res) {
          for (t = 0; t < res.data.length; t++) {
            idd[n] = res.data[t].cp_id;
            all[n] = res.data[t];
            n++;
          }
          console.log(idd)
          console.log(all)
          
          for (p = 0; p <idd.length; p++) {
            (function(p) {
              wx.request({
                url: 'http://116.yaoyiwangluo.com/wx_sp_info-b.asp',
                data: {
                  cp_id: idd[p]
                },
                success: function(res) {
                  if (res.data == "学生食堂") {
                    xuesheng[q] = all[p];
                    q++;
                  }
                  that.setData({
                    foods: xuesheng
                  })
                }
              })
            })(p)
          }
      }
    })
},

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {
  var that = this;
  //获取系统信息
  wx.getSystemInfo({
    success: function(res) {
      that.setData({
        winHeight: res.windowHeight,
        winWidth: res.windowWidth
      })
    },
  })

  wx.request({
    url: 'http://116.yaoyiwangluo.com/wx_fenlei.asp',
    success: function(res) {
      that.setData({
        navList: res.data
      })
    }
  })
},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function() {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function() {

},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function() {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function() {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function() {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function() {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function() {

}
})