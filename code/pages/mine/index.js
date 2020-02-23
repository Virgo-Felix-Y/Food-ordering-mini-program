// pages/mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str_u_login: "",
    str_u_id: "",
    str_u_name: ""
  },
  getWxInfo: function() {
    var myid = "";
    var myname = "";
    var mytouxiang = "";

    wx.getUserInfo({
      success: function(res) {
        myname = res.userInfo.nickName;
        mytouxiang = res.userInfo.avatarUrl
      }
    })
    wx.login({
      success(res) {
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: 'wx9d70b006b32ef75a',
            secret: 'eb23abb7998f4d2b4d124de5635a8575',
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: "GET",
          success: function(res) {
            //获取用户的openid
            myid = res.data.openid

            wx.request({
              url: 'http://116.yaoyiwangluo.com/wx_check_reg_yonghu-weixin.asp',
              data: {
                wx_openid: myid,
                wx_nicheng: myname,
                wx_touxiang: mytouxiang
              },
              success: function(res) {
                console.log(res.data)
                //返回信息写入缓存
                wx.setStorage({
                  key: 'u_login',
                  data: 'yes',
                  success: function() {
                    console.log("写入缓存成功")
                  }
                })
                wx.setStorage({
                  key: 'u_id',
                  data: res.data.uid,
                  success: function() {
                    wx.reLaunch({
                      url: '/pages/mine/index',
                    })
                  }
                })
                wx.setStorage({
                  key: 'u_name',
                  data: "",
                })
              }
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    wx.getStorage({
      key: 'u_id',
      success: function(res) {
        that.setData({
          str_u_id: res.data
        })
      },
    })

    wx.getStorage({
      key: 'u_name',
      success: function(res) {
        that.setData({
          str_u_name: res.data
        })
      },
    })

    wx.getStorage({
      key: 'u_login',
      success: function(res) {
        that.setData({
          str_u_login: res.data
        })
        if (res.data == "yes") {
          wx.navigateTo({
            url: '/pages/mine/index2',
          })
        }
      },
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
    var that = this
    wx.getStorage({
      key: 'u_login',
      success: function(res) {
        that.setData({
          str_u_login: res.data
        })
        if (res.data == "yes") {
          wx.navigateTo({
            url: '/pages/mine/index2',
          })
        }
      },
    })

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