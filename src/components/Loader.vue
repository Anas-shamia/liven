<template>
    <div class="flex items-center justify-center absolute inset-0 w-full min-h-screen bg-white-900 z-9 overflow-hidden loading-img">
        <img class="w-40 loader" src="@/assets/img/logo.png" alt="">
    </div>
</template>
<style>
    .loading-img img {
        transition: all ease;
        animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
        from {
            opacity: 1;
        }
        to {
            opacity: 0
        }
    }
</style>
