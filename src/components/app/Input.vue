<template>
    <div class="d-inline-block">
        <input class="w-1/2 mx-auto text-center bg-gray-100 rounded-lg p-2" @keypress="isNumber($event)" type="tel"
               inputmode="numeric" pattern="[0-9]*" v-model="inputVal">
        <p class="message-danger text-xxs" v-if="msg">الرجاء ادخال قيمة صحيحة</p>
    </div>
</template>
<script>
    export default {
        props: ['value'],
        data() {
            return {
                msg: false,
            }
        },
        methods: {
            isNumber: function (evt) {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();
                    this.msg = true;
                } else {
                    this.msg = false;
                    return true;
                }
            }
        },
        computed: {
            inputVal: {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit('input', val);
                }
            }
        }
    }
</script>
