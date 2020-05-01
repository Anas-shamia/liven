<template>
    <div class="bg-gray-100 min-h-screen relative" v-if="profile">
        <div class="gradient mobile-padding py-4">
            <div class="flex items-center flex-wrap mb-2">
                <div class="w-full flex items-center">
                    <div>
                        <router-link tag="div"
                                     class="w-14 h-14 rounded-full border-2 border-white-900 flex items-center justify-center"
                                     to="/profile">
                            <img class="object-cover w-full h-full p-2px rounded-full"
                                 src="@/assets/img/avatar.svg"
                                 alt="profile-pic"
                                 v-if="!profile.user.url"
                            >
                            <img class="object-cover w-full h-full p-2px rounded-full"
                                 v-else
                                 :src="profile.user.url"
                                 alt="profile-pic">

                        </router-link>
                    </div>
                    <div class="ltr:pl-2 rtl:pr-2">
                        <p class="text-white-900 text-xl 2xs:text-base">مرحبا <span>{{profile.user.name}}</span></p>
                        <p class="text-white-900 font-light text-xs mt-2">أنت الآن في الاسبوع
                            <span>{{profile.user.weeks}}</span></p>
                    </div>
                </div>
            </div>
            <div class="flex items-center mb-6">
                <div class="w-full ltr:pl-2 rtl:pr-2">
                    <div class="flex items-end mb-2">
                        <p class="text-white-900 font-light text-xs flex-grow">نسبه انجازك لأهدافك</p>
                        <p class="text-xl 2xs:text-base" v-if="profile.user.completion_rate"
                           :class="profile.user.completion_rate < 50 ? 'orange-color':'green-color'">
                            <span class="text-3xl 2xs:text-lg font-bold">{{profile.user.completion_rate}}</span>%</p>
                        <p class="text-white-900 text-xl 2xs:text-base" v-else>
                            <span class="text-3xl 2xs:text-lg font-bold">0</span>%</p>
                    </div>
                    <div class="shadow w-full bg-purple-100 rounded-full">
                        <div v-if="profile.user.completion_rate"
                             class="text-xs leading-none py-1 text-center rounded-full"
                             :class="profile.user.completion_rate < 50 ? 'orange':'green'"
                             :style="`width: ${profile.user.completion_rate}%`"></div>
                        <div v-else class="orange text-xs leading-none py-1 text-center rounded-full"
                             style="width: 0"></div>
                    </div>
                </div>
            </div>
            <router-link tag="div" to="/measurement" class="flex items-center measure-sugar box-height mb-6">
                <div class="w-1/3 flex items-center justify-center bg-purple-100 rtl:rounded-r-10px ltr:rounded-l-10px">
                    <h4 class="font-medium text-base text-white-900 mb-0">قياس السكر</h4>
                </div>
                <div class="flex items-center justify-center bg-white-900 mid-div"
                     v-for="(item,index) in this.profile.diabetes" :key="index"
                     :class="profile.diabetes.length === 1 ? 'w-2/3' :'w-1/3'">
                    <div v-if="index === 0">
                        <p class="text-xs font-light text-blue-800">القراءة الحالية</p>
                        <p class="text-3xl font-bold"
                           :class="(item.value<70 || item.value>180)?'orange-color':'green-color'">
                            <span class="text-base font-bold inline-block">mg/dL</span>
                            {{item.value}}
                        </p>
                    </div>
                    <div v-if="index > 0">
                        <p class="text-xs font-light text-purple-100">القراءة السابقة</p>
                        <p class="text-3xl font-bold"
                           :class="(item.value<70 || item.value>180)?'orange-color':'gray-color'">
                            <span class="text-base font-bold inline-block">mg/dL</span>

                            {{item.value}}
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
                    <h4 class="font-medium text-base text-white-900 mb-0">قياسات الجسم</h4>
                </div>


                <div class="w-1/3 flex items-center justify-center bg-white-900 mid-div"
                     v-for="(item,index) in this.profile.body" :key="index"
                     :class="profile.body.length===1 ? 'w-2/3' :'w-1/3'">
                    <div v-if="index === 0">
                        <p class="text-xs font-light text-blue-800">الوزن الحالي</p>
                        <p class="text-3xl font-bold"
                           :class="(item.bmi>25?'orange-color':'') || (item.bmi < 25 ? 'green-color':'')">
                            <span class="text-base font-bold inline-block">KG</span>
                            {{item.weight}}
                        </p>
                    </div>
                    <div v-if="index > 0">
                        <p class="text-xs font-light text-purple-100">الوزن السابق</p>
                        <p class="text-3xl font-bold"
                           :class="(item.bmi>25?'gray-color':'') || (item.bmi < 25 ? 'gray-color':'')">
                            <span class="text-base font-bold inline-block">KG</span>
                            {{item.weight}}
                        </p>
                    </div>
                </div>

                <div class="w-2/3 flex items-center justify-center bg-white-900 mid-div"
                     v-if="!this.profile.body.length">
                    <div>
                        <p class="text-xs font-light text-blue-800">الوزن الحالي</p>
                        <p class="text-3xl font-bold text-blue-800">
                            <span class="text-base font-bold inline-block">KG</span>
                            {{profile.user.weight}}
                        </p>
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
                <div class="w-3/4 2xs:w-full box-height mx-2 5sm:mx-1 bg-purple-400 rounded-10px">
                    <div class="flex flex-wrap items-center h-full flex-wrap px-3 ">
                        <div class="w-3/4">
                            <h4 class="text-purple-100 text-base font-medium mb-2">المواعيد</h4>
                            <p class="text-white-900 text-xxs" v-if="profile.appointment.length">
                                لديك موعد مع الأخصائي بتاريخ {{profile.appointment[0].reserved_date}} من الساعة
                                {{profile.appointment[0].appointment.from}} الى الساعة
                                {{profile.appointment[0].appointment.to}}
                            </p>

                            <p class="text-white-900 text-xs 5sm:text-xxs" v-else>
                                الرجاء اختيار موعد مع أخصائي التغذية الخاص بك
                            </p>

                        </div>
                        <div class="w-1/4 ltr:text-right rtl:text-left">
                            <img class="mb-2 ltr:ml-auto rtl:mr-auto" src="@/assets/img/bill.svg" alt="">
                            <router-link tag="div" to="/appointments" type="button"
                                         class="text-white-900 font-medium text-xs px-3 py-1 rounded-full bg-blue-800 inline-block">
                                المزيد
                            </router-link>
                        </div>
                    </div>
                </div>
                <router-link to="/call" class="w-1/4 2xs:w-full box-height mx-2 5sm:mx-1 bg-purple-400 rounded-10px 2xs:mt-4">
                    <div class="flex flex-wrap items-center justify-center h-full flex-wrap px-3">
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="phone" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                             class="svg-inline--fa fa-phone w-8">
                            <path fill="#fff"
                                  d="M476.5 22.9L382.3 1.2c-21.6-5-43.6 6.2-52.3 26.6l-43.5 101.5c-8 18.6-2.6 40.6 13.1 53.4l40 32.7C311 267.8 267.8 311 215.4 339.5l-32.7-40c-12.8-15.7-34.8-21.1-53.4-13.1L27.7 329.9c-20.4 8.7-31.5 30.7-26.6 52.3l21.7 94.2c4.8 20.9 23.2 35.5 44.6 35.5C312.3 512 512 313.7 512 67.5c0-21.4-14.6-39.8-35.5-44.6zM69.3 464l-20.9-90.7 98.2-42.1 55.7 68.1c98.8-46.4 150.6-98 197-197l-68.1-55.7 42.1-98.2L464 69.3C463 286.9 286.9 463 69.3 464z"
                                  class=""></path>
                        </svg>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="mobile-padding bg-gray-100 py-6">
            <router-link tag="div" to="/advice" class="bg-white-900 rounded-10px text-center py-3 mb-4">
                <h2 class="text-primary-900 font-medium text-base-900 mb-2px">نصيحة اليوم</h2>
                <p class="text-xs font-light text-blue-800 w-4/5 mx-auto" v-if="profile.advice">
                    {{profile.advice.title}}
                </p>
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

            <!--            <ul class="mt-6 flex items-center">-->
            <!--                <router-link tag="li" to="/weight-statistics" class="px-2"><span class="text-xs">احصائيات</span>-->
            <!--                </router-link>-->
            <!--                <router-link tag="li" to="/inquiries-list" class="px-2"><span class="text-xs">استفسارات</span>-->
            <!--                </router-link>-->
            <!--                <router-link tag="li" to="/food-plan" class="px-2"><span class="text-xs">الخطة الغذائية</span>-->
            <!--                </router-link>-->
            <!--            </ul>-->
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
            let $user_id = this.$route.query.user_id;
            let url = '/mobile/home';
            if ($user_id)
                url = `/mobile/user/${$user_id}/liven_app/token`;

            this.axios.get(url)
                .then(res => {
                    const $data = res.data;
                    this.profile = $data.data;
                    localStorage.setItem('user_id', this.profile.user.id);
                    if ($data.hasOwnProperty('token')) {
                        localStorage.setItem('token', $data.token);
                    }
                });
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

    .orange-color {
        color: #DB7E12;
    }

    .green-color {
        color: #009D24;
    }
    .gray-color{
        color: #BBBBBB;
    }
    .orange {
        background: #DB7E12;
    }

    .green {
        background: #009D24;
    }


</style>
