<template>
    <div>
        <p class="text-base text-blue-800 mb-2">مقدار الماء</p>
        <div class="bg-white-900 py-2 px-3 rounded-10px progress-bars custom-box">
            <div class="mb-2 flex items-center">
                <p class="flex-grow">
                    <span class="text-4xl font-bold text-blue-800">{{ value }}</span>
                </p>
                <div class="rtl:text-left ltr:text-right">
                    <img class="w-4 rtl:mr-auto ltr:ml-auto" src="@/assets/img/cup.svg" alt="icon">
                    <span class="text-xs text-blue-800 px-2 whitespace-no-wrap">كوب ماء</span>
                </div>
            </div>
            <vue-slider v-model="value" v-bind="options" :direction="dirLang"></vue-slider>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['value'],
        data() {
            return {
                options: {
                    min: 0,
                    height: 6,
                    disabled: true,
                    tooltip: 'none'
                }
            }
        },
        computed: {
            dirLang() {
                return this.$i18n.locale === 'en' ? 'ltr' : 'rtl';
            },
        }
    }
</script>
<style>
    .progress-bars .vue-slider-disabled {
        opacity: 1 !important;
    }
</style>
