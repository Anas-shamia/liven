<template>
    <div class="flex items-center justify-center relative">
        <div class="fixed inset-0 overlay flex items-center justify-center" @click.self="$emit('close')">
            <div class="w-4/5 3sm:mx-4 bg-white-900 mx-auto flex items-center justify-center rounded-lg custom-shadow px-4 py-4">
                <div class="w-full mb-4">
                    <h3 class="text-blue-900 text-lg mb-6 flex items-center pb-2  border-b border-gray-200">
                        <img class="w-4 cursor-pointer" src="@/assets/img/close.svg" alt="close"
                             @click="$emit('close')">
                    </h3>
                    <div class="mt-4 rounded-10px">
                        <p class="p-3 text-base text-blue-800 font-medium">لا يمكنك استخدام هذه الخدمة لمزيد من المعلومات الرجاء زيارة موقعنا
                            <span onclick="openSite()">www.Liven-sa.com</span></p>
                    </div>
                    <div class="flex flex-wrap mt-4 -mx-4">
                        <div class="w-1/2 px-4">
                        </div>
                        <div class="w-1/2 px-4">
                            <button type="button" @click.self="$emit('close')"
                                    class="w-full bg-blue-800 py-2 rounded-lg text-sm font-medium text-white-900 ">
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

