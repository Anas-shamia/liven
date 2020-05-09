<template>
    <div class="flex items-center mb-4">
        <div class="">
            <h2 class="text-base text-blue-800 mb-2px ml-8">{{title}}</h2>
            <p class="text-base text-blue-800 mb-2px appoint-date">{{date}}</p>
        </div>

        <!--        <div class="appoint-check">-->
<!--            <input class="custom-checkbox" type="checkbox" v-model="checked" :id="`chkbx${index}`" value="1" >-->
<!--            <label :for="`chkbx${index}`" class="text-base flex items-center">-->
<!--                <span></span>-->
<!--                <span v-if="!this.checked">معلق</span>-->
<!--                <span v-if="this.checked" class="text-primary-900">تم</span>-->
<!--            </label>-->
<!--        </div>-->
    </div>
</template>
<script>
    export default {
        props:['index','title','date','checked'],
        data(){
            return{
            }
        }
    }
</script>
