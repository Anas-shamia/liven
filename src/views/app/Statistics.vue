<template>
    <div>
        <Bar :title="'الاحصائيات'" :plus="false" :path="'/'"/>

        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <ul class="flex flex-wrap items-center -mx-2 mb-6">
                <li class="w-1/3 px-2 text-center">
                    <div @click="changeChart('week');changeChart2('week')" class="rounded-25px py-2"
                         :class="selectedChart==='week'?'bg-primary-900 text-white-900':'bg-white-900 text-primary-900'"
                    >
                        <span class="text-base font-medium">اسبوع</span>
                    </div>
                </li>
                <li class="w-1/3 px-2 text-center">
                    <div @click="changeChart('month');changeChart2('month')" class="rounded-25px py-2"
                         :class="selectedChart==='month'?'bg-primary-900 text-white-900':'bg-white-900 text-primary-900'"
                    >
                        <span class="text-base font-medium">شهر</span>
                    </div>
                </li>
                <li class="w-1/3 px-2 text-center">
                    <div @click="changeChart('year');changeChart2('year')" class="rounded-25px py-2"
                         :class="selectedChart==='year'?'bg-primary-900 text-white-900':'bg-white-900 text-primary-900'"
                    >
                        <span class="text-base font-medium">سنة</span>
                    </div>
                </li>
            </ul>
            <div class="mb-8">
                <h2 class="text-xl font-medium text-blue-800 mb-4 text-center">معدل السكر في الدم</h2>
                <router-link tag="div" to="/measurement">
                    <highcharts :options="chartOptions2" :style="'height: 250px;'"></highcharts>
                </router-link>
                <p class="p-color text-xs flex items-center">
                    <span class="w-3 h-3 rounded-full bg-purple-500 ltr:mr-2 rtl:ml-2"></span>
                    نسبة السكر في الدم
                </p>
            </div>
            <div class="mb-6">
                <h2 class="text-xl font-medium text-blue-800 mb-4 text-center">الوزن</h2>
                <router-link tag="div" to="/weight">
                    <highcharts :options="chartOptions" :style="'height: 250px;'"></highcharts>
                </router-link>
                <p class="p-color text-xs flex items-center">
                    <span class="w-3 h-3 rounded-full bg-blue-800 ltr:mr-2 rtl:ml-2"></span>
                    الوزن
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import Bar from '../../components/app/Bar';

    export default {
        components: {
            Bar
        },
        data() {
            return {
                selectedChart: 'week',
                chartOptions: {
                    active: false,
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
                        }
                    },
                    legend: {
                        enabled: false,
                    },

                    plotOptions: {
                        series: {
                            color: '#14123D',
                            dataLabels: {
                                enabled: true,
                            }
                        }
                    },

                    series: [
                        {
                            name: 'معدل السكر',
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
                chartOptions2: {
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
                        }
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
                            name: 'معدل السكر',
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
                }
            }
        },
        methods: {
            changeChart(type) {
                this.selectedChart = type;
                this.chartOptions.series[0].data = [];
                this.axios.get(`/mobile/body/chart/${this.selectedChart}`)
                    .then(response => {
                        this.bodyAllByType = response.data.data;
                        this.chartOptions.series[0].data = this.bodyAllByType;
                    });
            },
            changeChart2(type) {
                this.selectedChart = type;
                this.chartOptions2.series[0].data = [];
                this.axios.get(`/mobile/diabetes/chart/${this.selectedChart}`)
                    .then(response => {
                        this.bodyAllByType = response.data.data;
                        this.chartOptions2.series[0].data = this.bodyAllByType;
                    });
            }
        },
        created() {
            this.changeChart('week');
            this.changeChart2('week');
        }
    }
</script>
