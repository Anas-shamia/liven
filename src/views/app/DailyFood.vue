<template>
    <div>
        <Bar :title="'وجبات اليوم'" :close="'/food-plan'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <h2 class="text-xl font-medium text-blue-800 mb-6 text-center">وجبات اليوم</h2>
            <div class="mb-6">
                <div class="flex items-center">
                    <p class="text-sm flex-grow font-light text-blue-800 mb-2">فطور</p>
                    <p class="text-sm font-light text-blue-800 mb-2">منذ 16 ساعة</p>
                </div>
                <div class="flex flex-wrap -mx-2">
                    <div class="w-1/3 px-1">
                        <div>
                            <img class="custom-box w-full object-cover rounded-10px" src="@/assets/img/meal.jpg" alt="">
                        </div>
                    </div>
                    <div class="w-1/3 px-1">
                        <div>
                            <img class="custom-box w-full object-cover rounded-10px" src="@/assets/img/meal.jpg" alt="">
                        </div>
                    </div>
                    <div class="w-1/3 px-1">
                        <div>
                            <img class="custom-box w-full object-cover rounded-10px" src="@/assets/img/meal.jpg" alt="">
                        </div>
                    </div>

                </div>
            </div>
            <div class="mb-6">
                <div class="flex items-center">
                    <p class="text-sm flex-grow font-light text-blue-800 mb-2">غداء</p>
                    <p class="text-sm font-light text-blue-800 mb-2">منذ 16 ساعة</p>
                </div>
                <div class="flex flex-wrap -mx-2">
                    <div class="w-1/3 px-1">
                        <div>
                            <img class="custom-box w-full object-cover rounded-10px" src="@/assets/img/meal.jpg" alt="">
                        </div>
                    </div>
                    <div class="w-1/3 px-1">
                        <div>
                            <img class="custom-box w-full object-cover rounded-10px" src="@/assets/img/meal.jpg" alt="">
                        </div>
                    </div>
                    <div class="w-1/3 px-1">
                        <div>
                            <img class="custom-box w-full object-cover rounded-10px" src="@/assets/img/meal.jpg" alt="">
                        </div>
                    </div>

                </div>
            </div>
            <div class="mb-6">
                <div class="flex items-center">
                    <p class="text-sm flex-grow font-light text-blue-800 mb-2">عشاء</p>
                    <p class="text-sm font-light text-blue-800 mb-2">منذ 16 ساعة</p>
                </div>
                <div class="flex flex-wrap -mx-2">
                    <div class="w-1/3 px-1">
                        <div>
                            <img class="custom-box w-full object-cover rounded-10px" src="@/assets/img/meal.jpg" alt="">
                        </div>
                    </div>
                    <div class="w-1/3 px-1">
                        <div>
                            <img class="custom-box w-full object-cover rounded-10px" src="@/assets/img/meal.jpg" alt="">
                        </div>
                    </div>
                    <div class="w-1/3 px-1">
                        <div>
                            <img class="custom-box w-full object-cover rounded-10px" src="@/assets/img/meal.jpg" alt="">
                        </div>
                    </div>

                </div>
            </div>
            <div class="mb-6">
                <div class="flex items-center">
                    <p class="text-sm flex-grow font-light text-blue-800 mb-2">وجبة خفيفة</p>
                    <p class="text-sm font-light text-blue-800 mb-2">منذ 16 ساعة</p>
                </div>
                <div class="flex flex-wrap -mx-2">
                    <div class="w-1/3 px-1">
                        <div>
                            <img class="custom-box w-full object-cover rounded-10px" src="@/assets/img/meal.jpg" alt="">
                        </div>
                    </div>
                    <div class="w-1/3 px-1">
                        <div>
                            <img class="custom-box w-full object-cover rounded-10px" src="@/assets/img/meal.jpg" alt="">
                        </div>
                    </div>
                    <div class="w-1/3 px-1">
                        <div>
                            <img class="custom-box w-full object-cover rounded-10px" src="@/assets/img/meal.jpg" alt="">
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Bar from '../../components/app/Bar';

    export default {
        data() {
            return {
                foodPlan: null
            }
        },
        components: {
            Bar
        },
        created() {
            this.axios.post('/mobile/medicine/item', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                this.success = true;
                this.loading = false;
                this.form = {
                    name: null,
                    count: null,
                    status: null,
                    image: '',
                    notes: null
                };
                setTimeout(function () {
                    $this.success = false;
                }, 3000);
                this.$refs['addMedicine'].reset();
            }).catch((error) => {
                this.loading = false;
                if (error.response) {
                    if (error.response.status === 422) {
                        this.$refs['addMedicine'].setErrors(error.response.data.errors);
                    }
                }
            });
        }

    }
</script>
<style lang="scss">
    .custom-box {
        height: 90px;
    }
</style>
