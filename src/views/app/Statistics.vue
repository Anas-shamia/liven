<template>
    <div>
        <Bar :title="'الاحصائيات'" :plus="false" :path="'/'"/>

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
            <div class="mb-6">
                <h2 class="text-xl font-medium text-blue-800 mb-4 text-center">waist / hip</h2>
                <div>
                    <highcharts :options="chartOptions4" :style="'height: 250px;'"></highcharts>
                </div>
                <p class="p-color text-xs flex items-center">
                    <span class="w-3 h-3 rounded-full bg-blue-800 ltr:mr-2 rtl:ml-2"></span>
                    waist / hip
                </p>
            </div>
            <div class="mb-6">
                <h2 class="text-xl font-medium text-blue-800 mb-4 text-center">النشاطات</h2>
                <ul class="flex flex-wrap flex-wrap items-center -mx-2 mb-6">
                    <li class="px-2 text-center">
                        <div @click="changeType('1')" class="rounded-25px py-2 px-4 mb-2"
                             :class="selectedType==='1'?'bg-primary-900 text-white-900':'bg-white-900 text-primary-900'"
                        >
                            <span class="text-base font-medium">جري</span>
                        </div>
                    </li>

                    <li class=" px-2 text-center">
                        <div @click="changeType('2')" class="rounded-25px py-2 px-4 mb-2"
                             :class="selectedType==='2'?'bg-primary-900 text-white-900':'bg-white-900 text-primary-900'"
                        >
                            <span class="text-base font-medium">مشي</span>
                        </div>
                    </li>
                    <li class=" px-2 text-center">
                        <div @click="changeType('3')" class="rounded-25px py-2 px-4 mb-2"
                             :class="selectedType==='3'?'bg-primary-900 text-white-900':'bg-white-900 text-primary-900'"
                        >
                            <span class="text-base font-medium">العاب قوى</span>
                        </div>
                    </li>
                    <li class=" px-2 text-center">
                        <div @click="changeType('4')" class="rounded-25px py-2 px-4 mb-2"
                             :class="selectedType==='4'?'bg-primary-900 text-white-900':'bg-white-900 text-primary-900'"
                        >
                            <span class="text-base font-medium">لياقة</span>
                        </div>
                    </li>
                    <!--                    <li class=" px-2 text-center">-->
                    <!--                        <div class="rounded-25px py-2 px-4 mb-2 bg-primary-900 text-white-900">-->
                    <!--                            اخرى-->
                    <!--                        </div>-->
                    <!--                    </li>-->
                </ul>
                <div>
                    <highcharts :options="chartOptions3" :style="'height: 250px;'"></highcharts>
                </div>
                <p class="p-color text-xs flex items-center">
                    <span class="w-3 h-3 rounded-full bg-blue-800 ltr:mr-2 rtl:ml-2"></span>
                    النشاطات
                </p>
            </div>
            <div class="ruler bg-white-900 rounded-lg pt-4 px-4 pb-8" v-if="bmi">
                <h2 class="text-base font-medium text-blue-800 mb-4">معدل BMI</h2>
                <h2 class="text-base font-medium text-primary-900 mb-4">{{bmi.bmi}} <span
                        class="text-xs text-blue-800 pr-2">{{bmi.state}}</span>
                </h2>
                <ul class="flex items-center justify-center ruler relative">
                    <li v-for="(item,index) in 58" :key="index" v-if="bmi"
                        :class="[(index <= '9' ? 'below-color' : ''),((index > '9' && index <= '23') ? 'normal-color' : ''),  ((index > '23' && index <= '36') ? 'overweight' : ''), ((index > 36) ? 'obesity':''),(index === parseInt(bmi.bmi) ? 'active':'')]">
                        <div class="absolute flex items-center values-list">
                            <span v-if="index === 0" class="text-sm text-blue-800 font-bold">15</span>
                            <span v-if="index === 8" class="text-sm text-blue-800 font-bold">18.5</span>
                            <span v-if="index === 22" class="text-sm text-blue-800 font-bold">25</span>
                            <span v-if="index === 35" class="text-sm text-blue-800 font-bold">30</span>
                            <span v-if="index === 56" class="text-sm text-blue-800 font-bold">40</span>
                        </div>
                        <div class="tooltips" v-if="index === parseInt(bmi.bmi) ? 'block':'hidden'">
                            <span :tooltip="bmi.bmi"><span>0</span></span>
                        </div>
                    </li>
                </ul>

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
                selectedTyping: 'today',
                firstLoad: 0,
                selectedType: '0',
                bmi: null,
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
                            name: 'الوزن',
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
                chartOptions4: {
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
                            name: 'النسبة',
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
                chartOptions3: {
                    chart: {
                        type: 'column',
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
                        },
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Minutes'
                        }
                    },
                    legend: {
                        enabled: false,
                    },

                    plotOptions: {
                        series: {
                            pointWidth: 20,
                            pointPadding: 2,
                            borderWidth: 0,

                            dataLabels: {
                                enabled: true,
                            }
                        }
                    },

                    series: [
                        {
                            name: 'النشاط ',
                            data: [],
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
                        this.firstLoad = 1;
                    });
                if(this.firstLoad) {
                    this.selectedTyping = type;
                }
                this.changeChart2(type);
                this.changeChart3(type);
            },
            changeChart2(type) {
                this.selectedChart = type;
                this.chartOptions2.series[0].data = [];
                this.axios.get(`/mobile/diabetes/chart/${this.selectedChart}`)
                    .then(response => {
                        this.bodyAllByType = response.data.data;
                        this.chartOptions2.series[0].data = this.bodyAllByType;
                    });
            },
            changeChart3(type) {
                this.selectedChart = type;
                this.chartOptions4.series[0].data = [];
                this.axios.get(`/mobile/body/waist_hip/chart/${this.selectedChart}`)
                    .then(response => {
                        this.bodyAllByType = response.data.data;
                        this.chartOptions4.series[0].data = this.bodyAllByType;
                    });
            },
            changeType(type) {
                this.selectedType = type;
                this.chartOptions3.series[0].data = [];
                this.axios.get(`/mobile/activity/chart/${this.selectedTyping}?type=${this.selectedType}`)
                    .then(response => {
                        this.bodyAllByType = response.data.data;
                        console.log(this.bodyAllByType);
                        this.chartOptions3.series[0].data = this.bodyAllByType;
                    });
            },

            loadBMI() {
                this.axios.get('/mobile/body/bmi')
                    .then(response => (this.bmi = response.data.data[0]))
            },
        },
        created() {
            this.changeChart('week');
            this.changeType('1');
            this.loadBMI();
        }
    }
