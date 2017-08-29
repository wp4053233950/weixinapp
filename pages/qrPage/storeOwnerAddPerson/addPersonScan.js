// addPersonScan.js
import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var util = require('../../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHidden: true
  },
  analysisQr: function (scene) {
    let that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        that.loadScanQrStep1(userInfo, scene);
      }
    })
    
  },
  loadScanQrStep1: function (userInfo, scene){
    var that = this;
    new Promise((resolve, reject) => {
      var param = JSON.stringify({
        scene: scene,
        userInfo: userInfo
      })
      new RequestEngine().request(config.addStoreAssit, { formData: param }, { callBy: that, method: that.loadScanQrStep1, params: [userInfo, scene] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      })
    }).then(value => {
      this.setData({
        isHidden: false
      });
      if (value.retCode == '0') {
        this.setData({
          faild: false
        });
      } else {
        this.setData({
          faild: true
        });
      }
    }).catch(err => {
      wx.showModal({
        title: '提示',
        content: err,
        showCancel: false
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene);
    scene = "xxxxxxxxxxxxxx";
    if (util.textIsNull(scene)) {
      wx.showModal({
        title: '二维码信息有误',
        showCancel: false
      })
      this.setData({
        isHidden: false,
        faild: true
      });
    } else {
      this.analysisQr(scene);
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