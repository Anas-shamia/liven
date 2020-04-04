<template>
    <div>
        <ValidationProvider class="flex flex-wrap items-center"
                            vid="value" name="picked" rules="required"
                            v-slot="{ errors }">
            <input class="custom-checkbox" type="radio" name="activity" v-model="picked" @click="checkedType($event)"
                   :id="`chkbx${index}`"
                   :value="index+1">
            <label :for="`chkbx${index}`" class="text-base flex items-center">
                <span></span>
                <span class="rtl:pr-2 ltr:pl-2 text-sm text-blue-800">{{title}}</span>
            </label>
            <p class="message-danger">{{ errors[0] }}</p>
        </ValidationProvider>
    </div>
</template>
<script>
    export default {
        props: ['index', 'title', 'value'],
        data() {
            return {
                picked: 1
            }
        },
        methods: {
            checkedType(e) {
                if (e.target.checked) {
                    this.picked = e.target.value;
                    this.$emit('input', this.picked)
                }
            }
        }
    }
</script>
