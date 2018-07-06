import Vue from 'vue'
import Router from 'vue-router'
//登录
import login from '../components/pages/login'
//主体框架
import indexPage from '../components/index/index'
//主页
import homePage from '../components/pages/homePage'

//线索
  //举报线索
import reportCue from '../components/pages/cuesPage/reportCue'
  //互联网线索
import internetCue from '../components/pages/cuesPage/internetCue'
  //公益线索
import welfareCue from '../components/pages/cuesPage/welfareCue'
  //热点线索
import heartCue  from '../components/pages/cuesPage/heartCue'

//关注线索
import followCue from '../components/pages/cuesPage/followCue'

//线索详情
import cueDetail from '../components/pages/cuesPage/cueDetail/cueDetail'

//知识库
import knowledge from  '../components/pages/knowledgePage/knowledgePage'
//知识详情页
import  knowledgeDetail from '../components/pages/knowledgePage/knowledgeDetail'

//新闻
import news from  '../components/pages/newsPage/newsPage'
//新闻详情
import newsDetail from '../components/pages/newsPage/newsDetail'

//数据分析
import dataAnalysis from  '../components/pages/dataAnalysis'

Vue.use(Router)

export default new Router({
 	routes:[
    {
      path:'/home',
      component: indexPage,
      name: '主页',
      children:[
        {
          path:'/',
          component:homePage,
          name: '主页',
        },
        {
          path:'reportCue',
          name:reportCue,
          component:reportCue,
          meta:{
            keepAlive: true,
            name:'举报线索'
          }
        },
        {
          path:'internetCue',
          name:internetCue,
          component:internetCue,
          meta:{
            keepAlive: true,
            name:'互联网线索'
          }
        },
        {
          path:'welfareCue',
          name:welfareCue,
          component:welfareCue,
          meta:{
            keepAlive: true,
            name:'公益组织线索'
          }
        },
        {
          path:'heartCue',
          name:heartCue,
          component:heartCue,
          meta:{
            keepAlive: true,
            name:'热点线索'
          }
        },
        {
          path:'followCue',
          name:followCue,
          component:followCue,
          meta:{
            keepAlive: true,
            name:'关注线索'
          }
        },
        {
          path:'cueDetail',
          name:cueDetail,
          component:cueDetail,
          name: '知识库详情',
          meta:{
            name:''
          }
        },
        {
          path:'knowledge',
          name:knowledge,
          component:knowledge,
          meta:{
            name: '知识库',
          }
        },
        {
          path:'knowledgeDetail',
          name:knowledgeDetail,
          component:knowledgeDetail,
          meta:{
            name: '知识库详情',
          }
        },
        {
          path:'news',
          name:news,
          component:news,
          meta:{
            name: '新闻页',
          }
        },
        {
          path:'newsDetail',
          name:newsDetail,
          component:newsDetail,
          meta:{
            name: '新闻页详情',
          }
        },
        {
          path:'dataAnalysis',
          name:dataAnalysis,
          component:dataAnalysis,
          meta:{
            name: '数据分析',
          }
        },
      ]
    },
    {
      path:'/login',
      component:login,
      name: '登录',
    },
    {
      path:'/',
      component:login,
      redirect:'/login',
      name: '登录',
    },
 	]
})
