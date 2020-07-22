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
	/* 遮罩层*/
	.uni-share {
		display: flex;
		flex-direction: column;
		padding: 60rpx 0 130rpx 0;
		background: #FFFFFF;
		border-radius: 24rpx 24rpx 0 0;
	}
	
	.uni-share-content {
		
	}
	
	
</style>
