<template>
    <div>
        <ValidationProvider class="flex flex-wrap items-center"
                            vid="value" name="picked" rules="required"
                            v-slot="{ errors }">
            <input class="custom-checkbox" type="radio" :name="`activity${index}`" v-model="picked"
                   :value="initialValue"
                   :id="id"
                   @click="test"
            >
            <label :for="id" class="text-base flex items-center">
                <span></span>
                <span class="rtl:pr-2 ltr:pl-2 text-sm text-blue-800">{{title}}</span>
            </label>
            <p class="message-danger">{{ errors[0] }}</p>
        </ValidationProvider>
    </div>
</template>
<script>
    export default {
        props: ['index', 'id', 'title', 'value', 'initialValue', 'medicine_id'],
        data() {
            return {
                picked: this.value
            }
        },
        watch: {},
        methods: {
            test(e) {
                this.picked = e.target.value;
                const $form = {
                    medicine_id: this.medicine_id,
                    status: parseInt(this.picked)
                };
                this.axios.post('/mobile/medicine/item/status_change', $form).then((res) => {
                }).catch((error) => {
                    if (error.response) {
                        if (error.response.status === 422) {
                        }
                    }
                });
            },
        }
    }
</script>
