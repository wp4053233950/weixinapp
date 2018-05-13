// pages/yuandanproject7/success/success.js
import RequestEngine from '../../../netApi/requestEngine.js';
var config = require('../../../config.js');
var util = require('../../../utils/util.js');
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
    this.qrid = options.qrid;
    console.log('dffffffffffff--->', this.qrid);
    this.isclick = 1;
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
  click:function(){
    if (this.isclick){
      this.freeWatchTv();
      this.isclick = 0;
    }
  },
  freeWatchTv: function () {
    new RequestEngine().request(config.canTrySee, { qrid: this.qrid, optype: 2 }, { callBy: this, method: this.freeWatchTv, params: [] }, (success) => {
      wx.showToast({
        title: '成功',
        icon: 'succes',
        duration: 2000,
        mask: true
      })
    }, (faild) => {

    }, (requestComplete) => {

    });
  }
})