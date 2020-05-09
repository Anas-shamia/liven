<template>
    <div>
        <Bar :title="'الاتصال'" :close="user === '116' ? '':'/'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">

            <div class="flex items-center justify-center mt-12 mb-6">
                <!--                <div class="mx-4">-->
                <!--                    <svg aria-hidden="true" @click="openCamera()" focusable="false" data-prefix="fas" data-icon="video"-->
                <!--                         role="img"-->
                <!--                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"-->
                <!--                         class="svg-inline&#45;&#45;fa fa-video w-6">-->
                <!--                        <path fill="#14123d"-->
                <!--                              d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"-->
                <!--                              class=""></path>-->
                <!--                    </svg>-->
                <!--                </div>-->
                <div class="mx-4">
                    <svg aria-hidden="true" @click="openMice()" focusable="false" data-prefix="fas"
                         data-icon="microphone" role="img"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"
                         class="svg-inline--fa fa-microphone w-5">
                        <path fill="#14123d"
                              d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z"
                              class=""></path>
                    </svg>
                </div>
            </div>
            <div id="div_device" class="panel panel-default mb-4">
                <div :class="mice?'':'hidden'" class="select mb-4 flex items-center flex-wrap mb-4">
                    <label for="audioSource" class="w-1/4 text-base text-blue-800 rtl:pl-8 ltr:pr-8">Audio
                        source: </label>
                    <select id="audioSource"
                            class="w-3/4 bg-white-900 rounded-25px py-3 px-6 focus:outline-none border border-transparent">
                    </select>
                </div>
                <div :class="camera?'':'hidden'" class="select mb-4 flex items-center flex-wrap mb-4">
                    <label for="videoSource" class="w-1/4 text-base text-blue-800 rtl:pl-8 ltr:pr-8">Video
                        source: </label>
                    <select id="videoSource"
                            class="w-3/4 bg-white-900 rounded-25px py-3 px-6 focus:outline-none border border-transparent"></select>
                </div>
            </div>

            <div id="div_join" class="panel panel-default">
                <div class="panel-body mb-4">
                    <div class="">
                        <div class="flex items-center flex-wrap mb-4 hidden">
                            <label class="w-1/4 text-base text-blue-800 rtl:pl-8 ltr:pr-8">القناة</label>
                            <input id="channel"
                                   class="w-3/4 bg-white-900 rounded-25px py-3 px-6 focus:outline-none border border-transparent"
                                   type="text" :value="this.$route.params.channel_id" size="4" readonly>
                        </div>
                        <div class="mb-4 mx-4 flex justify-end" style="direction: ltr;">
                            <input class="custom-checkbox" id="video" type="checkbox" checked>
                            <label for="video" class="text-base flex items-center hidden">
                                <span></span>
                                <span class="text-sm text-blue-800"> :المضيف </span>
                            </label>
                        </div>
                    </div>
                    <div class="flex items-center justify-center flex-wrap mt-4 call-div">
                        <div id="join" v-if="call" @click="join()"
                             class="mx-16 5sm:mx-8 rounded-full flex items-center justify-center accept">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                 class="svg-inline--fa fa-phone w-8">
                                <path fill="#fff"
                                      d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"
                                      class=""></path>
                            </svg>
                        </div>
                        <div v-if="decline" id="leave" @click="leave()"
                             class="rounded-full flex items-center mx-16 5sm:mx-8  justify-center decline">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone-slash"
                                 role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
                                 class="svg-inline--fa fa-phone-slash w-8">
                                <path fill="#fff"
                                      d="M268.2 381.4l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48c-10.7 4.6-16.5 16.1-13.9 27.5l24 104c2.5 10.8 12.1 18.6 23.4 18.6 100.7 0 193.7-32.4 269.7-86.9l-80-61.8c-10.9 6.5-22.1 12.7-33.6 18.1zm365.6 76.7L475.1 335.5C537.9 256.4 576 156.9 576 48c0-11.2-7.7-20.9-18.6-23.4l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-12.2 26.1-27.9 50.3-46 72.8L45.5 3.4C38.5-2 28.5-.8 23 6.2L3.4 31.4c-5.4 7-4.2 17 2.8 22.4l588.4 454.7c7 5.4 17 4.2 22.5-2.8l19.6-25.3c5.4-6.8 4.1-16.9-2.9-22.3z"
                                      class=""></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div id="video" style="width: 320px; height: 200px; margin: 10px auto; display: none;">
                <div id="agora_local" style="width: 320px; height: 200px; margin: 10px auto; "></div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import Bar from '../../components/app/Bar';

    let client, localStream, camera, microphone;
    export default {
        data() {
            return {
                mice: false,
                camera: false,
                decline: false,
                call: true,
            }
        },
        components: {
            Bar
        },
        methods: {
            openCamera() {
                this.camera = !this.camera
            },
            openMice() {
                this.mice = !this.mice
            },
            initCall() {
                if (!AgoraRTC.checkSystemRequirements()) {
                    alert("Your browser does not support WebRTC!");
                }
                AgoraRTC.Logger.error('this is error');
                AgoraRTC.Logger.warning('this is warning');
                AgoraRTC.Logger.info('this is info');
                AgoraRTC.Logger.debug('this is debug');

                this.getDevices();
            },
            getDevices() {
                let audioSelect = document.querySelector('select#audioSource');
                let videoSelect = document.querySelector('select#videoSource');
                AgoraRTC.getDevices(function (devices) {
                    for (let i = 0; i !== devices.length; ++i) {
                        let device = devices[i];
                        console.log(device);
                        let option = document.createElement('option');
                        // option.style.cssText = 'width:300px !important;';
                        option.value = device.deviceId;
                        if (device.kind === 'audioinput') {
                            option.text = device.label || 'microphone ' + (audioSelect.length + 1);
                            option.style.cssText = 'width:300px !important;'
                            audioSelect.appendChild(option);
                        } else if (device.kind === 'videoinput') {
                            option.text = device.label || 'camera ' + (videoSelect.length + 1);
                            option.style.cssText = 'width:300px !important;'
                            videoSelect.appendChild(option);
                        } else {
                            console.log('Some other kind of source/device: ', device);
                        }
                    }
                });
            },
            join() {
                let audioSource = document.querySelector('select#audioSource');
                let videoSource = document.querySelector('select#videoSource');
                this.decline = true;
                this.call = false;
                document.getElementById("join").disabled = true;
                document.getElementById("video").disabled = true;
                var channel_key = null;

                console.log("Init AgoraRTC client with App ID: " + '112b4650922f44c589f2ba1a4816b7ca');
                client = AgoraRTC.createClient({mode: 'live'});
                client.init('112b4650922f44c589f2ba1a4816b7ca', function () {
                    console.log("AgoraRTC client initialized");
                    client.join(channel_key, channel.value, null, function (uid) {
                        console.log("User " + uid + " join channel successfully");

                        if (document.getElementById("video").checked) {
                            camera = videoSource.value;
                            microphone = audioSource.value;
                            localStream = AgoraRTC.createStream({
                                streamID: uid,
                                audio: true,
                                cameraId: camera,
                                microphoneId: microphone,
                                video: false,
                                screen: false
                            });
                            //localStream = AgoraRTC.createStream({streamID: uid, audio: false, cameraId: camera, microphoneId: microphone, video: false, screen: true, extensionId: 'minllpmhdgpndnkomcoccfekfegnlikg'});
                            if (document.getElementById("video").checked) {
                                localStream.setVideoProfile('720p_3');

                            }

                            // The user has granted access to the camera and mic.
                            localStream.on("accessAllowed", function () {
                                console.log("accessAllowed");
                            });

                            // The user has denied access to the camera and mic.
                            localStream.on("accessDenied", function () {
                                console.log("accessDenied");
                            });

                            localStream.init(function () {
                                console.log("getUserMedia successfully");
                                localStream.play('agora_local');

                                client.publish(localStream, function (err) {
                                    console.log("Publish local stream error: " + err);
                                });

                                client.on('stream-published', function (evt) {
                                    console.log("Publish local stream successfully");
                                });
                            }, function (err) {
                                console.log("getUserMedia failed", err);
                            });
                        }
                    }, function (err) {
                        console.log("Join channel failed", err);
                    });
                }, function (err) {
                    console.log("AgoraRTC client init failed", err);
                });

                let channelKey = "";
                client.on('error', function (err) {
                    console.log("Got error msg:", err.reason);
                    if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
                        client.renewChannelKey(channelKey, function () {
                            console.log("Renew channel key successfully");
                        }, function (err) {
                            console.log("Renew channel key failed: ", err);
                        });
                    }
                });


                client.on('stream-added', function (evt) {
                    var stream = evt.stream;
                    console.log("New stream added: " + stream.getId());
                    console.log("Subscribe ", stream);
                    client.subscribe(stream, function (err) {
                        console.log("Subscribe stream failed", err);
                    });
                });

                client.on('stream-subscribed', function (evt) {
                    var stream = evt.stream;
                    console.log("Subscribe remote stream successfully: " + stream.getId());
                    if ($('div#video #agora_remote' + stream.getId()).length === 0) {
                        $('div#video').append('<div class="aogra-remote" id="agora_remote' + stream.getId() + '" style="width: 320px; height: 200px; margin: 10px auto; "></div>');
                    }
                    stream.play('agora_remote' + stream.getId());
                });

                client.on('stream-removed', function (evt) {
                    var stream = evt.stream;
                    stream.stop();
                    $('#agora_remote' + stream.getId()).remove();
                    console.log("Remote stream is removed " + stream.getId());
                });

                client.on('peer-leave', function (evt) {
                    var stream = evt.stream;
                    if (stream) {
                        stream.stop();
                        $('#agora_remote' + stream.getId()).remove();
                        console.log(evt.uid + " leaved from this channel");
                    }
                });
            },
            leave() {
                document.getElementById("leave").disabled = false;
                document.getElementById("join").disabled = false;
                document.getElementById("video").disabled = false;
                client.leave(function () {
                    let $element = document.getElementById(video);
                    if ($element) {
                        $element.innerHTML = "";
                        document.getElementById(agora_local).innerHTML = "";

                    }
                    location.reload();
                    console.log("Leavel channel successfully");
                }, function (err) {
                    console.log("Leave channel failed");
                });
            },
        },
        mounted() {
            this.initCall();
        },
        computed: {
            user() {
                return localStorage.getItem('user_id') ? localStorage.getItem('user_id') : null;
            }
        }
    }
</script>
<style lang="scss">
    #agora_local {
        width: 320px !important;
        height: 200px !important;
        margin: 0 auto;
    }

    select {
        position: relative !important;

        > * {
            width: 300px !important;
        }
    }

    .options {
        width: 150px !important;
    }

    #agora_remote {
        display: none !important;
    }

    .agora-remote {
        width: 320px !important;
        height: 200px !important;
        margin: 10px auto !important;
    }

    .decline,
    .accept {
        background-color: #F43808;
        width: 60px;
        height: 60px;
    }

    .accept {
        background-color: #359A28;
    }

    .call-div {
        position: absolute;
        right: 0;
        left: 0;
        top: 80%;
    }
</style>
