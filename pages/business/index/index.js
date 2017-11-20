// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var assisttype = wx.getStorageSync('assisttype');
      //0:店长 1：店员 2：普通用户
      this.setData({
        assisttype: assisttype
      });
    } catch (e) {
      // Do something when catch error
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

  onPostCoupClick:function(e){
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.navigateTo({
                url: '../postCoup/postCoup',
              })
            },
            fail() {
              wx.openSetting({
                success: (res) => {
                }
              })
            }
          })
        } else {
          wx.navigateTo({
            url: '../postCoup/postCoup',
          })
        }
      }
    })
   
  },
  onMyCoupsClick:function(e){
    wx.navigateTo({
      url: '../totalCoup/coups',
    })
  },
  onNoticeClick:function(e){
    wx.navigateTo({
      url: '../notice/notice',
    })
  },
  onManagerClick:function(e) {
    wx.navigateTo({
      url: '../personManager/persons',
    })
  }
})