<template>
    <div class="bg-gray-100 min-h-screen">
        <div class="gradient mobile-padding pb-8">
            <div class="flex items-center justify-between relative" style="height: 45px;">
                <img @click="openForm()" v-if="!active && user !== '116'" src="@/assets/img/edit.svg" alt="">
                <svg aria-hidden="true" @click="updateForm" v-if="active" focusable="false" data-prefix="fas"
                     data-icon="check" role="img"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                     class="svg-inline--fa fa-check w-6">
                    <path fill="#fff"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                          class=""></path>
                </svg>
                <p id="logout" style="transform: scaleX(-1)" onclick="myFunction()" v-if="user !== '116'">
                    <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="sign-out" role="img"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                         class="svg-inline--fa fa-sign-out w-6">
                        <g class="fa-group">
                            <path fill="#fff"
                                  d="M180 448H96a96 96 0 0 1-96-96V160a96 96 0 0 1 96-96h84a12 12 0 0 1 12 12v40a12 12 0 0 1-12 12H96a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h84a12 12 0 0 1 12 12v40a12 12 0 0 1-12 12z"
                                  class="fa-secondary"></path>
                            <path fill="#fff"
                                  d="M353 88.3l151.9 150.6a24 24 0 0 1 0 34.1l-152 150.8a24.08 24.08 0 0 1-33.9-.1l-21.9-21.9a24.07 24.07 0 0 1 .8-34.7l77.6-71.1H184a23.94 23.94 0 0 1-24-24v-32a23.94 23.94 0 0 1 24-24h191.5l-77.6-71.1a24 24 0 0 1-.7-34.6l21.9-21.9a24 24 0 0 1 33.9-.1z"
                                  class="fa-primary"></path>
                        </g>
                    </svg>
                </p>
            </div>
            <div class="text-center mt-4">
                <div class="mx-auto w-28 h-28 mb-2 rounded-full border-2 border-white-900  flex items-center justify-center relative">
                    <div class="absolute z-2 top-0 rtl:right-0 ltr:left-0 rtl:mr-2 ltr:ml-2 mt-1" v-if="user !== '116'">
                        <input type="file" class="absolute w-full inset-0 opacity-0" style="opacity: 0"
                               @change="onFileChange">
                        <svg id="plus-circle"
                             class=""
                             xmlns="http://www.w3.org/2000/svg"
                             width="20" height="20" viewBox="0 0 16 16">
                            <rect width="16" height="16" opacity="0"/>
                            <path d="M8,0a8,8,0,1,0,5.657,2.343A8,8,0,0,0,8,0Z" fill="#21b363"/>
                            <path data-name="Path"
                                  d="M7,5H5V7A1,1,0,0,1,3,7V5H1A1,1,0,0,1,1,3H3V1A1,1,0,0,1,5,1V3H7A1,1,0,0,1,7,5Z"
                                  transform="translate(4 4)" fill="#fff"/>
                        </svg>
                    </div>
                    <img class="object-cover w-full h-full p-2px rounded-full"
                         :src="profile.url ? profile.url: image"
                         alt="profile-pic">
                </div>
                <div v-if="loading" class="spinner">
                    <div class="double-bounce1"></div>
                    <div class="double-bounce2"></div>
                </div>
                <p class="message-danger" v-if="imageMsg">الرجاء رفع صورة</p>
                <p class="text-white-900 font-medium text-xl">{{profile.name}}</p>
                <p class="text-sm text-white-900 font-medium mb-6">{{profile.email}}</p>
                <router-link tag="p" to="/change-password" class="underline text-xs text-white-900"
                             v-if="user !== '116'">تغيير كلمة المرور
                </router-link>
            </div>
        </div>
        <div class="mobile-padding  py-6">
            <div class="flex items-center mb-6 notifications">
                <h2 class="flex-grow text-base text-blue-800">التنبيهات والاشعارات</h2>
                <label class="switch">
                    <input type="checkbox" v-model="profile.notification" @input="toggleCheckbox($event)">
                    <div class="slider round"></div>
                </label>
            </div>
            <div class="mb-6">
                <h2 class="flex-grow text-base text-blue-800 mb-2">المعلومات الشخصية</h2>
                <ValidationObserver ref="UpdateProfile">
                    <form @submit.prevent="updateForm">
                        <ul class="flex flex-wrap -mx-3">
                            <li class="w-1/2 mb-2 px-3 profile-box">
                                <div class="flex items-center flex-wrap bg-white-900 py-3 px-4 rounded-10px">
                                    <div class="flex items-center w-full">
                                        <p class="text-lg text-primary-900 flex-grow" style="margin-left: 12px">
                                            العمر</p>

                                        <p class="text-base text-blue-800 mr-auto">
                                            <span class="px-2">{{profile.age}}</span>
                                            <span class="text-xs">Yr</span>
                                        </p>
                                    </div>
                                    <ValidationProvider tag="div"
                                                        vid="age" name="age" rules="required|integer"
                                                        v-slot="{ errors }">
                                        <input type="tel" :class="{ 'has-danger': errors.length }"
                                               class="bg-gray-100 text-blue-800 text-lg font-bold w-full border border-transparent mt-2"
                                               v-model="form.age"
                                               v-if="active"
                                               inputmode="numeric" pattern="[0-9]*"/>
                                        <p class="message-danger">{{ errors[0] }}</p>
                                    </ValidationProvider>
                                </div>
                            </li>
                            <li class="w-1/2 mb-2 px-3 profile-box">
                                <div class="flex items-center flex-wrap bg-white-900 py-3 px-4 rounded-10px">
                                    <div class="flex items-center w-full">
                                        <p class="text-lg text-primary-900 flex-grow" style="margin-left: 12px">
                                            الطول</p>
                                        <p class="text-base text-blue-800">
                                            <span class="px-2">{{profile.length}}</span>
                                            <span class="text-xs">cm</span>
                                        </p>
                                    </div>
                                    <ValidationProvider tag="div"
                                                        vid="length" name="length" rules="required|integer"
                                                        v-slot="{ errors }">
                                        <input type="tel" :class="{ 'has-danger': errors.length }"
                                               class="bg-gray-100 text-lg font-bold w-full border border-transparent mt-2 px-2"
                                               v-model="form.length"
                                               v-if="active"
                                               inputmode="numeric" pattern="[0-9]*"/>
                                        <p class="message-danger">{{ errors[0] }}</p>
                                    </ValidationProvider>
                                </div>
                            </li>
                            <li class="w-1/2 mb-2 px-3 profile-box">
                                <div class="flex items-center flex-wrap bg-white-900 py-3 px-4 rounded-10px relative">
                                    <div class="flex items-center w-full">
                                        <p class="text-lg text-primary-900 flex-grow" style="margin-left: 12px">
                                            الجنس</p>
                                        <p class="text-base text-blue-800">
                                            <span class="px-2">{{profile.gender_ar}}</span>
                                        </p>
                                    </div>
                                    <ValidationProvider tag="div" class="w-full"
                                                        vid="gender" name="gender"
                                                        v-slot="{ errors }">
                                        <v-select class="bg-gray-100 w-full text-center mt-2" v-if="active"
                                                  :options="options"
                                                  label="name"
                                                  :dir="dirLang" v-model="form.gender">
                                        </v-select>
                                        <!--                                        <p class="message-danger" v-if="genderError">please select Gender</p>-->
                                    </ValidationProvider>

                                </div>
                            </li>
                            <li class="w-1/2 mb-2 px-3 profile-box">
                                <div class="flex items-center flex-wrap bg-white-900 py-3 px-4 rounded-10px">
                                    <div class="flex items-center w-full">
                                        <p class="text-lg text-primary-900 flex-grow" style="margin-left: 12px">
                                            الوزن</p>
                                        <p class="text-base text-blue-800">
                                            <span class="px-2">{{profile.weight}}</span>
                                            <span class="text-xs">kg</span>
                                        </p>
                                    </div>
                                    <ValidationProvider tag="div"
                                                        vid="weight" name="weight" rules="required|integer"
                                                        v-slot="{ errors }">
                                        <input type="tel" :class="{ 'has-danger': errors.length }"
                                               class="bg-gray-100 text-lg font-bold w-full border border-transparent mt-2 px-2"
                                               v-model="form.weight"
                                               v-if="active"
                                               inputmode="numeric" pattern="[0-9]*"/>
                                        <p class="message-danger">{{ errors[0] }}</p>
                                    </ValidationProvider>


                                </div>
                            </li>
                            <li class="w-1/2 mb-2 px-3 profile-box">
                                <div class="flex items-center flex-wrap bg-white-900 py-3 px-4 rounded-10px">
                                    <div class="flex items-center w-full">
                                        <p class="text-lg text-primary-900 flex-grow" style="margin-left: 12px">
                                            البلد</p>
                                        <p class="text-base text-blue-800">
                                            <span class="px-2">{{profile.country}}</span>
                                        </p>
                                    </div>
                                    <ValidationProvider tag="div"
                                                        vid="country" name="country"
                                                        v-slot="{ errors }"
                                                        rules="alpha_spaces">
                                        <input type="text" :class="{ 'has-danger': errors.length }"
                                               class="bg-gray-100 text-lg font-bold w-full border border-transparent mt-2 px-2"
                                               v-model="form.country"
                                               v-if="active"/>
                                        <p class="message-danger">{{ errors[0] }}</p>
                                    </ValidationProvider>
                                </div>
                            </li>
                            <li class="w-1/2 mb-2 px-3 profile-box">
                                <div class="flex items-center flex-wrap bg-white-900 py-3 px-4 rounded-10px">
                                    <div class="flex items-center w-full">
                                        <p class="text-lg text-primary-900 flex-grow" style="margin-left: 12px">
                                            المدينة</p>

                                        <p class="text-base text-blue-800">
                                            <span class="px-2">{{profile.city}}</span>
                                        </p>
                                    </div>
                                    <ValidationProvider tag="div"
                                                        vid="city" name="city"
                                                        v-slot="{ errors }"
                                                        rules="alpha_spaces">
                                        <input type="text" :class="{ 'has-danger': errors.length }"
                                               class="bg-gray-100 text-lg font-bold w-full border border-transparent mt-2 px-2"
                                               v-model="form.city"
                                               v-if="active"/>
                                        <p class="message-danger">{{ errors[0] }}</p>
                                    </ValidationProvider>
                                </div>
                            </li>
                        </ul>
                    </form>
                </ValidationObserver>
                <div class="bg-green-100 mt-4 rounded-10px text-center" v-if="success">
                    <p class="p-3 text-base text-blue-800 font-medium">تمت التعديل بنجاح</p>
                </div>
                <div class="flex items-center">
                    <router-link tag="div" to="/my-analysis" class="w-1/2 mt-4 px-3">
                        <div class="flex items-center justify-center bg-primary-900 py-4 px-4 rounded-full">
                            <p class="text-lg font-medium text-white-900 ">تحاليلي</p>
                        </div>
                    </router-link>
                    <router-link tag="div" to="/my-drugs" class="w-1/2 mt-4 px-3">
                        <div class="flex items-center justify-center bg-blue-800 py-4 px-4 rounded-full">
                            <p class="text-lg font-medium text-white-900">أدويتي</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                loading: false,
                checkbox: false,
                profile: {},
                status: {
                    status: 0
                },
                genders: {
                    Male: 'm',
                    Female: 'f'
                },
                options: [
                    {
                        name: 'ذكر',
                        value: 'm'
                    },
                    {
                        name: 'انثى',
                        value: 'f'
                    }
                ],
                active: false,
                success: false,
                genderError: false,
                image: './img/avatar.svg',
                imageSrc: null,
                imageMsg: false,
                form: {
                    age: null,
                    city: null,
                    gender: null,
                    weight: null,
                    length: null,
                    country: null
                }
            }
        },
        methods: {
            toggleCheckbox($e) {
                this.status = {
                    status: $e.target.checked ? 1 : 0
                };
                this.changeStatus();
            },
            openForm() {
                this.active = !this.active;
            },
            updateForm() {
                const $this = this;
                let $fields = _.cloneDeep(this.form);
                this.genderError = true;
                $fields.gender = $fields.gender ? $fields.gender.value : null;
                this.$refs['UpdateProfile'].validate().then((result) => {
                    if (result) {
                        this.loading = true;
                        this.axios.post('/mobile/user', $fields).then((res) => {
                            this.success = true;
                            this.active = false;
                            this.loading = false;
                            this.genderError = false;
                            this.form = {
                                age: null,
                                city: null,
                                gender: null,
                                weight: null,
                                length: null,
                            };
                            setTimeout(function () {
                                location.reload();
                                $this.success = false;
                                $this.$refs['UpdateProfile'].reset();
                            }, 3000);
                        }).catch((error) => {
                            this.loading = false;
                            if (error.response) {
                                if (error.response.status === 422) {
                                    this.$refs['UpdateProfile'].setErrors(error.response.data.errors);
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
                    vm.image = src;
                    img.onload = () => {
                        let $canvas = document.createElement("canvas");
                        let $width = $canvas.width = 500;
                        let $height = $canvas.height = (500 * (img.height / img.width));
                        $canvas.getContext('2d').drawImage(img, 0, 0, $width, $height);
                        $canvas.toBlob((blob) => {
                            this.imageSrc = blob;
                            this.uploadUserImage(this.imageSrc);
                        });
                    };

                };
                reader.readAsArrayBuffer(file);

            },
            uploadUserImage($theFile) {
                this.loading = true;
                let formData = new FormData();
                formData.append('image', $theFile);
                this.axios.post('/mobile/user/image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    this.loading = false;
                    location.reload();
                }).catch((error) => {
                    this.loading = false;
                    if (error.response) {
                        if (error.response.status === 422) {
                        }
                    }
                });
            },
            changeStatus() {
                this.axios.post('/mobile/user/notification/update', this.status).then((res) => {
                }).catch((error) => {
                    if (error.response) {
                        if (error.response.status === 422) {
                        }
                    }
                });
            }
        },
        created() {
            this.axios.get('/mobile/user/profile')
                .then(response => {
                    this.profile = response.data.data;
                    this.form = {
                        age: this.profile.age,
                        city: this.profile.city,
                        weight: this.profile.weight,
                        length: this.profile.length,
                        country: this.profile.country
                    };
                    this.status = {
                        status: this.profile.notification
                    };
                    if (this.profile.gender) {
                        this.form.gender = this.options.find(x => x.value === this.genders[this.profile.gender]);
                    }
                });

        },
        computed: {
            dirLang() {
                return this.$i18n.locale === 'en' ? 'ltr' : 'rtl';
            },
            user() {
                return localStorage.getItem('user_id') ? localStorage.getItem('user_id') : null;
            }
        }
    }
</script>
<style lang="scss">
    .profile-box {
        input {
            padding: 2px 5px !important;
            width: 100%;
            border-radius: 0 !important;
        }

        .vs__dropdown-menu {
            left: 0 !important;
            width: 100% !important;
            min-width: 100%;
        }

        .vs__selected-options {
            flex-wrap: nowrap;
        }
    }

    .vs__selected-options {
        input {
            padding: 0 !important;
        }
    }

</style>
