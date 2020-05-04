<template>
    <div>
        <Bar :title="'اضافة وجبة'" :close="'/'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <ValidationObserver ref="addMeal">
                <form @submit.prevent="handleSubmit" class="mt-4">
                    <div>
                        <h4 class="text-base text-blue-800 mb-6">نوع الوجبة</h4>
                        <div class="flex flex-wrap items-center">
                            <div class="w-1/3 mb-4" v-for="(item,index) in meals" :key="index">
                                <CustomCheckbox :index="index" :title="item.title" v-model="form.type"/>
                            </div>
                        </div>
                        <p class="message-danger" v-if="sendError">تم اضافة هذا النوع مسبقا</p>
                    </div>
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="timing" name="timing" rules="required"
                                        v-slot="{ errors, touched }">
                        <label class="w-1/4 text-base text-blue-800 rtl:pl-8 ltr:pr-8">الوقت</label>
                        <datetime type="time"
                                  class="theme-purple w-3/4 bg-white-900 rounded-25px py-3 px-6 focus:outline-none"
                                  :class="{ 'has-danger': (errors.length && touched) }"
                                  v-model="form.timing"
                                  :placeholder="form.timing?form.timing:'وقت الوجبة'" use12-hour></datetime>
                        <p class="message-danger" v-if="touched">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <div class="flex items-center flex-wrap mb-4 image-uploader">
                        <label class="w-full text-base text-blue-800 rtl:pl-8 ltr:pr-8 mb-4">صورة الوجبة</label>
                        <div v-if="!form.image"
                             class="mx-auto w-full text-center border-2 border-dashed border-gray-400">
                            <ValidationProvider class="upload-btn-wrapper 3sm:w-2/5 w-1/3 mx-auto text-center p-8"
                                                tag="div" vid="image" name="Image"
                                                rules="image"
                                                v-slot="{ errors }">
                                <button class="btn mx-auto">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-upload"
                                         role="img"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
                                         class="svg-inline--fa fa-file-upload w-full">
                                        <path fill="currentColor"
                                              d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"
                                              class=""></path>
                                    </svg>
                                </button>
                                <input type="file" @change="onFileChange" accept="image/*;capture=camera">
                                <p class="message-danger">{{ errors[0] }}</p>
                                <p class="message-danger" v-if="errorMsg">حجم الصورة يجب ان يكون اقل من 2000kb</p>
                                <p class="message-danger" v-if="imageMsg">الرجاء رفع صورة</p>
                            </ValidationProvider>
                        </div>
                        <div class="w-full relative" v-else>
                            <ValidationProvider vid="imageSrc" name="Image"
                                                v-slot="{ errors }">
                                <img class="w-full rounded-10px object-cover" :src="form.image"/>
                                <button class="absolute top-0 rtl:left-0 ltr:right-0 p-4" @click="removeImage">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt"
                                         role="img"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                         class="svg-inline--fa fa-trash-alt w-4">
                                        <path fill="#ff0000"
                                              d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                                              class=""></path>
                                    </svg>
                                </button>
                                <p class="message-danger">{{ errors[0] }}</p>
                            </ValidationProvider>
                        </div>
                    </div>
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div" vid="notes"
                                        name="notes"
                                        v-slot="{ errors }">
                        <label class="w-full text-base text-blue-800 rtl:pl-8 ltr:pr-8 mb-4">ملاحظة</label>
                        <textarea
                                class="w-full bg-white-900 rounded-10px py-3 px-6 app-textarea focus:outline-none resize-none"
                                placeholder="ضع ملاحظتك هنا"
                                :class="{ 'has-danger': errors.length }"
                                v-model="form.notes"></textarea>
                        <p class="message-danger">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <div class="flex items-center flex-wrap">
                        <button type="submit"
                                v-if="user !=='116'"
                                class="w-full text-white-900 text-base font-medium bg-blue-800 rounded-25px py-3"
                                :class="loading?'btn-loading':''"
                                :disabled="loading">
                            <span>ارسال</span>
                            <div v-if="loading" class="spinner">
                                <div class="double-bounce1"></div>
                                <div class="double-bounce2"></div>
                            </div>
                        </button>
                    </div>
                    <div class="bg-green-100 mt-4 rounded-10px text-center" v-if="success">
                        <p class="p-3 text-base text-blue-800 font-medium">تمت الاضافة بنجاح</p>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>
