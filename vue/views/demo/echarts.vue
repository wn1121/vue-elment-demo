<template>
    <div class="container">
        <div class="echarts">
            <IEcharts :option="option" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
        </div>
    </div>
</template>

<script>
    import IEcharts from 'vue-echarts-v3';
    var option = {
        tooltip: {    //提示框组件
            trigger: 'axis'
        },
        color:['#EEEE00','#FF34B3'],
        legend: {     //图例组件
            data: ['订单数量', '订单金额']
        },
        grid: {       //直角坐标系内绘图网格
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {       //直角坐标系 grid 中的 x 轴
            type: 'category',
            boundaryGap: true,
            data: ['2017-10-23', '2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27', '2017-10-28', '2017-10-29']
        },
        yAxis: {       //直角坐标系 grid 中的 y 轴
            type: 'value'
        },
        series: [      //系列列表
            {
                name: '订单数量',
                type: 'line',
                stack: '总量',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '订单金额',
                type: 'line',
                stack: '总量',
                data: [220, 182, 191, 234, 290, 330, 1000]
            }
        ]

    };
    export default {
        name: 'view',
        components: {
            IEcharts
        },
        props: {
        },
        data: () => ({
            loading: false,
            option: option
        }),
        methods: {
            onReady(instance) {
                console.log(instance);
            },
            onClick(event, instance, echarts) {
                console.log(arguments);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .echarts{
        width: 100%;
        height: 500px;
    }
</style>