</script>
<style scoped lang="scss">
    .ruler {
        li {
            height: 15px;
            border-radius: 5px;
            width: 2px;
            margin: 0 2px;

            .tooltips {
                display: none;
            }

            &.active {
                .tooltips {
                    display: block;

                    span > span {
                        opacity: 0;
                    }
                }

                height: 30px;
            }
        }
    }

    .below-color {
        background-color: #61C5FC;
    }

    .normal-color {
        background-color: #1AFFDA;
    }

    .overweight {
        background-color: #EFC835;
    }

    .obesity {
        background-color: #FF4F64;
    }

    .values-list {
        top: 100%;
        margin-top: 5px;
    }

    [tooltip] {
        position: relative; /* opinion 1 */
    }

    /* Applies to all tooltips */
    [tooltip]::before,
    [tooltip]::after {
        text-transform: none; /* opinion 2 */
        font-size: .9em; /* opinion 3 */
        line-height: 1;
        user-select: none;
        pointer-events: none;
        position: absolute;
        display: none;
        opacity: 0;
    }

    [tooltip]::before {
        content: '';
        border: 5px solid transparent; /* opinion 4 */
        z-index: 1001; /* absurdity 1 */
    }

    [tooltip]::after {
        content: attr(tooltip); /* magic! */
        min-width: 3em;
        max-width: 21em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 1ch 1.5ch;
        border-radius: .3ch;
        box-shadow: 0 1em 2em -.5em rgba(0, 0, 0, 0.35);
        background: #333;
        color: #fff;
        z-index: 1000; /* absurdity 2 */
    }

    /* Make the tooltips respond to hover */
    [tooltip]:hover::before,
    [tooltip]:hover::after {
        display: block;
    }

    /* don't show empty tooltips */
    [tooltip='']::before,
    [tooltip='']::after {
        display: none !important;
    }

    /* FLOW: UP */
    [tooltip]:not([flow])::before,
    [tooltip][flow^="up"]::before {
        bottom: 100%;
        border-bottom-width: 0;
        border-top-color: #333;
    }

    [tooltip]:not([flow])::after,
    [tooltip][flow^="up"]::after {
        bottom: calc(100% + 5px);
    }

    [tooltip]:not([flow])::before,
    [tooltip]:not([flow])::after,
    [tooltip][flow^="up"]::before,
    [tooltip][flow^="up"]::after {
        left: 50%;
        transform: translate(-50%, -.5em);
    }

    /* KEYFRAMES */
    @keyframes tooltips-vert {
        to {
            opacity: .9;
            transform: translate(-50%, 0);
        }
    }

    @keyframes tooltips-horz {
        to {
            opacity: .9;
            transform: translate(0, -50%);
        }
    }

    [tooltip]:not([flow]):hover::before,
    [tooltip]:not([flow]):hover::after,
    [tooltip][flow^="up"]:hover::before,
    [tooltip][flow^="up"]:hover::after {
        animation: tooltips-vert 300ms ease-out forwards;
    }
</style>
