<template>
    <div>
        <Bar :title="'المواعيد'" :close="'/appointments'"/>
        <div class="mobile-padding py-4 min-h-screen bg-gray-100">
            <h2 class="text-2xl font-medium text-blue-800 mb-8 text-center">موعد جديد</h2>
            <ValidationObserver ref="addAppoint">
                <form @submit.prevent="handleSubmit" class="mt-4">

                    <!--                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"-->
                    <!--                                        vid="title" name="address" rules="required"-->
                    <!--                                        v-slot="{ errors }">-->
                    <div class="flex items-center flex-wrap mb-4">
                        <label class="w-1/4 text-base text-blue-800 rtl:pl-8 ltr:pr-8">التاريخ</label>
                        <div class="w-3/4 bg-white-900 rounded-25px py-3 px-6 focus:outline-none">
                            <v-date-picker
                                    v-model='form.date'
                                    :dir="dirLang"
                                    :popover="popover"
                                    :available-dates="dates.days"
                                    :min-date="dates.minDate"
                                    :input-props='{
                          class: "border-none focus:outline-none",
                          placeholder: "تاريخ الموعد"
                        }'
                            />
                        </div>
                    </div>

                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="timing" name="timing" rules="required"
                                        v-slot="{ errors, touched }">
                        <label class="w-1/4 text-base text-blue-800 rtl:pl-8 ltr:pr-8">الوقت</label>
                        <datetime type="time"
                                  class="theme-purple w-3/4 bg-white-900 rounded-25px py-3 px-6 focus:outline-none"
                                  :class="{ 'has-danger': (errors.length && touched) }"
                                  v-model="form.timing"
                                  placeholder="وقت الدواء" use12-hour></datetime>
                        <p class="message-danger" v-if="touched">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div" vid="notes"
                                        name="notes"
                                        rules="required"
                                        v-slot="{ errors }">
                        <label class="w-full text-base text-blue-800 rtl:pl-8 ltr:pr-8 mb-4">الرسالة</label>
                        <textarea
                                class="w-full bg-white-900 rounded-10px py-3 px-6 app-textarea focus:outline-none resize-none"
                                placeholder="ضع رسالتك هنا"
                                :class="{ 'has-danger': errors.length }"
                                v-model="form.notes"></textarea>
                        <p class="message-danger">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <div class="flex items-center flex-wrap">
                        <button type="submit"
                                class="w-full text-white-900 text-base font-medium bg-blue-800 rounded-25px py-3">ارسال
                        </button>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>
<script>
    import Bar from '../../components/app/Bar';

    export default {
        components: {
            Bar
        },
        data() {
            return {
                popover: {
                    visibility: 'focus',
                },
                options: [
                    'anas',
                    'Akmal'
                ],
                theDay: null,
                dates: {
                    minDate: new Date(this.getToday()),
                    days: [1, 4, 7]
                },
                form: {
                    title: null,
                    note: null,
                    date: null
                }
            }
        },
        computed: {
            dirLang() {
                return this.$i18n.locale === 'en' ? 'ltr' : 'rtl';
            },

        },
        methods: {
            getToday() {
                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = today.getFullYear();
                today = yyyy + '-' + mm + '-' + dd;
                return this.theDay = today;
            }
        },
        created() {
            this.getToday();
        }
    }
</script>
<style scoped lang="scss">
    input {
        border: 1px solid transparent;
    }

</style>

