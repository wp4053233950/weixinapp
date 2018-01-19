// pages/yuandanproject4/mypingdan/mypingdan.js
import RequestEngine from '../../../netApi/requestEngine.js';
var config = require('../../../config.js');
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avctor: [],
    minutes: '00',
    seconds: '00',
    hours: '00',
    shengxianrenshu:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let qrid = options.qrid;
    let orderid = options.orderid;
    this.orderid = orderid;
    this.loadDate();
    this.leftTime = 85000400;
    this.countTime();
  },
  countTime: function () {
    setTimeout(() => {
      this.leftTime -= 1000;
      var days = parseInt(this.leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
      var hours = parseInt(this.leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
      var minutes = parseInt(this.leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
      var seconds = parseInt(this.leftTime / 1000 % 60, 10);//计算剩余的秒数 
      this.countTime();

      this.setData({
        minutes: minutes,
        seconds: seconds,
        hours: hours
      });
    }, 1000);
  },
  loadDate:function(){
    this.onPullDownRefresh();
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
    let that = this;
    new RequestEngine().request(config.queryMergeOrderMembers, { id: this.orderid }, { callBy: this, method: this.onPullDownRefresh, params: [] }, (success) => {
      
      that.setData({
        avctor: success,
        shengxianrenshu: (3 - success.length)
      });
    }, (faild) => {

    }, (requestComplete) => {
      wx.stopPullDownRefresh();
    });

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
  joinMergeOrder:function(){
    let that = this;
    return new Promise((resolve, reject) => {
      new RequestEngine().request(config.joininMergeOrder, { orderid: this.orderid }, { callBy: that, method: that.joinMergeOrder, params: [] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    })
  },
  loadAvctor:function() {
    let that = this;
    return new Promise((resolve,reject)=>{
      wx.getUserInfo({
        success: function (res) {
          let userInfo = res;
          new RequestEngine().request(config.queMercSettled, userInfo, { callBy: that, method: that.loadWxInfo, params: [userInfo] }, (success) => {
            resolve(success);
          }, (faild) => {
            reject(faild);
          });
        }
      })
    });
  },
  pingdan:function(){
    let that = this;
    new Promise((resolve,reject)=>{
      resolve();
    }).then(value=>{
      return this.loadAvctor();
    }).then(value=>{
      return this.joinMergeOrder();
    }).then(value => {
        wx.navigateTo({
          url: '../pingdansuccess/pingdansuccess',
        })
    }).catch(err=>{});
  }
})