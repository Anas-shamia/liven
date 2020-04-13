<template>
    <div>
        <Bar :title="'قياس السكر'" :plus="true" :path="'/add-measurement'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <ul class="flex flex-wrap items-center -mx-2 mb-6">
                <li class="w-1/3 px-2 text-center">
                    <div @click="changeChart('week')" class="rounded-25px py-2"
                         :class="selectedChart==='week'?'bg-primary-900 text-white-900':'bg-white-900 text-primary-900'"
                    >
                        <span class="text-base font-medium">اسبوع</span>
                    </div>
                </li>
                <li class="w-1/3 px-2 text-center">
                    <div @click="changeChart('month')" class="rounded-25px py-2"
                         :class="selectedChart==='month'?'bg-primary-900 text-white-900':'bg-white-900 text-primary-900'"
                    >
                        <span class="text-base font-medium">شهر</span>
                    </div>
                </li>
                <li class="w-1/3 px-2 text-center">
                    <div @click="changeChart('year')" class="rounded-25px py-2"
                         :class="selectedChart==='year'?'bg-primary-900 text-white-900':'bg-white-900 text-primary-900'"
                    >
                        <span class="text-base font-medium">سنة</span>
                    </div>
                </li>
            </ul>
            <div>
                <h2 class="text-xl font-medium text-blue-800 mb-4 text-center">معدل السكر في الدم</h2>
                <highcharts :options="chartOptions" :style="'height: 250px;'"></highcharts>
                <p class="p-color text-xs flex items-center">
                    <span class="w-3 h-3 rounded-full bg-purple-500 ltr:mr-2 rtl:ml-2"></span>
                    نسبة السكر في الدم
                </p>
            </div>
            <div class="mt-4">
                <h2 class="text-xl font-medium text-blue-800 mb-4 text-center">قياس السكر</h2>
                <ul class="measurements">
                    <li class="bg-white-900 rounded-25px mb-4 flex items-center px-3 py-2px"
                        v-for="(item,index) in sortedArray" :key="index">
                        <p class="w-30% text-primary-900 text-3xl font-bold rtl:border-l ltr:border-r measure">
                            <span class="px-2">{{item.value}}</span>
                            <span class="text-base">mg/dL</span>
                        </p>
                        <p class="text-xs font-medium rtl:pr-4 ltr:pl-4 p-color flex-grow">
                            <span v-if="item.value<70">منخفض</span>
                            <span v-else-if="item.value>180">مرتفع</span>
                            <span v-else>معتدل</span>
                        </p>
                        <p class="text-xs p-color rtl:pl-3 ltr:pr-3">
                            {{item.created_at}}
                        </p>
                    </li>
                </ul>
                <h2 class="text-center text-blue-800 font-medium text-base mb-8" v-if="!measurement.length">يرجى اضافة
                    قياس سكر</h2>
            </div>
        </div>
    </div>
</template>
<script>
    import Bar from '../../components/app/Bar';

    export default {
        data() {
            return {
                selectedChart: 'week',
                measurement: [],
                chartOptions: {
                    chart: {
                        type: 'spline',
                        backgroundColor: 'transparent'
                    },
                    title: {
                        text: ''
                    },
                    credits: {
                        enabled: false
                    },
                    accessibility: {
                        announceNewData: {
                            enabled: true
                        }
                    },
                    xAxis: {
                        type: 'category',
                        title: {
                            text: ''
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        plotLines: [{
                            value: 70,
                            color: 'red',
                            dashStyle: 'shortdash',
                            width: 2,
                            label: {
                                text: '70 mg/dl'
                            }
                        }, {
                            value: 180,
                            color: 'red',
                            dashStyle: 'shortdash',
                            width: 2,
                            label: {
                                text: '180 mg/dl'
                            }
                        }]
                    },
                    legend: {
                        enabled: false,
                    },

                    plotOptions: {
                        series: {
                            color: '#9355AA',
                            dataLabels: {
                                enabled: true,
                            }
                        }
                    },

                    series: [
                        {
                            name: 'معدل السكر ',
                            data: []
                        }
                    ],

                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 576
                            },
                        }]
                    }
                },
                measurementAllByType: [],
            }
        },
        components: {
            Bar
        },
        watch: {
            measurement($val) {
                $val = _.orderBy($val, ['id'], ['asc']);
                this.chartOptions.series[0].data = $val.map(x => {
                    return {
                        name: x.timing,
                        y: x.value
                    }
                });
            }
        },
        // this.formatDate(x.created_at)
        methods: {
            formatDate($date) {
                const _date = $date.substring(0, $date.length - 3);
                return (new Date(_date).getFullYear() + '-' + (new Date(_date).getMonth() + 1) + '-' + new Date(_date).getDate());
            },
            loadMeasurementAll() {
                this.axios.get('/mobile/diabetes/all')
                    .then(response => (this.measurement = response.data.data))
            },
            changeChart(type) {
                if (type === '') {
                    return;
                } else {
                    this.selectedChart = type;
                    this.chartOptions.series[0].data = [];
                    this.axios.get(`/mobile/diabetes/chart/${this.selectedChart}`)
                        .then(response => {
                            this.measurementAllByType = response.data.data;
                            this.chartOptions.series[0].data = this.measurementAllByType;
                        });
                }

            },
        },
        computed: {
            sortedArray: function () {
                return this.measurement = _.orderBy(this.measurement, ['id'], ['desc']);
            }
        },
        created() {
            this.loadMeasurementAll();
            this.changeChart('');
        }
    }
</script>
<style lang="scss" scoped>
    .measurements {
        .measure {
            border-color: #DADADA;
        }
    }
</style>
