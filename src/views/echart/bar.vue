<template>
<div>
<div id="chart-bar" style="width: 600px;height:400px;"></div>
<div>echart 文档：https://echarts.apache.org/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts</div>
</div>
</template>

<script>
import echarts from 'echarts'

export default {
    name: 'Bar',
    data() {
        return {}
    },
    mounted() {
        this.drawbar();
    },
    methods: {
        drawbar() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart-bar'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });

        }
    }
}
</script>
