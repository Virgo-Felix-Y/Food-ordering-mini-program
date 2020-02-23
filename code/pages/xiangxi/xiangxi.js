// pages/xiangxi/xiangxi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    currentTab: 0,
    images:"",
    winWidth:0,

    cp_tupian: "",
    cp_mingcheng: "",
    jiage: "",
    cp_jianjie: "",
    cp_yixiaoshou: "",
    cp_neirong: "",
    sp_neirong: "",

    stars: [0, 1, 2, 3, 4],
    normalSrc: '/images/normal.png',
    selectedSrc: '/images/selected.png',
    pl: [],
    user_id: "",
    key2: 0,

    gwc: [],
    zongfeiyong: 0
  },

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

  huadong: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },

  select00: function (e) {
    var that = this;
    var key = e.currentTarget.dataset.key + 1
    console.log("得分：" + key)
    that.setData({
      key: key - 1,
      key2: key
    })
  },

  pinglun: function (e) {
    var that = this
    if (this.data.user_id.length > 0) {
      console.log("分数：" + this.data.key2 + "| 用户id：" + this.data.user_id + "|产品id：" + this.data.cpid + "|内容：" + e.detail.value.neirong)

      wx.request({
        url: 'http://116.yaoyiwangluo.com/wx_AddPinLun.asp',
        data: {
          cpid: this.data.cpid,
          user_id: this.data.user_id,
          xx: this.data.key2,
          pinlun_neirong: e.detail.value.neirong
        },
        success: function (res) {
          console.log(res.data)
        }
      })

    } else {
      console.log("没有登录")
    }
  },

  jiaGwc: function () {
    var that = this
    if (this.data.user_id.length > 0) {
      console.log("用户id：" + this.data.user_id + "|产品id：" + this.data.cpid + that.data.cp_mingcheng + that.data.jiage)

      //加入购物车
      wx.request({
        url: 'http://116.yaoyiwangluo.com/wx_gwc_add.asp',
        data: {
          cs_uid: this.data.user_id,
          cs_cpid: this.data.cpid,
          cs_cp_mingcheng: that.data.cp_mingcheng,
          cs_jiage: that.data.jiage
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.zt == "yes") {
            wx.showToast({
              title: '加入购物车成功',
            })
          }
          if (res.data.zt == "no") {
            wx.showToast({
              title: '已经在购物车',
            })
          }
        }
      })

    } else {
      console.log("没有登录")
    }
  },

  goumai: function () {
    var that = this
    if (this.data.user_id.length > 0) {
      console.log("登录")
      console.log("用户id：" + this.data.user_id + "|产品id：" + this.data.cpid + that.data.cp_mingcheng + that.data.jiage)

      //加入购物车
      wx.request({
        url: 'http://116.yaoyiwangluo.com/wx_gwc_add.asp',
        data: {
          cs_uid: this.data.user_id,
          cs_cpid: this.data.cpid,
          cs_cp_mingcheng: that.data.cp_mingcheng,
          cs_jiage: that.data.jiage
        },
        success: function (res) {
          console.log(res.data)
          wx.reLaunch({
            url: '/pages/gouwuche/index',
          })
        }
      })

    } else {
      console.log("没有登录")
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取参数，传递过来的产品id
    console.log(options.cpid + options.cpmc)
    that.setData({
      cpid: options.cpid
    })
    //获取系统信息，手机的屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        })
      },
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth
        })
      },
    })

    //获取产品图片
    wx.request({
      url: 'http://116.yaoyiwangluo.com/wx_sp_info-a.asp',
      data: {
        cp_id: options.cpid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          images: res.data.cp_tupian,
          cp_mingcheng: res.data.cp_mingcheng,
          jiage: res.data.jiage,
          cp_jianjie: res.data.cp_jianjie,
          cp_yixiaoshou: res.data.cp_yixiaoshou
        })
      }
    })

    //获取评论信息
    wx.request({
      url: 'http://116.yaoyiwangluo.com/wx_Pinlun_list.asp',
      data: {
        cpid: options.cpid
      },
      success: function (res) {
        that.setData({
          pl: res.data
        })
      }
    })

    //获得用户id
    wx.getStorage({
      key: 'u_id',
      success: function (res) {
        that.setData({
          user_id: res.data
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