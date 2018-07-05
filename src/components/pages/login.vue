<template>
  <div id="public_login">
    <!--<img src="./assets/login/login_box.png" alt="">-->
    <div class="login_head">
      <img src="../../assets/login/logo.png" alt="">
    </div>
    <div class="login_box ">
      <p class="login-title">用&emsp;户&emsp;登&emsp;录</p>
      <div class="login">
        <div class="login_user login-from">
          <div class="login-input-icon">
            <i class="fa fa-user"></i>
          </div>
          <input type="text" name="username" v-model="username" ref="username" @keyup.13="inputFoucs()" placeholder="用户名">
        </div>
        <div class="login_pwd login-from">
          <div class="login-input-icon">
            <i class="fa fa-lock"></i>
          </div>
          <input type="password" name="parssword" v-model="password" ref="password" @keyup.13="loginClick()" placeholder="密码">
        </div>
        <div class="control_pwd">
          <div class="remember_pwd"><input type="checkbox" id="checkbox_pwd" ref="checkbox_pwd" v-bind:checked="isCheck"><label for="checkbox_pwd"></label> 记住密码</div>
          <div class="forget_pwd">忘记密码?</div>
          <div style="clear: both;"></div>
        </div>
        <button class="btn btn-block" id="login-btn" type="button" :disabled="isLogin" @click="loginClick()">登录</button>
      </div>

    </div>
    <div style="clear: both;"></div>
    <!--公司-->
    <div class="CR">
      Copyright © 2018长日科技成都有限公司. All rights reserved.
    </div>
    <!--<div class="recom">
      推荐使用谷歌浏览器
    </div>-->
    <div id="login-load" v-show="isLogin"><img src="../../assets/wait.gif" /> </div>
    <div id="isChrome" v-show="noChrome"> 检测到您不是使用的谷歌浏览器,为了避免页面显示不正常。&nbsp;
      <a href="https://pan.baidu.com/s/1lGLcjXWt1aI_YQjuP0kgGQ" target="_blank" style="cursor: pointer;color: #F00;text-decoration: underline">前去下载</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        username: '',
        password: '',
        isLogin: false,
        noChrome: false,
        isCheck:false,
      }
    },
    mounted() {
      let _this = this;
			let  pwdState = localStorage.getItem("pwdState");
			if(Boolean(pwdState)){
				pwdState = JSON.parse(pwdState);
				this.isCheck = pwdState.isCheck;
				this.username = pwdState.username;
				this.password = pwdState.password;
			}


      var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
      if(isChrome && window.navigator.userAgent.indexOf("compatible") == -1 && window.navigator.userAgent.indexOf("MSIE") == -1 && window.navigator.userAgent.indexOf("Opera") == -1 && window.navigator.userAgent.indexOf("Edge") == -1 && window.navigator.userAgent.indexOf("Firefox") == -1) {
        this.noChrome = false;
      } else {
        this.noChrome = true;
      }


    },
    methods: {
      //登陆
      loginClick() {
        let isCheck = this.$refs.checkbox_pwd.checked
        let url = webApi.Host + webApi.Auth.Login;
        let that = this;
        var jsonVal = {
          'u': that.username,
          'p': that.password
        }
        if(that.username.trim() == '' || that.password.trim()  == '') {
          that.$message({
            showClose: false,
            message: '账号密码不能为空',
            type: 'error',
          });
        } else {
          that.isLogin = true;
          that.axios({
            method:'post',
            url: url,
            data: jsonVal,
          }).then(function(res){
            that.isLogin = false;
            let data =  res.data;
            if(data.code == 0){
              localStorage.setItem("token", data.data);
              that.$router.push({
                path: '/home'
              });
            }else {
              that.$message({
                showClose: false,
                message: data.errorMessage,
                type: 'error',
              });
            }
          }).catch(function(err){
            that.isLogin = false;
              console.log((err))
          })
        }

      },
      inputFoucs: function() {
        var _this = this;
        console.log(_this.username.trim().length)
        if(_this.password.trim() == ''&& _this.username.trim() !='') {
          _this.$refs.password.focus()
        } else if(_this.password.trim() != '' && _this.username.trim() != '') {
          _this.loginClick()
        }
      }
    },
  }
</script>

