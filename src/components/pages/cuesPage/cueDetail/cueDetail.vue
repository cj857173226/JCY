<template>
    <div id="main">
        <div id="header">
            线索详情页
        </div>
        <div id="nav">
            <ul>
                <li :class="isThisNav == 1?'active':''" @click="chooseNav(1)">线索详情</li>
                <li :class="isThisNav == 2?'active':''" @click="chooseNav(2)">审批信息</li>
                <li :class="isThisNav == 3?'active':''" @click="chooseNav(3)">分流下院</li>
            </ul>
        </div>
        <div id="content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isThisNav: 1
        }
    },
    methods: {
        chooseNav(index){
            this.isThisNav = index;
        }
    }
}
</script>

<style lang="scss" scoped>
#main{
    #header{
        height: 50px;
        line-height: 50px;
    }
    #nav{
        border-bottom: solid 1px #ddd;
        ul{
            li{
                display: inline-block;
                height: 30px;
                line-height: 30px;
                width: 100px;
                text-align: center;
                cursor: pointer;
            }
            .active{
                color: #418c66;
                border-bottom: solid 2px #418c66;
            }
        }
    }
    #content{

    }
}
</style>
