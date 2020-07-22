<template>
    <view class="test">
        <tabbar :current="1"></tabbar>
    </view>
</template>

<script>
	import tabbar from './tabBar.vue'
    export default {
        data() {
            return {
            
			}
        },
        methods: {
            navigatorTo(e) {
                uni.redirectTo({
                    url: e,
                });
            }
        },
	    components: {
			tabbar
		},
    }
</script>

<style scoped>

</style>