<style scoped>
  #public_login {
    position: relative;
    background: url("../../assets/login/bg1.jpg") center center no-repeat;
    background-size: cover;
    height: 100%;
    text-align: center;
  }

  .login_box {
    display: inline-block;
    background: url("../../assets/login/login_box.jpg") no-repeat;
    background-size: cover;
    padding: 40px 60px;
    text-align: center;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.4);
  }

  .login-title {
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 30px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    color: #FFFFFF;
  }

  .login .login-from {
    position: relative;
    width: 260px;
  }

  .login input[type=text],
  .login input[type=password] {
    width: 100%;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    line-height: 40px;
    border-radius: 4px;
    padding-left: 40px;
    font-size: 14px;
  }

  .login-input-icon {
    position: absolute;
    height: 100%;
    line-height: 40px;
    width: 40px;
    text-align: center;
    box-sizing: border-box;
    font-size: 18px;
  }

  .login-input-icon>i {
    font-size: 20px !important;
    color: #adadad;
  }

  .login_head {
    align-items: center;
    justify-content: center;
    height: 28%;
  }

  .login_head>img {
    display: inline-block;
    margin-top: 3%;
  }
  /*记住密码,忘记密码*/

  .control_pwd {
    margin-top: 14px;
    font-size: 12px;
  }

  .remember_pwd {
    float: left;
    padding-left: 4px;
    margin-right: 32px;
    font-family: "microsoft yahei";
    color: #333333;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    font-size: 14px;
  }

  .remember_pwd input[type="checkbox"] {
    display: none;
  }

  .remember_pwd input[type="checkbox"]+label {
    position: relative;
    box-sizing: border-box;
    margin: 0;
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 1px solid #565656;
    vertical-align: middle;
    top: -1px;
  }

  .remember_pwd input[type="checkbox"]:checked+label {
    background: url('../../assets/login/check_on.png') no-repeat;
    background-size: cover;
  }

  .forget_pwd {
    float: right;
    color: #0f9030;
    font-size: 14px;
  }

  .forget_pwd:hover {
    cursor: pointer;
  }
  /*用户名*/

  .login_pwd {
    margin-top: 15px;
  }
  /*登陆注册按钮*/
  /*登陆按钮*/

  #login-btn {
    background: #0f9030;
    color: rgba(255, 255, 255, 1);
    border-radius: 4px;
    margin-top: 20px;
    padding: 8px 12px;
    width: 100%;
    border: none;
  }

  #login-btn:focus {
    outline: none;
  }

  #login-btn:active {
    box-shadow: none;
    background: #2a9645;
  }

  #isChrome {
    width: 100%;
    position: absolute;
    font-size: 16px;
    padding: 10px;
    top: 10px;
    left: 0;
    color: #FFFFFF;
    background: rgba(0, 0, 0, 0.2);
  }
  /*公司*/

  .CR {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 30px;
    text-align: center;
    font-size: 18px;
    font-family: 'FZZZHUNHJW--GB1-0';
    color: #baf6a9;
  }
  /*浏览器*/

  .recom {
    position: absolute;
    left: 10px;
    bottom: 10px;
    text-align: left;
    font-size: 16px;
    font-family: 'FZZZHUNHJW--GB1-0';
    color: #f00;
    font-weight: 800;
  }

  #login-load {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    background: rgba(0, 0, 0, 0.3);
  }

  #login-load>img {
    display: inline-block;
    margin-top: 28%;
    width: 32px;
  }

  .clearfix:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
    clear: both;
  }

  @media only screen and (min-width: 1600px) {
    .login-title {
      font-size: 28px;
    }
    .login .login-from {
      position: relative;
      width: 400px;
    }
    .login input[type=text],
    .login input[type=password] {
      width: 100%;
      height: 66px;
      background: #FFFFFF;
      border: 1px solid #E5E5E5;
      line-height: 66px;
      border-radius: 4px;
      padding-left: 60px;
      font-size: 20px;
    }
    .login-input-icon {
      position: absolute;
      height: 100%;
      line-height: 66px;
      width: 60px;
      text-align: center;
      box-sizing: border-box;
      padding-top: 2px;
      font-size: 24px;
    }
    .login-input-icon>i {
      font-size: 26px !important;
      color: #adadad;
    }
    .control_pwd {
      margin-top: 30px;
      font-size: 20px;
    }
    .remember_pwd input[type="checkbox"]+label {
      width: 18px;
      height: 18px;
    }
    .login_pwd {
      margin-top: 40px;
    }
    #login-btn {
      background: #0f9030;
      color: rgba(255, 255, 255, 1);
      border-radius: 4px;
      margin-top: 40px;
      padding: 12px 12px;
      font-size: 24px;
    }
  }
</style>
