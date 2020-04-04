<template>
   <div>
       <Bar :title="'الاحصائيات'" :plus="false" :path="'/'"/>

       <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
           <ul class="flex flex-wrap items-center -mx-2 mb-6">
               <li class="w-1/3 px-2 text-center">
                   <div class="bg-primary-900 text-white-900 rounded-25px py-2">
                       <span class="text-base font-medium">يوم</span>
                   </div>
               </li>
               <li class="w-1/3 px-2 text-center">
                   <div class="bg-white-900 text-primary-900 rounded-25px py-2">
                       <span class="text-base font-medium">اسبوع</span>
                   </div>
               </li>
               <li class="w-1/3 px-2 text-center">
                   <div class="bg-white-900 text-primary-900 rounded-25px py-2">
                       <span class="text-base font-medium">شهر</span>
                   </div>
               </li>
           </ul>
           <div class="mb-8">
               <h2 class="text-xl font-medium text-blue-800 mb-4 text-center">معدل السكر في الدم</h2>
               <highcharts :options="chartOptions2" :style="'height: 250px;'"></highcharts>
               <p class="p-color text-xs flex items-center">
                   <span class="w-3 h-3 rounded-full bg-purple-500 ltr:mr-2 rtl:ml-2"></span>
                   نسبة السكر في الدم
               </p>
           </div>
           <div class="mb-6">
               <h2 class="text-xl font-medium text-blue-800 mb-4 text-center">الوزن</h2>
               <highcharts :options="chartOptions" :style="'height: 250px;'"></highcharts>
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
        components:{
            Bar
        },
        data(){
            return{
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
                            name: 'CGM',
                            data: [
                                {
                                    name: "15 min",
                                    y: 80,
                                },
                                {
                                    name: "30 min",
                                    y: 100,
                                },
                                {
                                    name: "45 min",
                                    y: 200,
                                },
                                {
                                    name: "60 min",
                                    y: 120,
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
                }
            }
        }
    }
</script>
