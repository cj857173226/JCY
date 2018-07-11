<template>
    <div id="leader-wait">
        <div id="header">
            <span class="header-icon">
                <i class="fa fa-pencil-square-o"></i>
            </span>
            <span class="header-title">待审批线索</span>

            <!-- <div class="search-wrap clearfix">
                <input class="search-ipt" type="text" v-model="keyword" placeholder="请输入内容" @keyup.13="getInternetCueList">
                <span class="search-btn" @click="getInternetCueList()">
                    <i class="iconfont icon-sousuo"></i>
                </span>
            </div> -->

        </div>
        <div id="content">
            <div class="table-list" ref="cueList">
                <el-table
                    ref="oTable"
                    :data="waitApproval"
                    :max-height="tableH"
                    :height="tableH"
                    style="width: 100%">
                    <el-table-column
                        prop="JBNR"
                        label="内容"
                        min-width="300">
                        <template slot-scope="scope">
                            <el-popover trigger="click" placement="top" max-width="200">
                                <p style="text-indent: 2em;">{{ scope.row.JBNR }}</p>
                                <div slot="reference" class="td-content">
                                {{ scope.row.JBNR}}
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="GJC"
                        label="关键词"
                        min-width="300">
                        <template slot-scope="scope">
                            <el-popover trigger="click" placement="top" max-width="400">
                                <p style="text-indent: 2em;">{{ scope.row.GJC }}</p>
                                <div slot="reference" class="td-content">
                                {{ scope.row.GJC}}
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="XSLB"
                        label="线索类别"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="XSSJBLY"
                        label="线索来源"
                        min-width="110"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="XSFBSJ"
                        label="线索发布时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="XSCJSJ"
                        label="采集时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                        <template slot-scope="scope">
                            <el-button @click="detail(scope.row.XSSJBLY,scope.row.XSBH)"  type="text" size="small">审批</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
            </div>
            <div class="page-wrap">
                <el-pagination
                @current-change="pageTo"
                :page-size="pageSize"
                :current-page="pageNum"
                layout="total, prev, pager, next, jumper"
                :total="totalPages">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'review-cue',
    data(){
        return{
            pageSize:10, //每页条数
            pageNum:1, //当前页
            totalPages: 0, //总条数
            waitApproval: [
                {
                    JBNR:'回去玩传奇我请问你我v区区我',
                    GJC:'扰民,经营,情况,局,烧烤,噪音,中,反映',
                    XSLB:'环境污染',
                    XSSJBLY:'互联网线索',
                    XSFBSJ:'2014-04-28 00:00:00',
                    XSCJSJ:'2018-06-21 07:17:14',
                    XSBH:'QW121FF1HF2F1H0BF1381231'
                },
            ], //待审批线索

            tableH:0, //表格高度
            keyword:'', //关键字
        }
    },
    mounted(){
        this.tableResize();
    },
    methods:{
        //搜索
        getInternetCueList(){

        },
        //跳转分页
        pageTo(){

        },
        //审批
        detail(text,id){
            var type = 0;
            if(text == '举报线索'){
                type = 1
            }else if(text == '互联网线索'){
                type = 2
            }else if(text == '公益诉讼线索'){
                type = 3
            }else if(text == '热点线索'){
                type = 4
            }
            this.$router.push({
                path:'/home/cueDetail',
                query:{type:6,type2:type,nav:2,id:id}
            });
        },
        //表格高度自适应
        tableResize(){
            let _this = this;
            this.$nextTick(function () {
                _this.tableH = _this.$refs.cueList.clientHeight;
                window.addEventListener('resize',_this.resize);
            })
        },
        resize(){
            let _this = this;
            _this.tableH = _this.$refs.cueList.clientHeight;
        }
    },
    //实例销毁钩子
    destroyed(){
      window.removeEventListener('resize',this.resize)
    }
}
</script>

<style lang="scss" scoped>
#leader-wait{
    height: 100%;
    overflow: hidden;
    #header{
        height: 50px;
        line-height: 50px;
        color: #666;
        font-size: 16px;
        border-bottom: solid 1px #dcdcdc;
        background: #eee;
        .header-icon{
            display: inline-block;
            height: 100%;
            width: 40px;
            text-align: center;
            border-right:solid 1px #ddd;
        }
        .header-title{
            padding-left: 15px;
        }
        /*搜索框*/
        .search-wrap{
            float: right;
            background: #FFFFFF;
            height: 42px;
            width: 320px;
            margin-right: 50px;
            margin-top: 4px;
            border: 1px solid #dcdcdc;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            .search-ipt{
            width: 270px;
            float: left;
            font-size: 16px;
            height: 100%;
            border: none;
            padding-left: 10px;
            color: #999999;
            background: transparent;
            }
            .search-btn{
            float: left;
            position: relative;
            height: 100%;
            line-height: 40px;
            width: 48px;
            color: #999999;
            text-align: center;
            cursor: pointer;
            }
            .search-btn:after{
            content: '';
            position: absolute;
            left: 0;
            top: 10px;
            width: 2px;
            height: 20px;
            background: #dcdcdc;
            }
        }
    }
    #content{
        height: calc(100% - 40px);
        .table-list{
            padding-top: 10px;
            height: calc(100% - 70px);
        }
        .page-wrap{
            margin-top: 20px;
            height: 40px;
        }
    }
}
@media (max-width: 1440px) {
    #review{
        #header{
            height: 40px;
            .header-icon{
                width: 40px;
                height: 40px;
                line-height: 40px;
            }
            /*搜索框*/
            .search-wrap{
                height: 32px;
                width: 300px;
                .search-ipt{
                width: 260px;
                font-size: 14px;
                }
                .search-btn{
                line-height: 32px;
                width: 38px;
                }
                .search-btn:after{
                content: '';
                left: 0;
                top: 8px;
                width: 2px;
                height: 14px;
                }
            }
        }
    }
}
</style>
