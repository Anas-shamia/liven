<template>
    <div class="app-container relative min-h-screen">
        <router-view/>
        <Loader/>
    </div>
</template>
<script>
    import Loader from '../components/Loader';

    export default {
        created() {
            let htmlEl = document.querySelector("html");
            if (this.$i18n.locale === 'en') {
                htmlEl.setAttribute('dir', 'ltr');
                htmlEl.setAttribute('lang', 'en');
            } else {
                htmlEl.setAttribute('dir', 'rtl');
                htmlEl.setAttribute('lang', 'ar');
            }
        },
        components: {
            Loader
        }
    }
</script>
<style>
    .app-container{
        overflow: hidden;
    }
</style>
