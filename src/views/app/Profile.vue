<template>
    <div class="bg-gray-100 min-h-screen">
        <div class="gradient mobile-padding pb-8">
            <div class="flex items-center justify-between relative" style="height: 45px;">
                <img @click="openForm()" v-if="!active" src="@/assets/img/edit.svg" alt="">
                <svg aria-hidden="true" @click="updateForm" v-if="active" focusable="false" data-prefix="fas"
                     data-icon="check" role="img"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                     class="svg-inline--fa fa-check w-6">
                    <path fill="#fff"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                          class=""></path>
                </svg>
                <router-link tag="span" to="/" class="bg-transparent absolute rtl:left-0 ltr:right-0 ">
                    <img src="@/assets/img/back.svg" alt="">
                </router-link>
            </div>
            <div class="text-center mt-4">
                <div class="mx-auto w-28 h-28 mb-2 rounded-full border-2 border-white-900  flex items-center justify-center relative">
<!--                    <svg id="plus-circle" class="absolute z-2 bottom-0 top-0 rtl:right-0 ltr:left-0 rtl:mr-5 ltr:ml-5 mt-3"-->
<!--                         xmlns="http://www.w3.org/2000/svg"-->
<!--                         width="16" height="16" viewBox="0 0 16 16">-->
<!--                        <rect width="16" height="16" opacity="0"/>-->
<!--                        <path d="M8,0a8,8,0,1,0,5.657,2.343A8,8,0,0,0,8,0Z" fill="#21b363"/>-->
<!--                        <path data-name="Path"-->
<!--                              d="M7,5H5V7A1,1,0,0,1,3,7V5H1A1,1,0,0,1,1,3H3V1A1,1,0,0,1,5,1V3H7A1,1,0,0,1,7,5Z"-->
<!--                              transform="translate(4 4)" fill="#fff"/>-->
<!--                    </svg>-->
                    <img class="object-cover w-full h-full p-2px rounded-full" v-if="profile.image" :src="profile.image"
                         alt="profile-pic">
                    <img class="object-cover w-full h-full p-2px rounded-full" v-else src="@/assets/img/avatar.svg"
                         alt="profile-pic">
                </div>
                <p class="text-white-900 font-medium text-xl">{{profile.name}}</p>
                <p class="text-sm text-white-900 font-medium mb-6">{{profile.email}}</p>
                <router-link tag="p" to="/change-password" class="underline text-xs text-white-900">تغيير كلمة المرور
                </router-link>
            </div>
        </div>
        <div class="mobile-padding  py-6">
            <div class="flex items-center mb-6 notifications">
                <h2 class="flex-grow text-base text-blue-800">التنبيهات والاشعارات</h2>
                <label class="switch">
                    <input type="checkbox" @click="toggleCheckbox">
                    <div class="slider round"></div>
                </label>
            </div>
            <div class="mb-6">
                <h2 class="flex-grow text-base text-blue-800 mb-2">المعلومات الشخصية</h2>
                <ul class="flex flex-wrap -mx-3">
                    <li class="w-1/2 mb-2 px-3 profile-box">
                        <div class="flex items-center flex-wrap bg-white-900 py-3 px-4 rounded-10px">
                            <div class="flex items-center w-full">
                                <p class="text-lg text-primary-900 flex-grow" style="margin-left: 12px">العمر</p>

                                <p class="text-base text-blue-800 mr-auto">
                                    <span class="px-2">{{profile.age}}</span>
                                    <span class="text-xs">Yr</span>
                                </p>
                            </div>
                            <Input class="text-lg font-bold w-full" v-model="form.age" v-if="active"/>
                        </div>
                    </li>
                    <li class="w-1/2 mb-2 px-3 profile-box">
                        <div class="flex items-center flex-wrap bg-white-900 py-3 px-4 rounded-10px">
                            <div class="flex items-center w-full">
                                <p class="text-lg text-primary-900 flex-grow" style="margin-left: 12px">الطول</p>
                                <p class="text-base text-blue-800">
                                    <span class="px-2">{{profile.length}}</span>
                                    <span class="text-xs">cm</span>
                                </p>
                            </div>
                            <Input class="text-lg font-bold w-full" v-model="form.length" v-if="active"/>
                        </div>
                    </li>
                    <li class="w-1/2 mb-2 px-3 profile-box">
                        <div class="flex items-center flex-wrap bg-white-900 py-3 px-4 rounded-10px relative">
                            <div class="flex items-center w-full">
                                <p class="text-lg text-primary-900 flex-grow" style="margin-left: 12px">الجنس</p>
                                <p class="text-base text-blue-800">
                                    <span class="px-2">{{profile.gender}}</span>
                                </p>
                            </div>
                            <v-select class="bg-gray-100 w-full text-center" v-if="active"
                                      :options="options"
                                      label="name"
                                      :dir="dirLang" v-model="form.gender">
                            </v-select>
                        </div>
                    </li>
                    <li class="w-1/2 mb-2 px-3 profile-box">
                        <div class="flex items-center flex-wrap bg-white-900 py-3 px-4 rounded-10px">
                            <div class="flex items-center w-full">
                                <p class="text-lg text-primary-900 flex-grow" style="margin-left: 12px">الوزن</p>
                                <p class="text-base text-blue-800">
                                    <span class="px-2">{{profile.weight}}</span>
                                    <span class="text-xs">kg</span>
                                </p>
                            </div>
                            <Input class="text-lg font-bold w-full" v-model="form.weight" v-if="active"/>

                        </div>
                    </li>
                    <li class="w-1/2 mb-2 px-3 profile-box">
                        <div class="flex items-center flex-wrap bg-white-900 py-3 px-4 rounded-10px">
                            <div class="flex items-center w-full">
                                <p class="text-lg text-primary-900 flex-grow" style="margin-left: 12px">البلد</p>
                                <p class="text-base text-blue-800">
                                    <span class="px-2">{{profile.country}}</span>
                                </p>
                            </div>
                            <Input class="text-lg font-bold w-full" v-model="form.country" v-if="active"/>

                        </div>
                    </li>
                    <li class="w-1/2 mb-2 px-3 profile-box">
                        <div class="flex items-center flex-wrap bg-white-900 py-3 px-4 rounded-10px">
                            <div class="flex items-center w-full">
                                <p class="text-lg text-primary-900 flex-grow" style="margin-left: 12px">المدينة</p>

                                <p class="text-base text-blue-800">
                                    <span class="px-2">{{profile.city}}</span>
                                </p>
                            </div>
                            <Input class="text-lg font-bold w-full" v-model="form.city" v-if="active"/>
                        </div>
                    </li>
                </ul>
                <div class="bg-green-100 mt-4 rounded-10px text-center" v-if="success">
                    <p class="p-3 text-base text-blue-800 font-medium">تمت التعديل بنجاح</p>
                </div>
                <div class="flex items-center">
                    <router-link tag="div" to="/my-analysis" class="w-1/2 mt-4 px-3">
                        <div class="flex items-center justify-center bg-primary-900 py-4 px-4 rounded-full">
                            <p class="text-lg font-medium text-white-900 ">تحاليلي</p>
                        </div>
                    </router-link>
                    <router-link tag="div" to="/my-drugs" class="w-1/2 mt-4 px-3">
                        <div class="flex items-center justify-center bg-blue-800 py-4 px-4 rounded-full">
                            <p class="text-lg font-medium text-white-900">أدويتي</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Input from '../../components/app/Input';

    export default {
        data() {
            return {
                checkbox: false,
                profile: {},
                options: ['ذكر', 'انثى'],
                active: false,
                success: false,
                form: {
                    age: null,
                    city: null,
                    gender: null,
                    weight: null,
                    length: null,
                    country: null
                }
            }
        },
        methods: {
            toggleCheckbox() {
                this.checkbox = !this.checkbox;
                this.$emit('setCheckboxVal', this.checkbox)
            },
            openForm() {
                this.active = !this.active;
            },
            updateForm() {
                const $this = this;
                this.active = false;
                this.axios.post('/mobile/user', this.form)
                    .then(res => {
                        this.success = true;
                        location.reload();
                        setTimeout(function () {
                            $this.success = false;
                        }, 3000);
                    });
            }
        },
        components: {
            Input
        },
        created() {
            this.axios.get('/mobile/user/profile')
                .then(response => (this.profile = response.data.data))
        },
        computed: {
            dirLang() {
                return this.$i18n.locale === 'en' ? 'ltr' : 'rtl';
            },
        }
    }
</script>
<style lang="scss">
    .profile-box {
        input {
            padding: 0 !important;
            width: 100%;
            border-radius: 0 !important;
        }

        .vs__dropdown-menu {
            left: 0 !important;
            width: 100% !important;
            min-width: 100%;
        }

        .vs__selected-options {
            flex-wrap: nowrap;
        }
    }

</style>
