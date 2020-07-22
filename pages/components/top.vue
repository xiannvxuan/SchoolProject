<template>
	<uni-popup ref="showshare" :type="type" @change="change">
		<view class="uni-share">
			<view class="uni-share-content">
				
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import uniPopup from '../../components/uni-popup/uni-popup.vue';
	export default {
		data() {
			return {
				
			}
		},
		props: {
			reviewList
		},
		
		components: {
			uniPopup
		},
		methods:{
			
		}
	}
</script>

<style scoped>

</style>
