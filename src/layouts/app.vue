<template>
    <div class="app-container">
        <router-view/>
    </div>
</template>
<script>
    export default {
        created(){
            let htmlEl=document.querySelector("html");
            if (this.$i18n.locale === 'en'){
                htmlEl.setAttribute('dir','ltr');
                htmlEl.setAttribute('lang','en');
            } else{
                htmlEl.setAttribute('dir','rtl');
                htmlEl.setAttribute('lang','ar');
            }
        },
    }
</script>
