<template>
    <div class="bg-gray-100 min-h-screen">
        <div class="gradient mobile-padding pb-8">
            <div class="flex items-center justify-between relative" style="height: 45px;">
                <img src="@/assets/img/edit.svg" alt="">
                <router-link tag="span" to="/" class="bg-transparent absolute rtl:left-0 ltr:right-0 ">
                    <img src="@/assets/img/back.svg" alt="">
                </router-link>
            </div>
            <div class="text-center mt-4">
                <div class="mx-auto w-28 h-28 mb-2 rounded-full border-2 border-white-900  flex items-center justify-center">
                    <img class="object-cover w-full h-full p-2px rounded-full" v-if="profile.image" :src="profile.image"
                         alt="profile-pic">
                    <img class="object-cover w-full h-full p-2px rounded-full" v-else src="@/assets/img/avatar.svg"
                         alt="profile-pic">
                </div>
                <p class="text-white-900 font-medium text-xl">{{profile.name}}</p>
                <p class="text-sm text-white-900 font-medium mb-6">{{profile.email}}</p>
                <router-link tag="p" to="/change-password" class="underline text-xs text-white-900">تغيير كلمة المرور</router-link>
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
                    <li class="w-1/2 mb-2 px-3">
                        <div class="flex items-center bg-white-900 py-3 px-4 rounded-full">
                            <p class="text-lg text-primary-900 flex-grow">العمر</p>
                            <p class="text-base text-blue-800">
                                <span class="px-2">{{profile.age}}</span>
                                <span class="text-xs">Yr</span>
                            </p>
                        </div>
                    </li>
                    <li class="w-1/2 mb-2 px-3">
                        <div class="flex items-center bg-white-900 py-3 px-4 rounded-full">
                            <p class="text-lg text-primary-900 flex-grow">الطول</p>
                            <p class="text-base text-blue-800">
                                <span class="px-2">{{profile.length}}</span>
                                <span class="text-xs">cm</span>
                            </p>
                        </div>
                    </li>
                    <li class="w-1/2 mb-2 px-3">
                        <div class="flex items-center bg-white-900 py-3 px-4 rounded-full">
                            <p class="text-lg text-primary-900 flex-grow">الجنس</p>
                            <p class="text-base text-blue-800">
                                <span class="px-2">{{profile.gender}}</span>
                            </p>
                        </div>
                    </li>
                    <li class="w-1/2 mb-2 px-3">
                        <div class="flex items-center bg-white-900 py-3 px-4 rounded-full">
                            <p class="text-lg text-primary-900 flex-grow">الوزن</p>
                            <p class="text-base text-blue-800">
                                <span class="px-2">{{profile.weight}}</span>
                                <span class="text-xs">kg</span>
                            </p>
                        </div>
                    </li>
                    <li class="w-1/2 mb-2 px-3" v-if="profile.country">
                        <div class="flex items-center bg-white-900 py-3 px-4 rounded-full">
                            <p class="text-lg text-primary-900 flex-grow">البلد</p>
                            <p class="text-base text-blue-800">
                                <span class="px-2">{{profile.country}}</span>
                            </p>
                        </div>
                    </li>
                    <li class="w-1/2 mb-2 px-3" v-if="profile.city">
                        <div class="flex items-center bg-white-900 py-3 px-4 rounded-full">
                            <p class="text-lg text-primary-900 flex-grow">المدينة</p>
                            <p class="text-base text-blue-800">
                                <span class="px-2">{{profile.city}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
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
    export default {
        data() {
            return {
                checkbox: false,
                profile: {}
            }
        },
        methods: {
            toggleCheckbox() {
                this.checkbox = !this.checkbox;
                this.$emit('setCheckboxVal', this.checkbox)
            }
        },
        created() {
            this.axios.get('/mobile/user/profile')
                .then(response => (this.profile = response.data.data))
        }
    }
</script>
<style scoped lang="scss">

</style>
