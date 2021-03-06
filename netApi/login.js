const loginUrl = require('../config').loginUrl;
function my_login() {
  wx.checkSession({
    success: function () {
      //session 未过期，并且在本生命周期一直有效
      //clientLogin()
    },
    fail: function () {
      //登录态过期
      clientLogin() //重新登录

    }
  });
}
function clientLogin(successFun,failedFun) {
  wx.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求
        wx.request({
          url: loginUrl,
          data: {
            loginCode: res.code
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (result) {
            let cookie = result.header['Set-Cookie'];
            console.log('1-cookie:' + cookie);
            try {
              wx.setStorageSync('user_token', cookie)
            } catch (e) {
            }
            if(successFun != null) {
              successFun();
            }
          },

          fail: function ({errMsg}) {
            if(failedFun != null) {
              failedFun();
            }
          }
        })
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  });
};
module.exports = {
  my_login: my_login,
  clientLogin: clientLogin
}