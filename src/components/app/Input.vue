<template>
    <div class="d-inline-block">
        <input class="w-1/2 mx-auto text-center bg-gray-100 rounded-lg p-2" type="tel" inputmode="numeric" pattern="[0-9]*" v-model="inputVal">
    </div>
</template>
<script>
    export default {
        props:['value'],
        data() {
            return {

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
