<template>
    <div id="internetManage">
        <div id="header">
            <div class="header-icon">
                <i class="iconfont icon-boshimao"></i>
            </div>
            <div class="header-title">互联网线索管理</div>

            <!--<div class="search-wrap clearfix">-->
                <!--<i @click="change" style="color:green;width:30px;height:30px;" class="el-icon-circle-plus-outline"></i>-->
            <!--</div>-->
            
            <div class="search-wrap clearfix">
                <input class="search-ipt" type="text" v-model="keyword" placeholder="请输入内容" @keyup.13="getInternetCueList">
                <span class="search-btn" @click="getInternetCueList()">
                    <i class="iconfont icon-sousuo"></i>
                </span>
            </div>
        </div>
        <div id="add-icon">
            <div class="manage-icon">
                <i @click="addInternet"  class="el-icon-circle-plus-outline"></i>
            </div>
        </div>
        <div id="content" ref="cueList" v-loading = "isLoad">
             <el-table
                ref="oTable"
                :data=" internetCueList"
                :max-height="tableH"
                :height="tableH"
                style="width: 100%">
                <el-table-column
                    prop="SFYD"
                    label=""
                    width="40">
                    <template slot-scope="scope" >
                        <i v-show="scope.row.SFYD == 1" class="fa fa-circle isRead"></i>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ZY"
                    label="内容"
                    min-width="300">
                    <template slot-scope="scope">
                    <el-popover trigger="click" placement="top" >
                        <p style="text-indent: 2em;">{{ scope.row.ZY }}</p>
                        <div slot="reference" class="td-content">
                        {{ scope.row.ZY}}
                        </div>
                    </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="FBSJ"
                    label="发布时间"
                    min-width="180"
                >
                </el-table-column>
                <el-table-column
                    prop="CJSJ"
                    label="采集时间"
                    min-width="180"
                >
                </el-table-column>
                <el-table-column
                    prop="XSLB"
                    label="线索类别"
                    min-width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="XSLY"
                    label="线索来源"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="GJC"
                    label="关键词"
                    width="200">
                    <template slot-scope="scope">
                    <el-popover trigger="click" placement="top" >
                        <p>{{ scope.row.GJC }}</p>
                        <div slot="reference" class="td-content">
                        {{ scope.row.GJC}}
                        </div>
                    </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                    <el-button @click="details(scope.$index, scope.row.XSBH)" type="text" size="small">查看</el-button>
                    <el-button @click="followClue(scope.row.XSBH ,'2')" type="text" size="small">关注</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-wrap">
            <el-pagination
            @current-change="pageTo"
            :page-size="pageSize"
            :current-page="page"
            layout="total, prev, pager, next, jumper"
            :total="totalPages">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isLoad:false,
            tableH:0, //表格高度
            internetCueList: [  //互联网线索列表

            ],
            page:1, //页码
            pageSize: 20,//每页条数
            totalPages:0,//总条数
            keyword: '' , //关键字
            type:'', //线索类型
            site:'',//来源站点
            order:'cjsj',//排序方式
        }
    },
    mounted(){
        let _this = this;
        _this.tableResize();//表格高度自适应
        _this.getInternetCueList(); //获取互联网线索列表
    },
    methods:{
        // 页码跳转
        pageTo(curr) {
            let _this = this ;
            _this.page = curr;
            _this.getInternetCueList();
        },
        //获取互联网线索列表
        getInternetCueList(){
            let _this = this;
            if(_this.isLoad ==false){
                _this.isLoad = true;
                let url = webApi.Clue.GetWebClues.format({keyword:_this.keyword,type:_this.type,site:_this.site,order:_this.order,p:_this.page,ps:_this.pageSize})
                _this.axios({
                    methods:'get',
                    url:url,
                    timeout: 10000
                }).then(function(res){
                    _this.isLoad = false;
                    if(res.data.code == 0){
                        let data = res.data.data.data;
                        let ZYstr = '';
                        for(let i = 0;i < data.length; i++){
                            let str = data[i].ZY.split("<br/>");
                            for(let j= 0;j<str.length;j++){
                                ZYstr += str[j];
                            }
                            data[i].ZY = ZYstr;
                        }
                        _this.internetCueList = data;
                    }else {
                        _this.$message.error(res.data.errorMessage);
                    }
                }).catch(function(err){
                    _this.isLoad = false;
                })
            }
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
        },
        addInternet(){

        }
    },
    //实例销毁钩子
    destroyed(){
        window.removeEventListener('resize',this.resize)
    }
}
</script>


<style lang="scss" scoped>
    #internetManage{
        height: 100%;
        max-height:100%;
        min-width: 750px;
        overflow-y:hidden;
        #header{
            height: 50px;
            width: 100%;
            line-height: 50px;
            background: #EEEEEE;
            border-bottom: 1px solid #dcdcdc;
            .header-icon{
                display: inline-block;
                height: 100%;
                width: 40px;
                text-align: center;
                border-right:solid 1px #ddd;
            }
            .header-title{
                display: inline-block;
                height: 100%;
                padding-left: 10px;
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
        #add-icon{
            height: 50px;
            line-height: 50px;
            .manage-icon{
                float: right;
                height: 100%;
                width: 40px;
                text-align: center;
                margin-right: 32px;
                font-size: 25px;
                &:hover {
                    cursor: pointer;
                }
                i {
                    color: green;
                }
            }
        }
        #content{
            height: calc( 100% - 50px - 64px - 50px);
            overflow-y: hidden;
            .isRead{
            color: #F66;
            }
        }
        .page-wrap{
            margin-top: 24px;
            height: 40px;
        }
    }
</style>
