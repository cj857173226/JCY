<template>
    <div id="send">
        <el-select class="select" v-model="text">
            <el-option v-bind:value="item.DWMC" :name="item.DWBH" v-for="item in XJY">{{item.DWMC}}</el-option>
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
        this.XJYget();
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
        }
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
