<template>
    <div>
        <Bar :title="'اضافة دواء'" :close="'/my-drugs'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <ValidationObserver ref="addMedicine">
                <form @submit.prevent="handleSubmit" class="mt-4">
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="name" name="name" rules="required"
                                        v-slot="{ errors }">
                        <label class="w-1/4 text-base text-blue-800 rtl:pl-8 ltr:pr-8">اسم الدواء</label>
                        <input type="text"
                               class="w-3/4 bg-white-900 rounded-25px py-3 px-6 focus:outline-none border border-transparent"
                               placeholder="اسم الدواء" v-model="form.name"
                               :class="{ 'has-danger': errors.length }">
                        <p class="message-danger">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="count" name="times" rules="required|integer"
                                        v-slot="{ errors }">
                        <label class="w-1/4 text-base text-blue-800 rtl:pl-8 ltr:pr-8">عدد المرات</label>
                        <input type="text"
                               class="w-3/4 bg-white-900 rounded-25px py-3 px-6 focus:outline-none border border-transparent"
                               placeholder="عدد المرات في اليوم" v-model="form.count"
                               :class="{ 'has-danger': errors.length }">
                        <p class="message-danger">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <div class="mb-6">
                        <h4 class="text-base text-blue-800 mb-4">الدواء الحالي</h4>
                        <div class="flex flex-wrap items-center">
                            <div class="w-1/3 mb-4" v-for="(item,index) in meals" :key="index">
                                <CustomCheckbox :index="index-1" :title="item.title" v-model="form.status"/>

                            </div>
                        </div>
                    </div>
                    <div class="flex items-center flex-wrap mb-4 image-uploader">
                        <label class="w-full text-base text-blue-800 rtl:pl-8 ltr:pr-8 mb-4">صورة الدواء</label>
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
                                <input type="file" @change="onFileChange">
                                <p class="message-danger">{{ errors[0] }}</p>
                                <p class="message-danger" v-if="errorMsg">حجم الصورة يجب ان يكون اقل من 3000kb</p>
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
                        title: 'نعم'
                    },
                    {
                        title: 'لا'
                    },
                ],
                medicine: null,
                sharedSize: 2000,
                errorMsg: false,
                imageMsg: false,
                success: false,
                loading: false,
                imageSrc: null,
                form: {
                    name: null,
                    count: null,
                    status: 1,
                    image: '',
                    notes: ''
                }
            }
        },
        methods: {
            handleSubmit() {
                const $this = this;
                this.$refs['addMedicine'].validate().then((result) => {
                    if (result) {
                        this.loading = true;
                        const formData = new FormData();
                        formData.append('name', this.form.name);
                        formData.append('count', this.form.count);
                        formData.append('status', this.form.status);
                        formData.append('image', this.imageSrc);
                        formData.append('notes', this.form.notes);

                        let $url = '/mobile/medicine/item';
                        let $id = this.$route.params.id;
                        let $type = this.$route.params.type;

                        if ($type === 'edit') {
                            $url = `/mobile/medicine/item/update/${$id}`;
                        }

                        this.axios.post($url, formData, {
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
                                notes: ''
                            };
                            setTimeout(function () {
                                $this.success = false;
                                $this.$router.push('/my-drugs');
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
                this.axios.get(`/mobile/medicine/item/${$id}`)
                    .then(response => {
                        this.medicine = response.data.data;
                        this.form = {
                            name: this.medicine.name,
                            count: this.medicine.count,
                            status: this.medicine.status,
                            image: this.medicine.url,
                            notes: this.medicine.notes
                        };
                    });
            }

        }
    }
</script>
