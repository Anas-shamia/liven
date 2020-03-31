<template>
    <div>
        <Bar :title="'وزن الجسم'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <ul class="flex flex-wrap items-center -mx-2 mb-6">
                <li class="w-1/3 px-2 text-center">
                    <div class="bg-primary-900 text-white-900 rounded-25px py-2">
                        <span class="text-base font-medium">اسبوع</span>
                    </div>
                </li>
                <li class="w-1/3 px-2 text-center">
                    <div class="bg-white-900 text-primary-900 rounded-25px py-2">
                        <span class="text-base font-medium">شهر</span>
                    </div>
                </li>
                <li class="w-1/3 px-2 text-center">
                    <div class="bg-white-900 text-primary-900 rounded-25px py-2">
                        <span class="text-base font-medium">سنة</span>
                    </div>
                </li>
            </ul>
            <div class="mb-6">
                <h2 class="text-xl font-medium text-blue-800 mb-4 text-center">الوزن</h2>
                <highcharts :options="chartOptions" :style="'height: 250px;'"></highcharts>
                <p class="p-color text-xs flex items-center">
                    <span class="w-3 h-3 rounded-full bg-blue-800 ltr:mr-2 rtl:ml-2"></span>
                    دهون الجسم
                </p>
            </div>
            <div v-if="bodyAll.length">
                <div class="mb-4" v-for="(item,index) in bodyAll" :key="index">
                    <p class="text-xs rlt:text-right rtl:text-left p-color mb-2">{{item.date}}</p>
                    <div class="flex flex-wrap -mx-2 2xs:-mx-1">
                        <div class="w-1/3 px-2 2xs:px-1 relative edit-weight-box">
                            <svg @click="openForm" v-if="index===0 && !active" aria-hidden="true" focusable="false"
                                 data-prefix="fas"
                                 data-icon="edit" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                                 class="svg-inline--fa fa-edit w-5 absolute top-0 rtl:right-0 ltr:left-0 rtl:mr-4 mt-3">
                                <path fill="currentColor"
                                      d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
                                      class=""></path>
                            </svg>
                            <svg v-if="active && index===0" @click="openForm" aria-hidden="true" focusable="false"
                                 data-prefix="far"
                                 data-icon="check-square" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                 class="svg-inline--fa fa-edit w-5 absolute top-0 rtl:right-0 ltr:left-0 rtl:mr-4 mt-3">
                                <path fill="#1CC342"
                                      d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352zm-35.864-241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718c4.667 4.706 4.637 12.304-.068 16.971z"
                                      class=""></path>
                            </svg>
                            <div class="bg-white-900 rounded-10px text-center py-4">
                                <p class="text-sm mb-2 p-title">الوزن</p>
                                <p class="text-primary-900">
                                    <span class="text-base font-bold" v-if="index!==0 || (index===0 && !active)">{{item.weight}}</span>
                                    <Input class="text-lg font-bold" v-model="item.weight" v-if="index===0 && active"/>
                                    <span class="text-base font-bold">KG</span>
                                </p>
                            </div>
                        </div><!--col-->
                        <div class="w-1/3 px-2 2xs:px-1 relative edit-weight-box">
                            <svg @click="openForm" v-if="index===0 && !active" aria-hidden="true" focusable="false"
                                 data-prefix="fas"
                                 data-icon="edit" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                                 class="svg-inline--fa fa-edit w-5 absolute top-0 rtl:right-0 ltr:left-0 rtl:mr-4 mt-3">
                                <path fill="currentColor"
                                      d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
                                      class=""></path>
                            </svg>
                            <svg v-if="active && index===0" @click="openForm" aria-hidden="true" focusable="false"
                                 data-prefix="far"
                                 data-icon="check-square" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                 class="svg-inline--fa fa-edit w-5 absolute top-0 rtl:right-0 ltr:left-0 rtl:mr-4 mt-3">
                                <path fill="#1CC342"
                                      d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352zm-35.864-241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718c4.667 4.706 4.637 12.304-.068 16.971z"
                                      class=""></path>
                            </svg>
                            <div class="bg-white-900 rounded-10px text-center py-4">
                                <p class="text-sm mb-2 p-title">Hip</p>
                                <p class="text-primary-900">
                                    <span class="text-base font-bold" v-if="index!==0 || (index===0 && !active)">{{item.highest}}</span>
                                    <Input class="text-lg font-bold" v-model="item.highest" v-if="index===0 && active"/>
                                    <span class="text-base font-bold">CM</span>
                                </p>
                            </div>
                        </div><!--col-->
                        <div class="w-1/3 px-2 2xs:px-1 relative edit-weight-box">
                            <svg @click="openForm" v-if="index===0 && !active" aria-hidden="true" focusable="false"
                                 data-prefix="fas"
                                 data-icon="edit" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                                 class="svg-inline--fa fa-edit w-5 absolute top-0 rtl:right-0 ltr:left-0 rtl:mr-4 mt-3">
                                <path fill="currentColor"
                                      d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
                                      class=""></path>
                            </svg>
                            <svg v-if="active && index===0" @click="openForm" aria-hidden="true" focusable="false"
                                 data-prefix="far"
                                 data-icon="check-square" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                 class="svg-inline--fa fa-edit w-5 absolute top-0 rtl:right-0 ltr:left-0 rtl:mr-4 mt-3">
                                <path fill="#1CC342"
                                      d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352zm-35.864-241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718c4.667 4.706 4.637 12.304-.068 16.971z"
                                      class=""></path>
                            </svg>
                            <div class="bg-white-900 rounded-10px text-center py-4">
                                <p class="text-sm mb-2 p-title">West</p>
                                <p class="text-primary-900">
                                    <span class="text-base font-bold" v-if="index!==0 || (index===0 && !active)">{{item.waist}}</span>
                                    <Input class="text-lg font-bold" v-model="item.waist" v-if="index===0 && active"/>
                                    <span class="text-base font-bold">CM</span>
                                </p>
                            </div>
                        </div><!--col-->
                    </div>
                </div>
            </div>
            <div>
                <div class="mb-4">
                    <p class="text-xs rlt:text-right rtl:text-left p-color mb-2">Add</p>
                    <div class="flex flex-wrap -mx-2 2xs:-mx-1">
                        <div class="w-1/3 px-2 2xs:px-1 relative edit-weight-box">
                            <svg @click="addBody" aria-hidden="true" focusable="false"
                                 data-prefix="far"
                                 data-icon="check-square" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                 class="svg-inline--fa fa-edit w-5 absolute top-0 rtl:right-0 ltr:left-0 rtl:mr-4 mt-3">
                                <path fill="#1CC342"
                                      d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352zm-35.864-241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718c4.667 4.706 4.637 12.304-.068 16.971z"
                                      class=""></path>
                            </svg>
                            <div class="bg-white-900 rounded-10px text-center py-4">
                                <p class="text-sm mb-2 p-title">الوزن</p>
                                <p class="text-primary-900">
                                    <Input class="text-lg font-bold" v-model="form.weight" />
                                    <span class="text-base font-bold">KG</span>
                                </p>
                            </div>
                        </div><!--col-->
                        <div class="w-1/3 px-2 2xs:px-1 relative edit-weight-box">
                            <div class="bg-white-900 rounded-10px text-center py-4">
                                <p class="text-sm mb-2 p-title">Hip</p>
                                <p class="text-primary-900">
                                    <Input class="text-lg font-bold" v-model="form.highest" />
                                    <span class="text-base font-bold">CM</span>
                                </p>
                            </div>
                        </div><!--col-->
                        <div class="w-1/3 px-2 2xs:px-1 relative edit-weight-box">
                            <div class="bg-white-900 rounded-10px text-center py-4">
                                <p class="text-sm mb-2 p-title">West</p>
                                <p class="text-primary-900">
                                    <Input class="text-lg font-bold" v-model="form.waist" />
                                    <span class="text-base font-bold">CM</span>
                                </p>
                            </div>
                        </div><!--col-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Bar from '../../components/app/Bar';
    import Input from '../../components/app/Input';

    export default {
        data() {
            return {
                active: false,
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
                            name: 'CGM',
                            data: [
                                {
                                    name: "15 min",
                                    y: 80,
                                },
                                {
                                    name: "30 min",
                                    y: 90,
                                },
                                {
                                    name: "45 min",
                                    y: 120,
                                },
                                {
                                    name: "60 min",
                                    y: 150,
                                },
                            ]
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

                form: {
                    weight: 0,
                    waist: 0,
                    highest: 0,
                },
                weights: [
                    {
                        date: 'Today , 02:15PM',
                        weight: [
                            {
                                id: '0',
                                title: 'الوزن',
                                num: '82',
                                unit: 'KG'
                            },
                            {
                                id: '1',
                                title: 'Hip',
                                num: '12',
                                unit: 'CM'
                            },
                            {
                                id: '2',
                                title: 'West',
                                num: '30',
                                unit: 'CM'
                            }
                        ]
                    },
                    {
                        date: 'yesterday , 02:15PM',
                        weight: [
                            {
                                title: 'الوزن',
                                num: '83',
                                unit: 'KG'
                            },
                            {
                                title: 'دهون الجسم',
                                num: '12',
                                unit: 'CM'
                            },
                            {
                                title: 'الماء بالجسم',
                                num: '28',
                                unit: 'CM'
                            }
                        ]
                    },
                ],
                bodyAll: [],
            }
        },
        methods: {
            openForm() {
                this.active = !this.active
            },
            loadBodyAll() {
                this.axios.get('/mobile/body/all')
                    .then(response => (this.bodyAll = response.data.data))
            },
        },
        components: {
            Bar,
            Input
        },
        created() {
            this.loadBodyAll();
        }
    }
</script>
<style scoped lang="scss">
    .p-title {
        color: #9393AF;
    }

    .edit-weight-box:not(:first-child) {
        svg {
            display: none;
        }
    }
</style>
