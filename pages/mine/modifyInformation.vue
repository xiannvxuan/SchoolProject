<template>
	<view class="modify">
		 <view class="uni-textarea">
			<textarea placeholder-style="color:#808080" placeholder="这个人很懒,什么都没说..."/>
		</view>
		<button class="btn" :disabled="btnFlag">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnFlag: true
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.modify {
		width: 100%;
		height: 100%;
		padding: 0 40rpx;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}
	.uni-textarea textarea {
		width: 100%;
		height: 350rpx;
		padding: 20rpx 40rpx;
		font-size: 32rpx;
	}
	.btn {
		background-color: #439AD0;
		font-size: 36rpx;
		line-height: 96rpx;
		color: #fff;
	}
</style>