<script>
    import CustomCheckbox from '../../components/app/CustomCheckbox'
    import Bar from '../../components/app/Bar';

    export default {
        components: {
            CustomCheckbox,
            Bar
        },
        data() {
            return {
                meals: [
                    {
                        title: 'فطور'
                    },
                    {
                        title: 'غداء'
                    },
                    {
                        title: 'عشاء'
                    },
                    {
                        title: 'وجبة خفيفة'
                    }
                ],
                sharedSize: 2000,
                errorMsg: false,
                imageMsg: false,
                success: false,
                loading: false,
                imageSrc: null,
                sendError: false,
                form: {
                    meal_id: null,
                    type: '1',
                    image: '',
                    timing: null,
                    notes: ''
                },
                meal: null,
            }
        },
        methods: {
            getTiming(n) {
                if (n < 10) {
                    return '0' + n;
                } else {
                    return n
                }
            },
            isValidDate(d) {
                return d instanceof Date && !isNaN(d);
            },
            handleSubmit() {
                const $this = this;
                this.$refs['addMeal'].validate().then((result) => {
                    if (result) {
                        this.loading = true;
                        let form = _.cloneDeep(this.form);
                        form.type = parseInt(form.type);
                        if (this.isValidDate(new Date(form.timing))) {
                            const $timing = new Date(form.timing);
                            const ampm = $timing.getHours() >= 12 ? 'pm' : 'am';
                            const $hours = ($timing.getHours() > 12 || $timing.getHours() === 0) ? ($timing.getHours() === 0 ? 12 : $timing.getHours() - 12) : $timing.getHours();
                            form.timing = this.getTiming($hours) + ':' + this.getTiming($timing.getMinutes()) + ' ' + ampm;
                        }
                        let $url = '/mobile/meal';
                        let $id = this.$route.params.id;
                        let $type = this.$route.params.type;

                        const formData = new FormData();
                        formData.append('notes', this.form.notes);
                        formData.append('image', this.imageSrc);
                        formData.append('timing', form.timing);
                        formData.append('type', form.type);

                        if ($type === 'edit') {
                            $url = '/mobile/meal/update';
                            form.meal_id = $id;
                            formData.append('meal_id', $id);
                        }
                        this.axios.post($url, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then((res) => {
                            this.sendError = false;
                            this.success = true;
                            this.loading = false;
                            this.form = {
                                type: 1,
                                image: '',
                                timing: null,
                                notes: null
                            };
                            setTimeout(function () {
                                $this.success = false;
                                $this.$router.push('/food-plan');
                            }, 2000);
                            this.$refs['addMeal'].reset();
                        }).catch((error) => {
                            this.loading = false;
                            if (error.response) {
                                if (error.response.status === 422) {
                                    this.sendError = true;
                                    this.$refs['addMeal'].setErrors(error.response.data.errors);
                                }
                            }
                        });
                    }
                });
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;

                if (!files.length)
                    return;
                const $file = files[0];
                if ($file['type'] === 'image/png' || $file['type'] === 'image/jpeg' || $file['type'] === 'image/jpg') {
                    this.createImage($file);
                    this.imageSrc = $file;
                    this.errorMsg = false
                } else {
                    this.imageMsg = true;
                }
            },
            createImage(file) {
                const reader = new FileReader();
                const vm = this;
                reader.onload = (e) => {
                    const arrayBuffer = reader.result;
                    const blob = new Blob([arrayBuffer], {type: 'image/png'});
                    let src = URL.createObjectURL(blob);
                    let img = new Image();
                    img.src = src;
                    vm.form.image = src;
                    img.onload = () => {
                        let $canvas = document.createElement("canvas");
                        let $width = $canvas.width = 500;
                        let $height = $canvas.height = (500 * (img.height / img.width));
                        $canvas.getContext('2d').drawImage(img, 0, 0, $width, $height);
                        // vm.form.image = $canvas.toBlob();
                        // vm.form.image = $canvas.toDataURL();
                        $canvas.toBlob((blob) => {
                            this.imageSrc = blob;
                        });

                    };
                    // vm.form.image = e.target.result;

                };
                reader.readAsArrayBuffer(file);
            },
            removeImage: function (e) {
                this.form.image = '';
            }
        },
        created() {
            let $id = this.$route.params.id;
            if ($id) {
                this.axios.get(`/mobile/meal/${$id}`)
                    .then(response => {
                        this.meal = response.data.data;
                        this.form = {
                            id: this.meal.id,
                            type: this.meal.type,
                            image: this.meal.image_url,
                            timing: this.meal.timing,
                            notes: this.meal.notes
                        };
                    });
            }

        },
        computed: {
            user() {
                return localStorage.getItem('user_id') ? localStorage.getItem('user_id') : null;
            }
        }
    }
</script>
