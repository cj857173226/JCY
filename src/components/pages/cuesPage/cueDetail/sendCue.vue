<template>
    <div id="send">
        <el-select class="select" v-model="text">
            <el-option :label="item.DWMC" v-bind:value="item" :name="item.DWBH" v-for="(item,index) in XJY" :key="index">{{item.DWMC}}</el-option>
        </el-select>
        <el-button @click="confirmBtn">确认分流</el-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            XJY:[], //下级院数据
            text:'',
        }
    },
    mounted(){
        if(this.$route.query.type == 5){
            this.XJYget();
        }
    },
    methods:{
        //获取下级院
        XJYget(){
            var _this = this;
            this.axios({
                method:'get',
                url:webApi.Host + webApi.User.GetUserSubOrgs,
                timeout:10000
            }).then(function(response){
                if(response.data.code == 0){
                    _this.XJY = response.data.data;
                }else{

                }
            }).catch(function(error){

            })
        },
        //确认分流
        confirmBtn(){
            console.log(this.text);
            var _this = this;
            this.axios({
                method:'post',
                url:webApi.ClueManager.DispatchClue.format({id:this.$route.query.id,cbdwbh:this.text.DWBH,cbdwmc:this.text.DWMC}),
                timeout:10000
            }).then(function(response){
                if(response.data.code == 0){
                    _this.$message({
                        message:'已成功分流至'+_this.text.DWMC,
                        type:'success'
                    })
                }else{

                }
            }).catch(function(error){

            })
        },
    }
}
</script>

<style lang="scss" scoped>
    #send{
        margin-top: 10px;
        .select{
            width: 60%;
        }
    }
</style>
