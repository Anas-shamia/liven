<template>
    <div>
        <Bar :title="'قياس السكر'" :plus="true" :path="'/add-measurement'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100 relative">
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
                            <span class="px-2">{{item.y}}</span>
                            <span class="text-base">mg/dL</span>
                        </p>
                        <p class="text-xs font-medium rtl:pr-4 ltr:pl-4 p-color flex-grow">
                            <span v-if="item.y<70">منخفض</span>
                            <span v-else-if="item.y>180">مرتفع</span>
                            <span v-else>معتدل</span>
                        </p>
                        <p class="text-xs p-color rtl:pl-3 ltr:pr-3">
                            {{item.time}}
                        </p>
                        <router-link tag="p" :to="`/edit-measurement/edit/${item.id}`">
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                                 class="svg-inline--fa fa-edit w-4">
                                <path fill="currentColor"
                                      d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
                                      class=""></path>
                            </svg>
                        </router-link>
                        <p class="px-2" @click="openDeleteModal(item.id)">
                            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
                                 class="svg-inline--fa fa-times w-3">
                                <path fill="#f00"
                                      d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
                                      class=""></path>
                            </svg>
                        </p>
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
            openDeleteModal(id) {
                this.myId = id;
                this.openDelete = !this.openDelete;
            },
            formatDate($date) {
                const _date = $date.substring(0, $date.length - 3);
                return (new Date(_date).getFullYear() + '-' + (new Date(_date).getMonth() + 1) + '-' + new Date(_date).getDate());
            },
            loadMeasurementAll() {
                this.axios.get('/mobile/diabetes/chart/week')
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
                return this.measurementAllByType = _.orderBy(this.measurementAllByType, ['id'], ['desc']);
            }
        },
        created() {
            this.loadMeasurementAll();
            this.changeChart('week');
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
