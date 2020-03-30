<template>
    <div>
        <Bar :title="'السجل الغذائي'" :plus="false" :path="'/'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <h2 class="text-xl font-medium text-blue-800 mb-6 text-center">الخطة الغذائية</h2>
            <div class="mb-6">
                <p class="text-xs font-light text-blue-800 mb-2">اليوم</p>
                <div class="flex flex-wrap -mx-2">
                    <router-link tag="div" to="/add-meal" class="w-1/3 px-1">
                        <p class="text-base text-blue-800 mb-2">الوجبات</p>
                        <img class="custom-box w-full object-cover rounded-10px" src="@/assets/img/meal.jpg" alt="">
                    </router-link>
                    <router-link tag="div" to="/add-water" class="w-1/3 px-1">
                        <Slider :value="3"/>
                    </router-link>
                    <router-link tag="div" to="/add-drug" class="w-1/3 px-1 ">
                        <p class="text-base text-blue-800 mb-2">الدواء</p>
                        <div class="bg-white-900 py-2 px-3 rounded-10px progress-bars custom-box">
                            <div class="mb-2">
                                <p class="text-xs text-purple-100 mb-1 font-semibold">
                                    Erythrocytes
                                </p>
                                <p class="text-xs text-blue-800 mb-1">ميعاد الدواء</p>
                                <p class="flex items-center">
                                    <span class="text-xxs p-color whitespace-no-wrap 5sm:whitespace-normal">02:30 PM</span>
                                    <span class="px-2 p-color">-</span>
                                    <span class="text-xxs p-color whitespace-no-wrap 5sm:whitespace-normal">06:30 PM</span>
                                </p>
                            </div>

                        </div>
                    </router-link>
                </div>
            </div>
            <div class="mb-6">
                <p class="text-xs font-light text-blue-800 mb-2">اليوم</p>
                <div class="flex flex-wrap -mx-2">
                    <router-link tag="div" to="/add-meal" class="w-1/3 px-1">
                        <p class="text-base text-blue-800 mb-2">الوجبات</p>
                        <img class="custom-box w-full object-cover rounded-10px" src="@/assets/img/meal.jpg" alt="">
                    </router-link>
                    <router-link tag="div" to="/add-water" class="w-1/3 px-1">
                        <Slider :value="4"/>
                    </router-link>
                    <router-link tag="div" to="/add-drug" class="w-1/3 px-1 ">
                        <p class="text-base text-blue-800 mb-2">الدواء</p>
                        <div class="bg-white-900 py-2 px-3 rounded-10px progress-bars custom-box">
                            <div class="mb-2">
                                <p class="text-xs text-purple-100 mb-1 font-semibold">
                                    Erythrocytes
                                </p>
                                <p class="text-xs text-blue-800 mb-1">ميعاد الدواء</p>
                                <p class="flex items-center">
                                    <span class="text-xxs p-color whitespace-no-wrap 5sm:whitespace-normal">02:30 PM</span>
                                    <span class="px-2 p-color">-</span>
                                    <span class="text-xxs p-color whitespace-no-wrap 5sm:whitespace-normal">06:30 PM</span>
                                </p>
                            </div>

                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Slider from '../../components/app/VueSlider'
    import Bar from '../../components/app/Bar';

    export default {
        components: {
            Slider,
            Bar
        }
    }
</script>
<style lang="scss">
    .custom-box {
        height: 90px;
    }
</style>
