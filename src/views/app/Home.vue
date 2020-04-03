<template>
    <div class="bg-gray-100 min-h-screen" v-if="profile">
        <div class="gradient mobile-padding py-4">
            <div class="flex items-center flex-wrap mb-6">
                <div class="w-1/2 flex items-center">
                    <div>
                        <router-link tag="div"
                                     class="w-14 h-14 rounded-full border-2 border-white-900 flex items-center justify-center"
                                     to="/profile">
                            <img class="object-cover w-full h-full p-2px rounded-full"
                                 src="@/assets/img/avatar.svg"
                                 alt="profile-pic"
                                 v-if="profile.user.image === null"
                            >
                            <img class="object-cover w-full h-full p-2px rounded-full"
                                 v-else
                                 :src="profile.user.image"
                                 alt="profile-pic">

                        </router-link>
                    </div>
                    <div class="ltr:pl-2 rtl:pr-2">
                        <p class="text-white-900 text-xl 2xs:text-base">مرحبا <span>{{profile.user.name}}</span></p>
                        <p class="text-white-900 font-light text-xs">أنت الآن في الاسبوع <span>8</span></p>
                    </div>
                </div>
                <div class="w-1/2 ltr:pl-2 rtl:pr-2">
                    <div class="flex items-end mb-2">
                        <p class="text-white-900 font-light text-xs flex-grow">نسبه انجازك لأهدافك</p>
                        <p class="text-white-900 text-xl 2xs:text-base"><span
                                class="text-3xl 2xs:text-lg font-bold">63</span>%</p>
                    </div>
                    <div class="shadow w-full bg-purple-100 rounded-full">
                        <div class="bg-white-900 text-xs leading-none py-1 text-center rounded-full"
                             style="width: 45%"></div>
                    </div>
                </div>
            </div>
            <router-link tag="div" to="/measurement" class="flex items-center measure-sugar box-height mb-6">
                <div class="w-1/3 flex items-center justify-center bg-purple-100 rtl:rounded-r-10px ltr:rounded-l-10px">
                    <h4 class="font-medium text-base text-white-900 mb-0">قياس السكر</h4>
                </div>
                <div class="w-1/3 flex items-center justify-center bg-white-900 mid-div"
                     v-for="(item,index) in this.profile.diabetes" :key="index">
                    <div v-if="index === 0">
                        <p class="text-xs font-light text-blue-800">القراءة الحالية</p>
                        <p class="text-3xl font-bold text-blue-800">
                            {{item.value}}
                            <span class="text-base font-bold">mg/dL</span>
                        </p>
                    </div>
                    <div v-if="index > 0">
                        <p class="text-xs font-light text-purple-100">القراءة السابقة</p>
                        <p class="text-3xl font-bold text-purple-100">
                            {{item.value}}
                            <span class="text-base font-bold">mg/dL</span>
                        </p>
                    </div>
                </div>

                <div class="w-2/3 flex items-center justify-center bg-white-900 mid-div"
                     v-if="!this.profile.diabetes.length">
                    <div>
                        <p class="text-xs font-light text-blue-800">الرجاء اضافة قراءة السكر</p>
                    </div>
                </div>
            </router-link>
            <router-link tag="div" to="/weight" class="flex items-center measure-sugar box-height mb-6">
                <div class="w-1/3 flex items-center justify-center bg-purple-100 rtl:rounded-r-10px ltr:rounded-l-10px">
                    <h4 class="font-medium text-base text-white-900 mb-0">وزن الجسم</h4>
                </div>


                <div class="w-1/3 flex items-center justify-center bg-white-900 mid-div"
                     v-for="(item,index) in this.profile.body" :key="index">
                    <div v-if="index === 0">
                        <p class="text-xs font-light text-blue-800">الوزن الحالي</p>
                        <p class="text-3xl font-bold text-blue-800">
                            {{item.weight}}
                            <span class="text-base font-bold">KG</span>
                        </p>
                    </div>
                    <div v-if="index > 0">
                        <p class="text-xs font-light text-purple-100">الوزن السابق</p>
                        <p class="text-3xl font-bold text-purple-100">
                            {{item.weight}}
                            <span class="text-base font-bold">KG</span>
                        </p>
                    </div>
                </div>

                <div class="w-2/3 flex items-center justify-center bg-white-900 mid-div"
                     v-if="!this.profile.body.length">
                    <div>
                        <p class="text-xs font-light text-blue-800">الرجاء اضافة وزن</p>
                    </div>
                </div>


                <!--                <div class="w-2/3 flex items-center justify-around bg-white-900 rtl:rounded-l-10px ltr:rounded-r-10px px-2 2xs:px-0">-->
                <!--                    <div class="w-1/3 px-1">-->
                <!--                        <p class="text-purple-100 font-light text-xs">الوزن الحالي</p>-->
                <!--                        <p class="text-purple-100 font-bold text-lg">-->
                <!--                            {{profile.body[0].weight}}-->
                <!--                            <span class="text-xs">KG</span>-->
                <!--                        </p>-->
                <!--                    </div>-->
                <!--                    <div class="w-1/3 px-1">-->
                <!--                        <p class="text-purple-100 font-light text-xs">الوزن السابق</p>-->
                <!--                        <p class="text-purple-100 font-bold text-lg">-->
                <!--                            {{profile.body[1].weight}}-->
                <!--                            <span class="text-xs">KG</span>-->
                <!--                        </p>-->
                <!--                    </div>-->
                <!--                </div>-->


            </router-link>
            <div class="flex items-center 2xs:flex-wrap mb-2 -mx-2 5sm:-mx-1">
                <div class="w-full 2xs:w-full box-height mx-2 5sm:mx-1 bg-purple-400 rounded-10px">
                    <div class="flex flex-wrap items-center h-full flex-wrap px-3">
                        <div class="w-1/2 5sm:w-2/3">
                            <h4 class="text-purple-100 text-base font-medium mb-2">المواعيد</h4>
                            <p class="text-white-900 text-xs 5sm:text-xxs">اخصائي التغذية اليوم
                                العاشرة مساءا</p>
                        </div>
                        <div class="w-1/2 5sm:w-1/3 ltr:text-right rtl:text-left">
                            <img class="mb-2 ltr:ml-auto rtl:mr-auto" src="@/assets/img/bill.svg" alt="">
                            <router-link tag="div" to="/appointments" type="button"
                                         class="text-white-900 font-medium text-xs px-3 py-1 rounded-full bg-blue-800 inline-block">
                                المزيد
                            </router-link>
                        </div>
                    </div>
                </div>
                <!--                <div class="w-1/2 2xs:w-full box-height mx-2 5sm:mx-1 bg-purple-400 rounded-10px">-->
                <!--                    <div class="flex flex-wrap items-center h-full flex-wrap px-3">-->
                <!--                        <div class="w-1/2">-->
                <!--                            <h4 class="text-purple-100 text-base font-medium mb-2">النشاط</h4>-->
                <!--                            <p class="text-white-900 text-xl font-bold 4sm:text-base 5sm:text-xs">-->
                <!--                                1248-->
                <!--                                <span class="font-bold text-xxs">STEPS</span>-->
                <!--                            </p>-->
                <!--                        </div>-->
                <!--                        <div class="w-1/2 ltr:text-right rtl:text-left">-->
                <!--                            <img class="ltr:ml-auto rtl:mr-auto img-dir" src="@/assets/img/run.svg" alt="">-->
                <!--                        </div>-->
                <!--                    </div>-->

                <!--                </div>-->
            </div>
        </div>
        <div class="mobile-padding bg-gray-100 py-6">
            <router-link tag="div" to="/advice" class="bg-white-900 rounded-10px text-center py-3 mb-4">
                <h2 class="text-primary-900 font-medium text-base-900 mb-2px">نصيحة اليوم</h2>
                <p class="text-xs font-light text-blue-800 w-4/5 mx-auto">{{profile.advice.title}}</p>
            </router-link>
            <div class="flex flex-wrap -mx-3 5sm:-mx-2 2xs:-mx-1">
                <div class="w-1/4 px-3 5sm:px-2 2xs:px-1 flex items-center justify-center">
                    <router-link tag="div" to="/add-drug" class="bg-white-900 rounded-10px w-full text-center py-4">
                        <img class="mx-auto mb-2" src="@/assets/img/drug.svg" alt="">
                        <p class="text-xs font-medium text-blue-800">اضافة دواء</p>
                    </router-link>
                </div>
                <router-link tag="div" to="/add-meal"
                             class="w-1/4 px-3 5sm:px-2 2xs:px-1 flex items-center justify-center">
                    <div class="bg-white-900 rounded-10px w-full text-center py-4">
                        <img class="mx-auto mb-2" src="@/assets/img/restaurant.svg" alt="">
                        <p class="text-xs font-medium text-blue-800">اضافة وجبة</p>
                    </div>
                </router-link>
                <div class="w-1/4 px-3 5sm:px-2 2xs:px-1 flex items-center justify-center">
                    <router-link tag="div" to="/add-water" class="bg-white-900 rounded-10px w-full text-center py-4">
                        <img class="mx-auto mb-2" src="@/assets/img/drop.svg" alt="">
                        <p class="text-xs font-medium text-blue-800">اضافة ماء</p>
                    </router-link>
                </div>
                <div class="w-1/4 px-3 5sm:px-2 2xs:px-1 flex items-center justify-center">
                    <router-link tag="div" to="/add-activity" class="bg-white-900 rounded-10px w-full text-center py-4">
                        <img class="mx-auto mb-2" src="@/assets/img/gray-run.svg" alt="">
                        <p class="text-xs font-medium text-blue-800">اضافة نشاط</p>
                    </router-link>
                </div>
            </div>

            <ul class="mt-6 flex items-center">
                <router-link tag="li" to="/weight-statistics" class="px-2"><span class="text-xs">احصائيات</span>
                </router-link>
                <router-link tag="li" to="/inquiries-list" class="px-2"><span class="text-xs">استفسارات</span>
                </router-link>
                <router-link tag="li" to="/food-plan" class="px-2"><span class="text-xs">الخطة الغذائية</span>
                </router-link>
            </ul>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                profile: null,
            }
        },
        created() {
            this.axios.get('/mobile/home')
                .then(response => (this.profile = response.data.data))
        }
    }
</script>
<style scoped lang="scss">

    .box-height {
        height: 65px;

        > div {
            height: 100%;
        }
    }


</style>
