const util = require('../utils/util.js');
class Header {
  constructor(contentType){
    this.contentType = contentType
  }

  getHeader() {
    let ua = wx.getStorageSync('user-agent');
    if (!util.textIsNotNull(ua)) {
      wx.getSystemInfo({
        success: function (res) {
          ua = {
            model: res.model,
            screenWidth: res.screenWidth,
            screenHeight: res.screenHeight,
            system: res.system,
            version: res.version,
            platform: 'MCWX'
          }
        }
      });
    }
    let user_token = wx.getStorageSync('user_token');
    return {
      'Content-Type': this.contentType,
      'userAgent': ua,
      'Cookie': user_token
    };
  }
}

export { Header }