<template>
    <div class="flex items-center justify-center relative">
        <div class="fixed inset-0 overlay flex items-center justify-center" @click.self="$emit('close')">
            <div class="w-4/5 3sm:mx-4 bg-white-900 mx-auto flex items-center justify-center rounded-lg custom-shadow px-4 py-4">
                <div class="w-full mb-4">
                    <h3 class="text-blue-900 text-lg mb-6 flex items-center pb-2  border-b border-gray-200">
                        <span class="flex-grow" v-if="!this.msg">هل أنت متأكد من الحذف</span>
                        <span class="flex-grow" v-else>{{this.msg}}</span>
                        <img class="w-4 cursor-pointer" src="@/assets/img/close.svg" alt="close"
                             @click="$emit('close')">
                    </h3>
                    <div class="bg-green-100 mt-4 rounded-10px text-center" v-if="success">
                        <p class="p-3 text-base text-blue-800 font-medium">تمت الحذف بنجاح</p>
                    </div>
                    <div class="flex flex-wrap mt-4 -mx-4">
                        <div class="w-1/2 px-4">
                            <button type="button"
                                    class="w-full bg-primary-900 py-2 rounded-lg text-sm font-medium text-white-900 "
                                    @click="deleteSugar(myID)">
                                تأكيد
                            </button>
                        </div>
                        <div class="w-1/2 px-4">
                            <button type="button" @click.self="$emit('close')"
                                    class="w-full bg-blue-800 py-2 rounded-lg text-sm font-medium text-white-900 ">
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['id', 'url', 'msg'],
        data() {
            return {
                success: false,
                myID: this.id,
                myUrl: this.url,
            }
        },
        methods: {
            deleteSugar(itemID) {
                const $this = this;
                this.axios.delete(`${this.myUrl}/${itemID}`).then((res) => {
                    this.success = true;
                    setTimeout(function () {
                        $this.success = false;
                    }, 3000);
                    location.reload();
                }).catch((error) => {
                });
            }
        }
    }
</script>

