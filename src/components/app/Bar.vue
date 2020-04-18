<template>
    <div class="flex flex-wrap py-3 mobile-padding fixed inset-x-0 z-9 bar">
        <router-link class="absolute rtl:right-0 ltr:left-0 icon-padding" :to="path" v-if="plus">
            <img src="@/assets/img/plus.svg" alt="">
        </router-link>
        <h2 class="text-white-900 text-lg flex-grow text-center">{{title}}</h2>

        <router-link tag="span" :to="close" class="bg-transparent absolute rtl:left-0 ltr:right-0 icon-padding" exact v-if="close">
            <img class="close" src="@/assets/img/times.svg" alt="">
        </router-link>
    </div>
</template>
<script>
    export default {
        props: {
            title: '',
            path: '',
            back: {
                default: '/'
            },
            plus: {
                default: false,
                type: Boolean
            },
            close: '',
        }
    }
</script>
<style lang="scss">
    .bar {
        height: 45px;
        background-color: #77317A;
        img {
            width: 20px;
            height: 20px;
            &.close{
                width: 25px;
                height: 25px;
            }
        }
    }

</style>
