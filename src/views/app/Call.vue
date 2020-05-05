<template>
    <div>
        <Bar :title="'الاتصال'" :close="user === '116' ? '':'/'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">

            <div class="flex items-center justify-center mb-8">
                <div class="mx-4">
                    <svg aria-hidden="true" @click="openCamera()" focusable="false" data-prefix="fas" data-icon="video"
                         role="img"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                         class="svg-inline--fa fa-video w-6">
                        <path fill="#14123d"
                              d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"
                              class=""></path>
                    </svg>
                </div>
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
                        <p class="underline text-primary-900 mb-4 text-left">
                            {{`https://app.it-team-dev.com/call/${this.$route.params.channel_id}`}}</p>
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
                    <div class="flex items-center flex-wrap mt-4">
                        <button id="join" class="bg-blue-800 mb-2 text-white-900 rounded-lg px-4 mr-2 py-2"
                                @click="join()">Join
                        </button>
                        <button id="leave" class="bg-blue-800 mb-2 text-white-900 rounded-lg px-4 mx-2 py-2"
                                @click="leave()">Leave
                        </button>
                    </div>
                </div>
            </div>

            <div id="video" style="width: 320px; height: 200px; margin: 10px auto; ">
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
                                video: document.getElementById("video").checked,
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

    .agora-remote {
        width: 320px !important;
        height: 200px !important;
        margin: 10px auto !important;
    }
</style>
