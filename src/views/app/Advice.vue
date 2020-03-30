<template>
    <div>
        <Bar :title="'النصائح'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">

            <h2 class="text-2xl font-medium text-blue-800 mb-8 text-center">قائمة النصائح</h2>
            <div class="bg-white-900 rounded-25px text-center py-3 mb-4" v-for="(item,index) in advice" :key="index">
                <p class="text-xs font-light text-blue-800 w-4/5 mx-auto">
                    {{item.title}}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import Bar from '../../components/app/Bar';

    export default {
        data() {
            return {
                advice: [
                    {
                        title: 'أكثر من الخضروات والفواكة بعد كل وجبه رئيسية للتقليل من اضرار الشيخوخة'
                    },
                    {
                        title: 'يجب التركيز على النشويات الجيدة والحبوب الكاملة وتجنب السكريات'
                    },
                    {
                        title: 'أكثر من الخضروات والفواكة بعد كل وجبه رئيسية للتقليل من اضرار الشيخوخة'
                    },
                    {
                        title: 'يجب التركيز على النشويات الجيدة والحبوب الكاملة وتجنب السكريات'
                    }
                ]
            }
        },
        components: {
            Bar
        }
    }
</script>
