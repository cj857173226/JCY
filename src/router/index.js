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
import cueDetail from '../components/pages/cuesPage/cueDetail'

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
      path:'/',
      component: indexPage,
      children:[
        {
          path:'/',
          component:homePage,
        },
        {
          path:'reportCue',
          name:reportCue,
          component:reportCue,
        },
        {
          path:'internetCue',
          name:internetCue,
          component:internetCue,
        },
        {
          path:'welfareCue',
          name:welfareCue,
          component:welfareCue,
        },
        {
          path:'heartCue',
          name:heartCue,
          component:heartCue,
        },
        {
          path:'followCue',
          name:followCue,
          component:followCue,
        },
        {
          path:'cueDetail',
          name:cueDetail,
          component:cueDetail,
        },
        {
          path:'knowledge',
          name:knowledge,
          component:knowledge,
        },
        {
          path:'knowledgeDetail',
          name:knowledgeDetail,
          component:knowledgeDetail,
        },
        {
          path:'news',
          name:news,
          component:news,
        },
        {
          path:'newsDetail',
          name:newsDetail,
          component:newsDetail,
        },
        {
          path:'dataAnalysis',
          name:dataAnalysis,
          component:dataAnalysis,
        },
      ]
    },
    {
      path:'/login',
      component:login
    },


 	]
})
