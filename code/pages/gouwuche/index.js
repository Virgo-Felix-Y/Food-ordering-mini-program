// pages/dingdan/index.js
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

  jiesuan: function () {
    wx.navigateTo({
      url: '/pages/gouwuche/jiesuan',
    })
  },

  myjian: function (e) {
    var that = this
    console.log("用户id：" + that.data.user_id)
    console.log("产品数量：" + e.currentTarget.dataset.jian)
    console.log("购物车id：" + e.currentTarget.dataset.gwcid)
    if (e.currentTarget.dataset.jian == 0) {
      console.log("数量为0，删除购物车数据")
      //删除数据
      wx.showModal({
        title: '删除确认',
        content: '删除后不可恢复',
        success(res) {
          if (res.confirm) {
            console.log("用户点击了确认")
            //删除购物车，参数为用户的id和购物车id
            wx.request({
              url: 'http://116.yaoyiwangluo.com/wx_gwc_del.asp',
              data: {
                cs_gwc_id: e.currentTarget.dataset.gwcid,
                cs_user_id: that.data.user_id
              },
              success: function (res2) {
                console.log(res2.data)
                that.getGWC()
              }
            })
          } else if (res.cancel) {
            console.log("用户点击了取消")
          }
        }
      })

    } else {
      //更新购物车数据
      wx.request({
        url: 'http://116.yaoyiwangluo.com/wx_gwc_shuxiugai.asp',
        data: {
          cs_cp_shu: e.currentTarget.dataset.jian,
          cs_gwc_id: e.currentTarget.dataset.gwcid,
          cs_user_id: that.data.user_id
        },
        success: function (res) {
          console.log(res.data)
          that.getGWC()
        }
      })
    }
  },
  myjia: function (e) {
    var that = this
    console.log("用户id：" + that.data.user_id)
    console.log("产品数量：" + e.currentTarget.dataset.jia)
    console.log("购物车id：" + e.currentTarget.dataset.gwcid)
    //更新购物车数据
    wx.request({
      url: 'http://116.yaoyiwangluo.com/wx_gwc_shuxiugai.asp',
      data: {
        cs_cp_shu: e.currentTarget.dataset.jia,
        cs_gwc_id: e.currentTarget.dataset.gwcid,
        cs_user_id: that.data.user_id
      },
      success: function (res) {
        console.log(res.data)
        that.getGWC()
      }
    })
  },

  getGWC: function () {
    var that = this
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
    var that=this
    that.getGWC()
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