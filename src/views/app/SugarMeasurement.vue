<template>
    <div>
        <Bar :title="'قياس السكر'" :plus="true" :path="'/add-measurement'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100 relative">
            <ul class="flex flex-wrap items-center -mx-2 mb-6">
                <li class="w-1/3 px-2 text-center">
                    <div @click="changeChart('today')" class="rounded-25px py-2"
                         :class="selectedChart==='today'?'bg-primary-900 text-white-900':'bg-white-900 text-primary-900'"
                    >
                        <span class="text-base font-medium">يوم</span>
                    </div>
                </li>

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
                        v-for="(item,index) in sortedList" :key="index">
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
                            {{item.time}}
                        </p>
                        <div>
                            <div class="flex items-center justify-end">
                                <router-link tag="p" :to="`/edit-measurement/edit/${item.id}`">
                                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit"
                                         role="img"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                                         class="svg-inline--fa fa-edit w-4">
                                        <path fill="currentColor"
                                              d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
                                              class=""></path>
                                    </svg>
                                </router-link>
                                <p class="px-2" @click="openDeleteModal(item.id)">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt"
                                         role="img"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                         class="svg-inline--fa fa-trash-alt w-3">
                                        <path fill="#ff0000"
                                              d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                                              class=""></path>
                                    </svg>
                                </p>
                            </div>
                            <p class="text-xs p-color rtl:pl-3 ltr:pr-3">
                                {{item.date}}
                            </p>
                        </div>
                    </li>
                </ul>
                <h2 class="text-center text-blue-800 font-medium text-base mb-8" v-if="!measurement.length">يرجى اضافة
                    قياس سكر</h2>
            </div>
            <ConfirmDelete v-if="openDelete" @close="openDelete = false" :id="myId" :url="'/mobile/diabetes'"/>
        </div>
    </div>
</template>
<script>
    import Bar from '../../components/app/Bar';
    import ConfirmDelete from '../../components/ConfirmDelete';

    export default {
        data() {
            return {
                myId: null,
                selectedChart: 'week',
                openDelete: false,
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
            Bar,
            ConfirmDelete
        },
        watch: {
            measurementAllByType($val) {
                if (this.selectedChart === 'today') {
                    this.chartOptions.series[0].data = $val.map(x => {
                        return {
                            name: x.time,
                            y: x.y
                        }
                    });
                } else {
                    this.chartOptions.series[0].data = $val.map(x => {
                        return {
                            name: x.date_style,
                            y: x.y
                        }
                    });
                }

            }
        },
        // this.formatDate(x.created_at)
        methods: {
            openDeleteModal(id) {
                this.myId = id;
                this.openDelete = !this.openDelete;
            },
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
                            // this.chartOptions.series[0].data = this.measurementAllByType;
                        });
                }

            },
        },
        computed: {
            // sortedArray: function () {
            //     return this.measurementAllByType = _.orderBy(this.measurementAllByType, ['id'], ['desc']);
            // },
            sortedList: function () {
                return this.measurement = _.orderBy(this.measurement, ['id'], ['desc']);
            }
        },
        created() {
            this.loadMeasurementAll();
            this.changeChart('today');
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
