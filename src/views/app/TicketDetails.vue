<template>
    <div v-if="details">
        <Bar :title="`تذكرة  #${details.id}`" :close="'/inquiries-list'"/>

        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
           <div class="pb-4 border-b border-gray-200">
               <h2 class="text-blue-800 text-xl mb-2">{{details.title}}</h2>
               <p class="text-sm text-gray-700 mb-3">{{details.updated_at}}</p>
               <p class="text-base text-gray-700 mb-2">الوصف</p>
               <p class="text-lg text-blue-800 mb-3">
                   {{details.description}}
               </p>
           </div>
            <div v-if="details.replays.length">
                <div class="py-4 border-b border-gray-200" v-for="(item,index) in details.replays" :key="index">
                    <p class="text-base text-gray-700 mb-2">{{item.replay_author}}</p>
                    <p class="text-lg text-blue-800 mb-3">{{item.replay_text}}</p>
                </div>
            </div>

            <div class="w-full" v-if="details.status === 0">
                <ValidationObserver ref="AddComment">
                    <form @submit.prevent="handleSubmit">
                        <div class="flex items-center flex-wrap w-full rounded-lg comments-shadow mt-4 px-4 py-4">
                            <ValidationProvider class="w-full" tag="div"
                                                vid="replay_text" name="Comment" rules="required"
                                                v-slot="{ errors }">
                                <input type="text"
                                       class="flex-grow form-control bg-transparent w-full py-2 focus:outline-none mb-4"
                                       placeholder="أضف رد ..." v-model="form.replay_text"
                                       :class="{ 'has-danger': errors.length }">
                                <p class="message-danger">{{ errors[0] }}</p>
                            </ValidationProvider>
                            <button type="submit"
                                    class="comment-button mr-auto text-white-900 py-2 px-6 text-sm py-1 bg-blue-900 border border-blue-900 rounded-lg rounded 3sm:w-full"
                                    :disabled="loading">
                                إرسال
                            </button>
                        </div>
                    </form>
                    <div class="bg-green-100 mt-4 rounded-10px text-center" v-if="success">
                        <p class="p-3 text-base text-blue-800 font-medium">Sent Successfully</p>
                    </div>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>
<script>
    import Bar from '../../components/app/Bar';
    export default {
        data(){
            return{
                details: null,
                success: false,
                loading: false,
                form: {
                    ticket_id: this.$route.params.id,
                    replay_text: null
                },
            }
        },
        components:{
            Bar
        },
        methods:{
            handleSubmit() {
                const $this = this;
                this.$refs['AddComment'].validate().then((result) => {
                    if (result) {
                        this.loading = true;
                        this.axios.post('/mobile/ticket/replay', this.form).then((res) => {
                            this.success = true;
                            this.loading = false;
                            this.form = {
                                replay_text: null,
                            };
                            setTimeout(function () {
                                $this.success = false;
                                location.reload();
                            }, 2000);
                            this.$refs['AddComment'].reset();
                        }).catch((error) => {
                            this.loading = false;
                            if (error.response) {
                                if (error.response.status === 422) {
                                    this.$refs['AddComment'].setErrors(error.response.data.errors);
                                }
                            }
                        });
                    }
                });
            },
        },
        created() {
            let $id = this.$route.params.id;
            this.axios.get(`/mobile/ticket/with/replays?ticket_id=${$id}`)
                .then(response => (this.details = response.data.data[0]))
        }
    }
</script>
