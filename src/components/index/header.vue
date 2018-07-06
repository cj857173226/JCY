<template>
  <div id="header" class="clearfix">
      <a class="logo">
        <b>公益诉讼线索综合处理系统</b>
      </a>
      <nav class="navbar clearfix" >
        <!--<a href="#" class="menu-toggle">-->
          <!--<i class="el-icon-sort"></i>-->
        <!--</a>-->

        <div class="navbar-right">
            <ul class="navbar-menu clearfix">
              <li class="navbar-menu-item user-info">您好！您的帐户类型为 : 试用账户,</li>
              <li class="navbar-menu-item user-info">到期时间为 : 2018-6-1</li>
              <li class="navbar-menu-item user-menu clearfix">
                <img src="../../assets/adminlte/avatar.png" class="user-avatar" alt="">
                <span class="user-name">用户名称</span>
              </li>
            </ul>
        </div>
      </nav>
  </div>
</template>

<script>

	 export default {
	   name: "o_header",
	 }

</script>

<style lang="scss"  scoped>
  #header{
    position: relative;
    max-height: 100px;
    z-index: 1030;
    .logo{
      background-color: #00a65a;
      color: #fff;
      border-bottom: 0 solid transparent;
      -webkit-transition: all .3s ease-in-out;
      transition: all .3s ease-in-out;
      display: block;
      float: left;
      height: 50px;
      font-size: 20px;
      line-height: 50px;
      text-align: center;
      width: 275px;
      font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
      padding: 0 15px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: pointer;
      overflow: hidden;
    }
    .logo:hover{
      background:#00a157;
    }
    .navbar{
      background: #00a65a;
      -webkit-transition: margin-left .3s ease-in-out;
      transition: margin-left .3s ease-in-out;
      margin-bottom: 0;
      margin-left: 230px;
      border: none;
      min-height: 50px;
      border-radius: 0;
      .menu-toggle{
        float: left;
        padding: 0 15px;
        height: 50px;
        line-height: 50px;
        color: #FFFFFF;
        -webkit-transition: all .1s ease-in-out;
        transition: all .1s ease-in-out;
      }
      .menu-toggle:hover{
        background:#008d4c;
      }
      .navbar-right{
        height: 50px;
        float: right;
        background: #00a65a;
        .navbar-menu{
          background: #00a65a;
          padding: 0;
          .navbar-menu-item{
            height: 50px;
            line-height: 50px;
            float: left;
            margin-right: 12px;
            font-size: 14px;
            color: #FFFFFF;
          }
          .user-menu{
            margin-right: 0;
            margin-left: 10px ;
            padding: 12px;
            line-height: 26px;
            height: 50px;
            cursor: pointer;
             .user-avatar{
               display: inline-block;
               float: left;
               margin-right: 10px;
               width: 25px;
               height: 25px;
               border-radius: 50%;
             }
            .user-name{
              float: left;
            }

          }
          .user-menu:hover{
            background:#008d4c
          }
        }
      }
    }
  }

  /*@media (max-width: 767px){*/
    /*#header{*/
      /*.logo{*/
        /*width: 100%;*/
      /*}*/
      /*.navbar{*/
        /*margin-left: 0;*/
      /*}*/
    /*}*/
  /*}*/

</style>
